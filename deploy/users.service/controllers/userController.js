import db from "../db/db.js";
import dotenv from "dotenv";
import { ADDRESSES_API_URL } from "../config.js";
dotenv.config();

export class UserController {
    async getUsers(req, reply) {
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

                const city = cities?.length ? cities.find(({ id }) => id === city_id)?.name : null;

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
