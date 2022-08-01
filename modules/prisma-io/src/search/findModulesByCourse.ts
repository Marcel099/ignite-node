import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.findMany({
    where: {
      id: "316c56fb-e9da-4fd1-81b9-0ef980044d84",
    },
    include: {
      modules: {
        include: {
          module: true,
        }
      },
    }
  });

  console.log(JSON.stringify(result));
}

main();