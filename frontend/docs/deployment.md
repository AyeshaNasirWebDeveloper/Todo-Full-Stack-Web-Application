# Next.js Frontend Deployment Steps

This document outlines the steps to deploy the Next.js frontend application to a production environment.

## 1. Prerequisites

- Node.js and npm/yarn installed on the production server (if not using Docker).
- Docker installed (if deploying with Docker).
- A web server (e.g., Nginx, Vercel, Netlify, AWS Amplify, etc.) to serve the static assets or run the Next.js server.
- Domain name configured.

## 2. Environment Variables

Ensure the following environment variables are set in your production environment:

- `NEXT_PUBLIC_API_BASE_URL`: The URL of your deployed FastAPI backend. Example: `https://api.your_domain.com`

## 3. Building the Next.js Application

Navigate to the `frontend` directory and build the Next.js application for production:

```bash
npm install
npm run build
```

This will generate a `next` directory (or `.next` depending on Next.js version) with optimized static assets and server-side code.

## 4. Deployment Options

### Option A: Serverless Platforms (Recommended)

Platforms like Vercel, Netlify, or AWS Amplify are ideal for Next.js applications, especially those with static site generation (SSG) or server-side rendering (SSR) capabilities.

- **Vercel**: Deploy directly from your Git repository. Vercel automatically detects Next.js projects and configures deployments.
  - Link your GitHub/GitLab/Bitbucket repository.
  - Vercel handles `npm install`, `npm run build`, and `npm start`.
  - Environment variables can be configured in the Vercel dashboard.

- **Netlify**: Similar to Vercel, Netlify provides continuous deployment from Git.
  - Configure build command: `npm run build`
  - Publish directory: `out` (for static export) or leave blank for SSR.
  - Environment variables can be set in Netlify UI.

### Option B: Node.js Server (Self-Hosted)

If you prefer to self-host on a Node.js server (e.g., EC2, DigitalOcean Droplet):

1.  **Transfer Files**: Copy your `frontend` directory (including `node_modules` and `.next` build output) to your production server.
2.  **Install Dependencies**: `npm install --production`
3.  **Start Production Server**: `npm run start`
    - Ensure a process manager (e.g., PM2) is used to keep the application running and manage restarts.
4.  **Reverse Proxy**: Use Nginx or Apache to proxy requests to the Next.js server (typically running on port 3000).
    ```nginx
    server {
        listen 80;
        server_name your_frontend_domain.com;

        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

### Option C: Docker Deployment

If using Docker, create a `Dockerfile` in your `frontend` directory:

```dockerfile
# Use the official Node.js image as the base image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock (or package-lock.json) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Second stage: run the application
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

EXPOSE 3000

CMD ["npm", "start"]
```

Build the Docker image:

```bash
docker build -t your-repo/nextjs-frontend:latest .
```

Then, include it in your `docker-compose.prod.yml` (similar to the backend service).

## 5. Continuous Integration/Continuous Deployment (CI/CD)

Automate the deployment process using CI/CD pipelines (e.g., GitHub Actions, GitLab CI) to ensure consistent and reliable deployments for your frontend application.
