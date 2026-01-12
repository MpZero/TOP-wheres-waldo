import prisma from "../prismaClient";

async function getCoords() {
  const coords = await prisma.image.findMany({
    include: { characters: true },
  });
  console.log(`getCoords: `, coords);

  return coords;
}
async function findCharacters(imageIds) {
  const characters = await prisma.character.findMany({
    where: { imageId: imageIds },
  });

  return characters;
}

async function findUsers() {
  const users = await prisma.user.findMany({
    take: 10,
    orderBy: { time: "asc" },
  });
  return users;
}

async function createUser(time, name) {
  const user = await prisma.user.create({
    data: { name: name, time: time },
  });
  console.log(user);
}
export { getCoords, findCharacters, createUser, findUsers };
