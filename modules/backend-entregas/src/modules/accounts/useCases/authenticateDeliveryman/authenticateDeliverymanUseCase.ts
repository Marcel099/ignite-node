import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { prisma } from "../../../../database/prismaClient";


interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman): Promise<String> {
    const foundDeliveryman = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        }
      }
    })

    if (!foundDeliveryman) {
      throw new Error("Username or password invalid");
    }

    const doesPasswordMatch = await compare(password, foundDeliveryman.password);

    if (!doesPasswordMatch) {
      throw new Error("Username or password invalid");
    }

    const token = sign({ username }, String(process.env.JWT_DELIVERYMAN_SECRET_KEY), {
      subject: foundDeliveryman.id,
      expiresIn: "1d",
    });

    return token;
  }
}