import { Delivery } from "@prisma/client";

import { prisma } from "../../../../database/prismaClient";

export class FindAllDeliverymanDeliveriesUseCase {
  async execute(id_deliveryman: string): Promise<Delivery[]> {
    const deliveries = await prisma.delivery.findMany({
      where: {
        id_deliveryman,
      }
    });

    return deliveries;
  }
}