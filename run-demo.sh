#!/bin/bash

# Constants
MAX_ATTEMPTS=30
SLEEP_INTERVAL=2
API_BASE_URL="http://localhost:3000/api"
DB_CONTAINER="bwh-navigation-management-system-database-1"

# Setup and start the development environment
yarn setup
yarn run dev &

# Function to check if backend is ready
wait_for_backend() {
    echo "Waiting for backend to start..."
    local attempt=1
    while [ $attempt -le $MAX_ATTEMPTS ]; do
        if curl -s "$API_BASE_URL/health" > /dev/null; then
            echo "Backend is ready!"
            return 0
        fi
        echo "Attempt $attempt of $MAX_ATTEMPTS: Backend not ready yet..."
        sleep $SLEEP_INTERVAL
        attempt=$((attempt + 1))
    done
    echo "Backend failed to start after $MAX_ATTEMPTS attempts"
    return 1
}

# Function to wait for database
wait_for_database() {
    echo "Waiting for database to start..."
    local attempt=1
    while [ $attempt -le $MAX_ATTEMPTS ]; do
        if docker exec $DB_CONTAINER pg_isready -U dev > /dev/null 2>&1; then
            echo "Database is ready!"
            return 0
        fi
        echo "Attempt $attempt of $MAX_ATTEMPTS: Database not ready yet..."
        sleep $SLEEP_INTERVAL
        attempt=$((attempt + 1))
    done
    echo "Database failed to start after $MAX_ATTEMPTS attempts"
    return 1
}

# Function to read CSV file and send it via curl with error checking
send_csv() {
    local endpoint=$1
    local file=$2
    echo "Sending $file to $endpoint..."
    
    [[ ! -f "$file" ]] && { echo "Error: File $file not found!"; return 1; }
    
    local response
    local http_code
    local body
    
    response=$(curl -s -w "\n%{http_code}" \
        -X POST "$API_BASE_URL/$endpoint" \
        -H "Content-Type: application/json" \
        -d "{\"csvString\": $(jq -Rs . < "$file")}")
    
    http_code=$(echo "$response" | tail -n 1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" -eq 200 ]; then
        echo "Successfully populated $endpoint"
        return 0
    else
        echo "Error populating $endpoint: $body"
        return 1
    fi
}

populate_database() {
    echo "Starting database population..."
    
    local csv_files=(
        "node-populate:apps/backend/data/csv/nodes.csv"
        "edge-populate:apps/backend/data/csv/edges.csv"
    )
    
    for entry in "${csv_files[@]}"; do
        IFS=':' read -r endpoint file <<< "$entry"
        if ! send_csv "$endpoint" "$file"; then
            echo "Failed to populate $endpoint"
            return 1
        fi
    done
    
    # Populate employees and users
    echo "Populating employees and users..."
    local response
    local http_code
    local body
    
    response=$(curl -s -w "\n%{http_code}" -X PATCH "$API_BASE_URL/populate-employee")
    http_code=$(echo "$response" | tail -n 1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" -ne 200 ]; then
        echo "Error populating employees and users: $body"
        return 1
    fi
    
    echo "Database population complete!"
    return 0
}

main() {
    # Wait for services to be ready
    wait_for_database || { echo "Failed to connect to database"; exit 1; }
    sleep 5  # Give extra time for database to be fully ready
    
    # Reset database and run migrations
    (cd packages/database/ && yarn prisma migrate reset --force --skip-generate) || exit 1
    sleep 10  # Give time for migrations to complete
    
    # Wait for backend
    wait_for_backend || { echo "Failed to connect to backend"; exit 1; }
    sleep 5  # Give extra time for backend to initialize
    
    # Populate database
    populate_database || exit 1
}

# Start the script
main
