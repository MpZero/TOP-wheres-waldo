import prisma from "../prismaClient";

async function getCoords() {
  const coords = await prisma.image.findMany({
    include: { characters: true },
  });
  console.log(`getCoords: `, coords);

  return coords;
}

export default getCoords;
