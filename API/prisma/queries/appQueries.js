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

  // console.log(`characters: `, characters);

  return characters;
}

export { getCoords, findCharacters };
