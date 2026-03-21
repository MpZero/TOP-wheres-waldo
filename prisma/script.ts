import prisma from "./prismaClient";

async function main() {
  console.log("Seeding..");

  // await prisma.character.deleteMany();
  // await prisma.user.deleteMany();
  // await prisma.image.deleteMany();

  await prisma.image.create({
    data: {
      name: "film-set",
      url: "https://vuss.io/wp-content/uploads/2025/01/Wheres-Waldo-Film-Set-Super-High-Resolution-scaled.jpg",
      characters: {
        create: [
          { name: "Waldo", x: 91.37, y: 56.08, tolerance: 2 },
          { name: "Wenda", x: 82.7, y: 58.11, tolerance: 2 },
          { name: "Odlaw", x: 5.68, y: 49.55, tolerance: 2 },
          { name: "Wizard Whitebeard", x: 67.14, y: 72.01, tolerance: 2 },
          { name: "Woof", x: 80.32, y: 89.36, tolerance: 2 },
        ],
      },
    },
  });

  // // Fetch all users with their posts
  const images = await prisma.image.findMany({ include: { characters: true } });
  console.log("All images:", images[0]?.characters);
  console.log("Done seeding.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
