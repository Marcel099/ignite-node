import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { auth } from "@config/auth";
// import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  exp: number;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  // const userTokensRepository = new UserTokensRepository();

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.token_secret) as IPayload;

    // const user_token = await userTokensRepository.findByUserIdAndRefreshToken(
    //   user_id,
    //   refresh_token
    // );

    // if (!user_token) {
    //   throw new AppError("User does not exist", 401);
    // }

    request.user = { id: user_id };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
