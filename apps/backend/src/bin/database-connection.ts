import { PrismaClient } from "database";

// Create the prisma client with connection handling for both local and Heroku
const client = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || process.env.POSTGRES_URL,
    },
  },
});

// Export the client
export default client;

// Prisma automatically closes on shutdown
