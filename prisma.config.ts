import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // For schema push/migrations use the session-mode pooler (port 5432)
    // NOT the transaction-mode pooler (port 6543 with pgbouncer=true)
    // which causes "prepared statement already exists" errors
    url: process.env["DIRECT_URL"],
  },
});
