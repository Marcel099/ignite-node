import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { prisma } from "../../../../database/prismaClient";


interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient): Promise<String> {
    const foundClient = await prisma.client.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        }
      }
    })

    if (!foundClient) {
      throw new Error("Username or password invalid");
    }

    const doesPasswordMatch = await compare(password, foundClient.password);

    if (!doesPasswordMatch) {
      throw new Error("Username or password invalid");
    }

    const token = sign({ username }, String(process.env.JWT_CLIENT_SECRET_KEY), {
      subject: foundClient.id,
      expiresIn: "15m",
    });

    return token;
  }
}