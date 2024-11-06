# Stage to copy filesystem and install node packages
FROM node:18.12.0-alpine AS base
# Root folder that we will actually use
ENV WORKDIR=app

# Setup basic node structure
WORKDIR /$WORKDIR

# Copy the basic stuff everything should have
COPY [".pnp.cjs", ".pnp.loader.mjs", ".yarnrc.yml", "./"]
COPY .yarn .yarn

# Install yarn global dependencies
RUN yarn set version 4.0.2

# Base level installer for packages and files
FROM base AS installer
WORKDIR /$WORKDIR
COPY . /$WORKDIR

# Production basics (ports, env, etc)
FROM base AS prod-base
WORKDIR /$WORKDIR

# We need the production port
ENV PORT=$PORT

# Set us to production environment
ENV NODE_ENV=production

# Expose the port (Heroku will set this)
EXPOSE $PORT

# Add DATABASE_URL handling for Heroku
ENV DATABASE_URL=$DATABASE_URL

# Production builder stage for both frontend and backend
FROM installer AS prod-builder
WORKDIR /$WORKDIR

# Build the unplugged files and cache stuff for this specific OS
RUN yarn config set nodeLinker node-modules && \
    yarn install --network-timeout 100000

# Build both frontend and backend
RUN yarn turbo run build

# Production stage
FROM prod-base AS production
WORKDIR /$WORKDIR

# Copy the full monorepo
COPY --from=prod-builder ["/$WORKDIR", "./"]

# Install production dependencies
RUN yarn workspaces focus --all --production

# Run database migrations and start both services
CMD yarn workspace database run migrate:deploy && \
    yarn workspace backend run deploy & \
    yarn workspace frontend run deploy

# Healthcheck
HEALTHCHECK CMD wget --spider localhost:$PORT || bash -c 'kill -s 15 -1 && (sleep 10; kill -s 9 -1)'
