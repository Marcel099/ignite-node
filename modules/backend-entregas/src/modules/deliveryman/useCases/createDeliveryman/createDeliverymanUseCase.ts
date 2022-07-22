import { hash } from "bcrypt";
import { Deliveryman } from "@prisma/client";

import { prisma } from "../../../../database/prismaClient";

interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ password, username }: ICreateDeliveryman): Promise<Deliveryman> {
    const foundDeliveryman = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
        
      }
    })

    if (foundDeliveryman) {
      throw new Error('Deliveryman already exists')
    }

    const hashPassword = await hash(String(password), 10);

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword,
      }
    })

    return deliveryman;
  }
}