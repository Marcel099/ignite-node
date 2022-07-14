import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { auth } from "@config/auth";
import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: UserTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(received_token: string): Promise<ITokenResponse> {
    const {
      refresh_token_secret,
      refresh_token_expiration_time,
      refresh_token_expiration_time_in_days,
    } = auth;

    const { sub, email } = verify(
      received_token,
      auth.refresh_token_secret
    ) as IPayload;

    const user_id = sub;

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        received_token
      );

    if (!userToken) {
      throw new AppError("Refresh Token does not exist");
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, refresh_token_secret, {
      subject: sub,
      expiresIn: refresh_token_expiration_time,
    });

    const refresh_token_expiration_date = this.dateProvider.addDaysToDate(
      new Date(),
      refresh_token_expiration_time_in_days
    );

    await this.userTokensRepository.create({
      expiration_date: refresh_token_expiration_date,
      refresh_token,
      user_id: sub,
    });

    const newToken = sign({}, auth.token_secret, {
      subject: user_id,
      expiresIn: auth.token_expiration_time,
    });

    return {
      token: newToken,
      refresh_token,
    };
  }
}
