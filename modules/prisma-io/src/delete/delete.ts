import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.coursesModules.delete({
    where: {
      id: "674f5d6a-9e27-4148-9dad-77e676b638ac"
    }
  });

  console.log(result);
}

main();