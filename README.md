# Caching Proxy

## Prerequisites

- Node.js installed on your system.
- Redis server running and accessible.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd caching-proxy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the project root and add the following:
   ```env
   REDIS_USER=<your-redis-username>
   REDIS_PASSWORD=<your-redis-password>
   REDIS_HOST=<your-redis-host>
   REDIS_PORT=<your-redis-port>
   ```

4. Start your Redis server if it's not already running.

## Usage

1. Start the server:
   ```bash
   npm run dev -- caching-proxy --port <number> --origin <url>
   ```
2. Clear cache
   ```bash
   npm run dev -- clear-cache
   ```

## Project Structure

- `component/proxy.ts`: Main application logic.
- `index.ts`: CLI logic.
- `.env`: Environment variables configuration.

## Dependencies

- **express**: For creating the API server.
- **ioredis**: For Redis integration.
- **axios**: For making API requests to Visual Crossing.
- **express-rate-limit**: For rate limiting requests.
- **dotenv**: For managing environment variables.

## Error Handling

The app handles the following errors:
- Redis connection issues.
- API request failures.
- Missing or incorrect environment variables.

## Troubleshooting
- **Redis Connection Issues**: Verify Redis server configuration and credentials.

## Project Inspired By Roadmap.sh
https://roadmap.sh/projects/caching-server
