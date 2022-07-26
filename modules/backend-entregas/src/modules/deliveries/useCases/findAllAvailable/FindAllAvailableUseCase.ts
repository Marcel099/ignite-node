import { Delivery } from "@prisma/client";

import { prisma } from "../../../../database/prismaClient";

export class FindAllAvailableUseCase {
  async execute(): Promise<Delivery[]> {
    const deliveries = await prisma.delivery.findMany({
      where: {
        ended_at: null,
        id_deliveryman: null,
      },
    });

    return deliveries;
  }
}