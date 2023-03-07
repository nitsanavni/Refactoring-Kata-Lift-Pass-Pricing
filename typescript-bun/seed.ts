import { file } from "bun";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    port: +(process.env.DB_PORT || "3306"),
    user: "root",
    password: "mysql",
    multipleStatements: true,
});

console.log(
    await connection.query(await file("../database/initDatabase.sql").text())
);

connection.destroy();
