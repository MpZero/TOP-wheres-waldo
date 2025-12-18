import prisma from "../prismaClient";

async function findUsers() {
  return prisma.user.findMany({});
}

export default findUsers;
