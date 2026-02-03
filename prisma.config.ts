import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Gunakan as string untuk memastikan tipe datanya benar
    url: process.env["DATABASE_URL"] as string,
  },
});