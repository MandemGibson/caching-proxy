import express, { Request, Response } from "express";
import { config } from "dotenv";
import axios from "axios";
import Redis from "ioredis";

config();

const redisClient = new Redis({
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err.message);
  redisClient.disconnect();
});

const EXPIRATION = 600;

export const startProxyServer = async (port: number, origin: string) => {
  const app = express();

  app.use(express.json());

  app.use(async (req: Request, res: Response): Promise<any> => {
    const cacheKey = `${req.method}:${req.url}`;
    try {
      // Check if the response is in cache
      const cachedResponse = await redisClient.get(cacheKey);
      if (cachedResponse) {
        console.log("Cache hit");
        res.set("X-Cache", "HIT");
        console.log(req.url);
        console.log("URL:", req.url);
        return res.status(200).json(JSON.parse(cachedResponse));
      }

      // Forward the request to the origin server
      console.log("Cache miss");
      const response = await axios.get(`${origin}${req.url}`);

      // Cache the response
      await redisClient.setex(
        cacheKey,
        EXPIRATION,
        JSON.stringify(response.data)
      );

      // Send the response with appropriate header
      res.set("X-Cache", "MISS");
      res.status(200).json(response.data);
    } catch (error: any) {
      console.error("Error while handling request:", error.message);
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Caching proxy server is running on port ${port}`);
  });
};

export const clearCache = async () => {
  try {
    await redisClient.flushall();
    console.log("Cache cleared successfully.");
    process.exit(0);
  } catch (error: any) {
    console.error("Error while clearing cache:", error.message);
    process.exit(1);
  }
};
