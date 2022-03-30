import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IEmailProvider } from "@shared/container/providers/EmailProvider/IEmailProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class SendForgottenPasswordEmailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("EmailProvider")
    private emailProvider: IEmailProvider
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exist");
    }

    const token = uuidV4();
    const expiration_date = this.dateProvider.addHoursToDate(new Date(), 3);

    await this.userTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expiration_date,
    });

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    const variables = {
      name: user.name,
      link: `${process.env.API_URL}/password/reset?token=${token}`,
    };

    await this.emailProvider.sendEmail(
      email,
      "Recuperação de senha",
      templatePath,
      variables
    );
  }
}
