import prisma from "../prisma/prismaClient.js";

async function getCoords() {
  const coords = await prisma.image.findMany({
    include: { characters: true },
  });

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
  await prisma.user.create({
    data: { name: name, time: time },
  });
}

async function fetchImage(id) {
  const image = await prisma.image.findUnique({
    where: { id: id },
  });
  return image.url;
}
export { getCoords, findCharacters, createUser, findUsers, fetchImage };
