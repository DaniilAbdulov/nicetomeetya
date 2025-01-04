import knex from "knex";
import { devConnection } from "../knexfile.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const isLocalDev = Boolean(process.env.ISLOCALDEV);
devConnection.connection.database = 'postgres';

if (isLocalDev) {
  delete devConnection.connection.host;
}

const db = knex(devConnection);
let newDb;

const runMigrations = async () => {
    try {
        await db.raw(`CREATE DATABASE ${process.env.POSTGRES_DB}`);
        console.log(`База данных ${process.env.POSTGRES_DB} создана`);
    } catch (error) {
        if (error.code !== '42P04') {
            console.error('Ошибка при создании базы данных:', error);
        }
    } finally {
        await db.destroy();
    }

    devConnection.connection.database = process.env.POSTGRES_DB;

    if (!isLocalDev) {
        devConnection.connection.host = process.env.POSTGRES_HOSTNAME;
    }

    newDb = knex(devConnection);

    try {
        await newDb.migrate.latest();
        console.log('Миграции успешно применены');
    } catch (err) {
        console.error('Ошибка при применении миграций:', err);
    }
};

await runMigrations()
    .then(() => {
        console.log('Инициализация завершена');
    })
    .catch(err => {
        console.error('Ошибка при инициализации базы данных:', err);
    });

export default newDb;
