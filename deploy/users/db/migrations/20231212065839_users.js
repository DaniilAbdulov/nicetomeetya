export const up = async (knex) => {
    return await Promise.all([
        knex.schema.createTable("users", (table) => {
            table.increments("id").primary().defaultTo(1);
            table.string("first_name").notNullable();
            table.string("last_name").notNullable();
            table.string("middle_name").notNullable();
            table.integer("role_id").notNullable();
        }),
        knex.schema.createTable("roles", (table) => {
            table.increments("id").primary().defaultTo(1);
            table.string("role").notNullable();
        }),
        knex.schema.createTable("auth", (table) => {
            table.increments("id").primary().defaultTo(1);
            table.string("login").notNullable();
            table.string("password").notNullable();
        }),
    ]);
};

export const down = async (knex) => {
    return await Promise.all([
        knex.schema.dropTable("users"),
        knex.schema.dropTable("roles"),
        knex.schema.dropTable("auth"),
    ]);
};
