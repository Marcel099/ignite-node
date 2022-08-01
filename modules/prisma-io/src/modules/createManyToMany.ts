import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.coursesModules.create({
    data: {
      fk_id_course: "6621c075-7c8a-4534-b05d-21bf183086cf",
      fk_id_module: "0f0f4f61-5258-41a6-b381-82b4fbd0e5b0"
    }
  })

  console.log(result)
}

main();