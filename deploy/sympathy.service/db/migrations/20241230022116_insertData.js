const sympathies = [
    {
      id: 1,
      from_user_id: 1,
      to_user_id: 2,
      created_at: '2024-12-20 06:37:04'
    },
  ];

export const up = async (knex) => {
await knex("sympathy").del();

await knex("sympathy").insert(sympathies)
};

export const down = (knex) => knex("sympathy").del();
