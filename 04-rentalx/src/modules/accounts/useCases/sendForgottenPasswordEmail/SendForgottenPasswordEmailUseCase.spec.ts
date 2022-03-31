import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryUserTokensRepository } from "@modules/accounts/repositories/in-memory/InMemoryUserTokensRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { InMemoryEmailProvider } from "@shared/container/providers/EmailProvider/in-memory/InMemoryEmailProvider";
import { AppError } from "@shared/errors/AppError";

import { SendForgottenPasswordEmailUseCase } from "./SendForgottenPasswordEmailUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUserTokensRepository: InMemoryUserTokensRepository;
let sendForgottenPasswordEmailUseCase: SendForgottenPasswordEmailUseCase;
let dateProvider: DayjsDateProvider;
let inMemoryEmailProvider: InMemoryEmailProvider;

describe("Send forgotten password's email", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUserTokensRepository = new InMemoryUserTokensRepository();
    dateProvider = new DayjsDateProvider();
    inMemoryEmailProvider = new InMemoryEmailProvider();

    sendForgottenPasswordEmailUseCase = new SendForgottenPasswordEmailUseCase(
      inMemoryUsersRepository,
      inMemoryUserTokensRepository,
      dateProvider,
      inMemoryEmailProvider
    );
  });

  it("should be able to send a forgotten password's email to user", async () => {
    const sendMail = jest.spyOn(inMemoryEmailProvider, "sendEmail");
    const email = "fes@lanari.om";

    await inMemoryUsersRepository.create({
      name: "Blanche Curry",
      driver_license: "118114",
      email,
      password: "1234",
    });

    await sendForgottenPasswordEmailUseCase.execute(email);

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exist", async () => {
    await expect(
      sendForgottenPasswordEmailUseCase.execute("onugosve@hozupid.ao")
    ).rejects.toEqual(new AppError("User does not exist"));
  });

  it("should be able to create a new user token", async () => {
    const create = jest.spyOn(inMemoryUserTokensRepository, "create");
    const email = "pehanef@pinonvi.im";

    await inMemoryUsersRepository.create({
      name: "Juan Moran",
      driver_license: "419361",
      email,
      password: "1234",
    });

    await sendForgottenPasswordEmailUseCase.execute(email);

    expect(create).toHaveBeenCalled();
  });
});
