#!/bin/bash

# Setup and start the development environment
yarn setup
yarn run dev &

# Function to check if backend is ready
wait_for_backend() {
    echo "Waiting for backend to start..."
    local max_attempts=30
    local attempt=1
    while [ $attempt -le $max_attempts ]; do
        if curl -s http://localhost:3000/api/health > /dev/null; then
            echo "Backend is ready!"
            return 0
        fi
        echo "Attempt $attempt of $max_attempts: Backend not ready yet..."
        sleep 2
        attempt=$((attempt + 1))
    done
    echo "Backend failed to start after $max_attempts attempts"
    return 1
}

# Function to wait for database
wait_for_database() {
    echo "Waiting for database to start..."
    local max_attempts=30
    local attempt=1
    while [ $attempt -le $max_attempts ]; do
        if docker exec bwh-navigation-management-system-database-1 pg_isready -U dev > /dev/null 2>&1; then
            echo "Database is ready!"
            return 0
        fi
        echo "Attempt $attempt of $max_attempts: Database not ready yet..."
        sleep 2
        attempt=$((attempt + 1))
    done
    echo "Database failed to start after $max_attempts attempts"
    return 1
}

# Function to read CSV file and send it via curl with error checking
send_csv() {
    local endpoint=$1
    local file=$2
    echo "Sending $file to $endpoint..."
    
    if [ ! -f "$file" ]; then
        echo "Error: File $file not found!"
        return 1
    fi
    
    local csv_content
    csv_content=$(cat "$file")
    
    local json_payload
    json_payload="{\"csvString\": $(printf '%s' "$csv_content" | jq -Rs .)}"
    
    local response
    response=$(curl -s -w "\n%{http_code}" \
        -X POST "http://localhost:3000/api/$endpoint" \
        -H "Content-Type: application/json" \
        -d "$json_payload")
    
    local http_code
    http_code=$(echo "$response" | tail -n 1)
    local body
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" -eq 200 ]; then
        echo "Successfully populated $endpoint"
    else
        echo "Error populating $endpoint: $body"
        return 1
    fi
}

# Wait for services to be ready
if ! wait_for_database; then
    echo "Failed to connect to database"
    exit 1
fi

sleep 5  # Give extra time for database to be fully ready

# Change to database directory and run migrations
cd packages/database/ || exit
# Reset the database and run migrations
yarn prisma migrate reset --force --skip-generate
sleep 10  # Give time for migrations to complete and database to be ready
cd ../..

# Wait for backend to be ready
if ! wait_for_backend; then
    echo "Failed to connect to backend"
    exit 1
fi

sleep 5  # Give extra time for backend to initialize

echo "Starting database population..."

# Populate Nodes
if ! send_csv "node-populate" "apps/backend/data/csv/nodes.csv"; then
    echo "Failed to populate nodes"
    exit 1
fi

# Populate Edges
if ! send_csv "edge-populate" "apps/backend/data/csv/edges.csv"; then
    echo "Failed to populate edges"
    exit 1
fi

# For employees and users, use the PATCH endpoint
echo "Populating employees and users..."
response=$(curl -s -w "\n%{http_code}" -X PATCH "http://localhost:3000/api/populate-employee")
http_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" -eq 200 ]; then
    echo "Successfully populated employees and users"
else
    echo "Error populating employees and users: $body"
    exit 1
fi

echo "Database population complete!"
