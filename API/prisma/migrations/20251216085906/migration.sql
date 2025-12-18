-- CreateTable
CREATE TABLE "Coordinates" (
    "id" SERIAL NOT NULL,
    "WaldoX" TEXT NOT NULL DEFAULT '91.48',
    "WaldoY" TEXT NOT NULL DEFAULT '55.55',

    CONSTRAINT "Coordinates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "won" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
