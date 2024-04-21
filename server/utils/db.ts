import mysql from "mysql2";
import { drizzle } from "drizzle-orm/mysql2";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "test",
});
export const db = drizzle(connection);
