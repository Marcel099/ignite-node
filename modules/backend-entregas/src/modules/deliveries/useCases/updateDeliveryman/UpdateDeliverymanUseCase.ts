import { Delivery } from "@prisma/client";

import { prisma } from "../../../../database/prismaClient";

interface IUpdateDeliveryman {
  id_delivery: string;
  id_deliveryman: string;
}

export class UpdateDeliverymanUseCase {
  async execute({ id_delivery, id_deliveryman }: IUpdateDeliveryman): Promise<Delivery> {
    const delivery = await prisma.delivery.update({
      where: {
        id: id_delivery,
      },
      data: {
        id_deliveryman,
      }
    });

    return delivery;
  }
}