import prisma from "./prismaClient";

async function main() {
  console.log("Seeding..");

  // await prisma.image.create({
  //   data: {
  //     name: "film-set",
  //     characters: {
  //       create: [
  //         { name: "Waldo", x: 91.37, y: 56.08, tolerance: 2 },
  //         // { name: "Wenda", x: 0.55, y: 0.62, tolerance: 0.03 },
  //         // { name: "Odlaw", x: 0.18, y: 0.81, tolerance: 0.03 },
  //         // { name: "Wizard Whitebeard", x: 0.73, y: 0.29, tolerance: 0.04 },
  //         // { name: "Woof", x: 0.47, y: 0.88, tolerance: 0.025 },
  //       ],
  //     },
  //   },
  // });

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
