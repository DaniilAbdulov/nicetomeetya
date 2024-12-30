import bcrypt from "bcrypt";
import { db } from "../db/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ADDRESSES_API_URL } from "../config.js";
dotenv.config();

const generateJwt = (id, first_name, last_name) => {
    const payload = {
        id,
        first_name,
        last_name,
    };

    const secret = process.env.SECRET_KEY;
    const options = {
        expiresIn: "1h",
    };

    return jwt.sign(payload, secret, options);
};

export class UserController {
    async login(req, reply) {
        try {
            const { login, password } = req.body || {};

            if (!login || !password) {
                return reply
                    .status(422)
                    .send({ message: "Введены некорректные данные" });
            }

            const [findUser, roles] = await Promise.all([
                db("auth").where("login", login).first(),
                db("roles").select(),
            ]);

            const { user_id } = findUser || {};

            if (!user_id) {
                return reply
                    .status(404)
                    .send({ message: "Нет такого пользователя" });
            }

            const [candidate] = await db("users")
                .select()
                .where({ id: user_id });

            const comparePassword = bcrypt.compareSync(
                password,
                findUser.password
            );

            if (!comparePassword) {
                return reply.status(404).send({ message: "Неверный пароль" });
            }

            const token = generateJwt(
                candidate.id,
                candidate.first_name,
                candidate.last_name
            );
            const user = {
                ...candidate,
                ...findUser,
            };

            return reply.send({ token, user });
        } catch (error) {
            console.error(error);
            return reply
                .status(500)
                .send({ message: "Непредвиденная ошибка сервера" });
        }
    }

    async check(req, reply) {
        try {
            const { id } = req.user;
            if (id <= 0) {
                return reply
                    .status(422)
                    .send({ message: "Некорректные данные" });
            }

            const currentUser = await db("users")
                .select()
                .where({ id })
                .first();

            if (!currentUser) {
                return reply.status(400).send({
                    message:
                        "Ошибка получения данных об авторизованном пользователе",
                });
            }

            const token = generateJwt(
                currentUser.id,
                currentUser.first_name,
                currentUser.last_name
            );

            return reply.send({ token, user: currentUser });
        } catch (error) {
            console.error(error);
            return reply
                .status(500)
                .send({ message: "Непредвиденная ошибка сервера" });
        }
    }

    async users(req, reply) {
        const { ids } = req.query || {};

        try {
            const model = db("users").select().limit(20);

            if (ids) {
                const splittedIds = ids.split(",");
                model.whereIn("id", splittedIds);
            }

            const users = await model;

            const usersCities = users.reduce((acc, { city_id }) => {
                if (city_id) {
                    acc.push(city_id);
                }

                return acc;
            }, []);

            const uniqueCitiesIds = [...new Set(usersCities)];

            let cities;
            const queryString = new URLSearchParams({
                ids: uniqueCitiesIds,
            }).toString();

            try {
                const response = await fetch(
                    `${ADDRESSES_API_URL}/getCities?${queryString}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const { data } = await response.json();
                cities = data;
            } catch (e) {
                console.error(e);
            }

            const result = users.reduce((acc, user) => {
                const {
                    id,
                    first_name,
                    last_name,
                    middle_name,
                    role_id,
                    city_id,
                } = user || {};

                const city = cities.find(({ id }) => id === city_id)?.name;

                acc.push({
                    id,
                    first_name,
                    last_name,
                    middle_name,
                    role_id,
                    city,
                });

                return acc;
            }, []);

            return reply.send({ result });
        } catch (error) {
            console.error(error);
            return reply
                .status(500)
                .send({ message: "Непредвиденная ошибка сервера" });
        }
    }
}
