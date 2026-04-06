import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "API/prisma/schema.prisma",
  migrations: {
    path: "API/prisma/migrations",
  },
  datasource: {
    url: process.env.DIRECT_URL,
  },
});
