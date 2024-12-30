const cities = [
    {
      name: 'Belene',
    },
    {
      name: 'Hushi',
    },
    {
      name: 'Lixiqiao',
    },
    {
      name: 'Coloncito',
    },
    {
      name: 'Klyetsk',
    },
    {
      name: 'Flora',
    },
    {
      name: 'San Jerónimo',
    },
    {
      name: 'Pyatigorsk',
    },
    {
      name: 'Dowsk',
    },
    {
      name: 'Manado',
    },
  ];

export const up = async (knex) => {
await knex("cities").del();

await knex("cities").insert(cities)
};

export const down = (knex) => knex("cities").del();
