import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./server/database/schemas/*",
    driver: "mysql2",
    out: "./server/database/migrations",
    dbCredentials: {
        host: "localhost",
        user: "root",
        password: "password",
        database: "test",
    },
    verbose: true,
    strict: true,
});
