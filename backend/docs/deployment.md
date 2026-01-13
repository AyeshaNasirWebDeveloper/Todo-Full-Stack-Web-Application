# FastAPI Backend Deployment Steps

This document outlines the steps to deploy the FastAPI backend application to a production environment.

## 1. Prerequisites

- Docker installed on the production server.
- `docker-compose` installed on the production server.
- A PostgreSQL database instance (e.g., managed service like AWS RDS, Google Cloud SQL, or a self-hosted instance).
- Domain name configured to point to the production server's IP address.
- Nginx or Apache configured as a reverse proxy (recommended).

## 2. Environment Variables

Ensure the following environment variables are set in your production environment:

- `DATABASE_URL`: The connection string for your production PostgreSQL database. Example: `postgresql://user:password@host:port/database_name`
- `BETTER_AUTH_SECRET`: A strong, randomly generated secret key for JWT token signing.

## 3. Building the Docker Image

Navigate to the `backend` directory and build the Docker image:

```bash
docker build -t your-repo/fastapi-backend:latest .
```

Replace `your-repo/fastapi-backend` with your desired image name and tag.

## 4. Running with Docker Compose

Create a `docker-compose.prod.yml` file for production deployment (adjust as needed):

```yaml
version: '3.8'

services:
  backend:
    image: your-repo/fastapi-backend:latest
    restart: always
    environment:
      DATABASE_URL: ${DATABASE_URL}
      BETTER_AUTH_SECRET: ${BETTER_AUTH_SECRET}
    ports:
      - "8000:8000" # Or bind to localhost and use a reverse proxy
    # Optionally add health checks and logging configurations

```

Then, run the application:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 5. Reverse Proxy (Nginx Example)

It is highly recommended to use a reverse proxy (like Nginx) in front of your FastAPI application for SSL termination, load balancing, and static file serving. Below is a basic Nginx configuration example:

```nginx
server {
    listen 80;
    server_name your_domain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Configure SSL certificates (e.g., using Certbot) for HTTPS.

## 6. Database Migrations

Handle database migrations carefully in production. You might use tools like Alembic with SQLModel, or run migration commands manually before deploying a new version of the application.

Example (if using Alembic, assuming `alembic.ini` and migration scripts are set up):

```bash
docker-compose -f docker-compose.prod.yml run --rm backend alembic upgrade head
```

## 7. Monitoring and Logging

Set up monitoring and logging solutions (e.g., Prometheus, Grafana, ELK Stack, cloud-native services) to observe the application's health and performance in production.

## 8. Continuous Integration/Continuous Deployment (CI/CD)

Automate the deployment process using CI/CD pipelines (e.g., GitHub Actions, GitLab CI, Jenkins) to ensure consistent and reliable deployments.
