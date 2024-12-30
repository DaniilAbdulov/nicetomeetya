export const up = (knex) => knex.schema.createTable("sympathy", (table) => {
    table.increments("id").primary();
    table.integer("from_user_id").notNullable();
    table.integer("to_user_id").notNullable();
    table.datetime("created_at").notNullable();
});


export const down = (knex) => knex.schema.dropTable("sympathy");
