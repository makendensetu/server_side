import { SSL_OP_ALL } from 'constants';
import { MakeImage } from './makeImage/makeimage';
import { PrismaClient } from '@prisma/client';

const imager = new MakeImage();
imager.make(35.6595327, 139.7445911);

const sharp = require('sharp');

sharp('page-ss.png').resize(400, 400);

sharp('tower.png')
  .composite([
    {
      input: 'clone.png',
      gravity: 'southeast',
    },
  ])
  .toFile('output.png', (err: string, info: string) => {
    if (err) {
      throw err;
    }
  });

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
  // ... you will write your Prisma Client queries here
  const allUsers = await prisma.user.findMany({
    include: { posts: true },
  });

  // use `console.dir` to print nested objects

  console.dir(allUsers, { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
