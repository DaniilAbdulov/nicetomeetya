import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const development = {
    client: "postgresql",
    connection: {
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        // host: "db", //закомментировать при локальном запуске
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        directory: "./db/migrations",
    },
    seeds: {
        directory: "./db/seeds",
    },
};
