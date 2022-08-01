import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.coursesModules.findMany({
    include: {
      course: {
        select: {
          name: true,
          duration: true,
        }
      },
      module: {
        select: {
          description: true,
        }
      },
    }
  })

  console.log(JSON.stringify(result))
}

main();