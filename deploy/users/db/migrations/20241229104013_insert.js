import bcrypt from "bcrypt";
const saltRounds = 7;

export const up = async (knex) => {
await knex("users").del();

    const hashedPasswords = await Promise.all([
        bcrypt.hash("admin", saltRounds),
        bcrypt.hash("user", saltRounds)
    ]);

    await Promise.all([
        knex("users").insert([
            {
                first_name: "Админ",
                last_name: "Админов",
                middle_name: "Админович",
                role_id: 1
            },
            {
                first_name: "Пользователь",
                last_name: "Пользователев",
                middle_name: "Пользователевич",
                role_id: 2
            }
        ]),
        knex("auth").insert([
            {
                user_id: 1,
                login: "admin",
                password: hashedPasswords[0]
            },
            {
                user_id: 2,
                login: "user",
                password: hashedPasswords[1]
            }
        ]),
        knex("roles").insert([
            {
                role: "admin"
            },
            {
                role: "user"
            }
        ])
    ])
};

export const down = async (knex) => await Promise.all(
    [knex("roles").del(),
        knex("auth").del(),
        knex("users").del(),

    ]
) ;
