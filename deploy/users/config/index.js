import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const development = {
    connect: {
        client: 'pg',
        connection: {
            host: process.env.POSTGRES_HOSTNAME,
            port: 5432,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB
        },
        migrations: {
          tableName: 'knex_migrations',
          directory: './migrations'
        },
        pool: { min: 0, max: 10 }
}
}