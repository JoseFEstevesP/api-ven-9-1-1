# Dockerized Node.js and PostgreSQL Application

## Prerequisites
- Docker
- Docker Compose

## Setup and Running
1. Clone the repository
2. Copy .env.example to .env and adjust values if needed:
   ```bash
   cp .env.example .env
   ```
3. Build and run the containers:
   ```bash
   docker-compose up --build
   ```

The application will be available at http://localhost:3000

## Services
- Node.js application: Port 3000
- PostgreSQL database: Port 5432

## Development
For development, you can use:
```bash
docker-compose -f docker-compose.dev.yml up
```

To rebuild containers after changes:
```bash
docker-compose up --build
```

To stop containers:
```bash
docker-compose down
```