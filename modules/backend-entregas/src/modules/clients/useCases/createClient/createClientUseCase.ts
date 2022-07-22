import { hash } from "bcrypt";
import { Client } from "@prisma/client";

import { prisma } from "../../../../database/prismaClient";

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ password, username }: ICreateClient): Promise<Client> {
    const foundClient = await prisma.client.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
        
      }
    })

    if (foundClient) {
      throw new Error('Client already exists')
    }

    const hashPassword = await hash(String(password), 10);

    const client = await prisma.client.create({
      data: {
        username,
        password: hashPassword,
      }
    })

    return client;
  }
}