export const up = async (knex) => {
    return await Promise.all([
        knex.schema.createTable("users", (table) => {
            table.increments("id").primary();
            table.string("first_name").notNullable();
            table.string("last_name").notNullable();
            table.string("middle_name").notNullable();
            table.integer("role_id").notNullable();
            table.integer("city_id").notNullable();
        }),
        knex.schema.createTable("roles", (table) => {
            table.increments("id").primary();
            table.string("role").notNullable();
        }),
        knex.schema.createTable("auth", (table) => {
            table.increments("id").primary();
            table.string("login").notNullable();
            table.string("password").notNullable();
            table.integer("user_id").unsigned();
            table.foreign("user_id").references("id").inTable("users");
        }),
    ]);
};

export const down = async (knex) => {
    return await Promise.all([
        knex.schema.dropTable("roles"),
        knex.schema.dropTable("auth"),
        knex.schema.dropTable("users")
    ]);
};
