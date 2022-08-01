import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const numberOfRegistersPerPage = 3;
  let pageNumber = 0;

  let exist = true;

  while(exist) {
    const result = await prisma.courses.findMany({
      skip: pageNumber * numberOfRegistersPerPage,
      take: numberOfRegistersPerPage,
    });

    pageNumber++;
  
    console.log(result);
    console.log('------');

    if (result.length === 0) {
      exist = false;
    }
  }
  
}

main();
