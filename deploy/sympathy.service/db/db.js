import knex from "knex";
import { development } from "../knexfile.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const defaultDbConfig = {
    ...development.connection,
    database: 'postgres'
};

const db = knex({ ...development, connection: defaultDbConfig });

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

    newDb = knex(development);

    try {
        await newDb.migrate.latest();
        console.log('Миграции успешно применены');
    } catch (err) {
        console.error('Ошибка при применении миграций:', err);
    } finally {
        await newDb.destroy();
    }
};

runMigrations()
    .then(() => {
        console.log('Инициализация завершена');
    })
    .catch(err => {
        console.error('Ошибка при инициализации базы данных:', err);
    });

export default newDb;
