import { Delivery } from "@prisma/client";
import { prisma } from "../../../../database/prismaClient";

export class FindAllClientDeliveriesUseCase {
  async execute(id_client: string): Promise<Delivery[]> {
    console.log(id_client)
    const deliveries = await prisma.delivery.findMany({
      where: {
        id_client,
      }
    });

    return deliveries;
  }
}