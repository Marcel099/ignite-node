import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
// import redis from "redis";

import { AppError } from "@shared/errors/AppError";

const redisClient = {} as any;
// redis.createClient({
//   url: process.env.REDIS_HOST,
//   port: Number(process.env.REDIS_PORT),
// });

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "middleware",
  points: 10,
  duration: 5,
});

export default async function rateLimiterMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await rateLimiter.consume(request.ip);

    next();
  } catch {
    throw new AppError("Too many request", 429);
  }
}
