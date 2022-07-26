import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticatedClient(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: "Token missing"
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      String(process.env.JWT_CLIENT_SECRET_KEY)
    ) as IPayload;

    request.id_client = sub;

    return next();
  } catch {
    return response.status(401).json({
      message: "Invalid token!",
    })
  }
}