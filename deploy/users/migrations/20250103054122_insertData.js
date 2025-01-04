import bcrypt from "bcrypt";
const saltRounds = 3;

const users = [
    {
      first_name: 'admin',
      last_name: 'admin',
      middle_name: 'admin',
      role_id: 1,
      city_id: 1,
    },
    {
      first_name: 'user',
      last_name: 'user',
      middle_name: 'user',
      role_id: 2,
      city_id: 2,
    },
    {
      first_name: 'Haven',
      last_name: 'Bolesma',
      middle_name: 'Georgianna',
      role_id: 3,
      city_id: 3,
    },
    {
      first_name: 'Mildrid',
      last_name: 'Izatt',
      middle_name: 'Fabiano',
      role_id: 2,
      city_id: 4,
    },
    {
      first_name: 'Dickie',
      last_name: 'Priestley',
      middle_name: 'Tobey',
      role_id: 5,
      city_id: 5,
    },
    {
      first_name: 'Fania',
      last_name: 'Avrashin',
      middle_name: 'Elaina',
      role_id: 3,
      city_id: 6,
    },
    {
      first_name: 'Genia',
      last_name: 'Sturman',
      middle_name: 'Erie',
      role_id: 2,
      city_id: 7,
    },
    {
      first_name: 'Phillipe',
      last_name: 'Raddenbury',
      middle_name: 'Dasya',
      role_id: 3,
      city_id: 8,
    },
    {
      first_name: 'Kaleena',
      last_name: 'Hubback',
      middle_name: 'Jillane',
      role_id: 2,
      city_id: 9,
    },
    {
      first_name: 'Stearne',
      last_name: 'Durrance',
      middle_name: 'Nance',
      role_id: 3,
      city_id: 10,
    },
    {
      first_name: 'Verena',
      last_name: 'Sandom',
      middle_name: 'Dania',
      role_id: 2,
      city_id: 1,
    },
    {
      first_name: 'Bran',
      last_name: 'Lazar',
      middle_name: 'Mathew',
      role_id: 3,
      city_id: 2,
    },
    {
      first_name: 'Dieter',
      last_name: 'Jakeway',
      middle_name: 'Benji',
      role_id: 2,
      city_id: 3,
    },
    {
      first_name: 'Lilias',
      last_name: 'Cansfield',
      middle_name: 'Cletus',
      role_id: 3,
      city_id: 4,
    },
    {
      first_name: 'Borden',
      last_name: 'Jecock',
      middle_name: 'Astrid',
      role_id: 2,
      city_id: 5,
    },
    {
      first_name: 'Sheffield',
      last_name: 'Pummery',
      middle_name: 'Raffarty',
      role_id: 3,
      city_id: 6,
    },
    {
      first_name: 'Mikel',
      last_name: 'Tantrum',
      middle_name: 'Karla',
      role_id: 2,
      city_id: 7,
    },
    {
      first_name: 'Shaina',
      last_name: 'Hacun',
      middle_name: 'Leda',
      role_id: 3,
      city_id: 8,
    },
    {
      first_name: 'Gerti',
      last_name: 'Bishell',
      middle_name: 'Sisile',
      role_id: 2,
      city_id: 9,
    },
    {
      first_name: 'Sullivan',
      last_name: 'Rraundl',
      middle_name: 'Engracia',
      role_id: 3,
      city_id: 10,
    },
];

const newUsers = [];

for (let i = 0; i < 100; i++) {
  if (i === 0) {
      newUsers.push(...users);
  }

  const updatedUsers = users.map((user) => {

      return {
          ...user,
          first_name: `${user.first_name}${i}`,
          last_name: `${user.last_name}${i}`,
          middle_name: `${user.middle_name}${i}`
      }
  })

  newUsers.push(...updatedUsers)
}


export const up = async (knex) => {
  await knex("users").del();

  const hashedPasswords = await Promise.all(newUsers.map(({first_name}) => bcrypt.hash(first_name, saltRounds)));
  const usersForAuth = newUsers.map(({first_name}, index) => {

    return {
        user_id: index + 1,
        login: first_name,
        password: hashedPasswords[index]
      }
    });

   await Promise.all([
      knex("users").insert(newUsers),
        knex("auth").insert(usersForAuth),
        knex("roles").insert([
            {
                role: "admin"
            },
            {
                role: "user"
            },
            {
                role: "premium"
            }
        ])
    ])
};

export const down = async (knex) => await Promise.all(
    [knex("roles").del(),
        knex("auth").del(),
        knex("users").del(),
    ]
);
