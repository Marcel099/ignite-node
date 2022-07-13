import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { auth } from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const {
      token_secret,
      token_expiration_time,
      refresh_token_secret,
      refresh_token_expiration_time,
      refresh_token_expiration_time_in_days,
    } = auth;

    if (!user) {
      throw new AppError("Email or password incorrect");
    }

    const hasPasswordMatched = await compare(password, user.password);

    if (!hasPasswordMatched) {
      throw new AppError("Email or password incorrect");
    }

    const token = sign({}, token_secret, {
      subject: user.id,
      expiresIn: token_expiration_time,
    });

    const refresh_token = sign({ email }, refresh_token_secret, {
      subject: user.id,
      expiresIn: refresh_token_expiration_time,
    });

    const refresh_token_expiration_date = this.dateProvider.addDaysToDate(
      new Date(),
      refresh_token_expiration_time_in_days
    );

    await this.userTokensRepository.create({
      expiration_date: refresh_token_expiration_date,
      refresh_token,
      user_id: user.id,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token,
    };
  }
}
