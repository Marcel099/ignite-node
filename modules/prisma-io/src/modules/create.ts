import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.modules.create({
    data: {
      description: "Aprendendo firebse do zero",
      name: 'Aprendendo firebase',
      courses: {
        create: {
          course: {
            connect: {
              id: "6621c075-7c8a-4534-b05d-21bf183086cf"
            }
          }
        }
      }
    }
  })

  console.log(result)
}

main();