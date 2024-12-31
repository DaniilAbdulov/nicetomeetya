import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import Fastify from "fastify";
import cors from "@fastify/cors";
import { db } from "./db/db.js";
import { USERS_API_URL } from "./config.js";

const PORT = Number(process.env.PORT) || 4002;

const fastify = Fastify();
fastify.register(cors);

fastify.post("/api/create", async (req, reply) => {
    const { from_user_id, to_user_id } = req.body || {};

    if (!from_user_id || !to_user_id) {
        return reply.status(400).send({ error: "invalid" });
    }

    try {
        await db("sympathy").insert({
            from_user_id,
            to_user_id,
            created_at: new Date(),
        });
        return reply.status(201).send({ res: "success" });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
});

fastify.get("/api/", async (req, reply) => {
    try {
        const data = await db("sympathy").select();

        const userIds = data.reduce((acc, { to_user_id, from_user_id }) => {
            acc.push(to_user_id, from_user_id);
            return acc;
        }, []);

        const uniqUserIds = [...new Set(userIds)];

        let users = [];
        const queryString = new URLSearchParams({
            ids: uniqUserIds,
        }).toString();

        try {
            const response = await fetch(
                `${USERS_API_URL}/users?${queryString}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const { result } = await response.json();
            users = result;
        } catch (error) {
            console.error("Error fetching users:", error);
        }

        const result = data.map((item) => {
            const userFromInfo = users.find(
                ({ id }) => id === item.from_user_id
            );
            const userToInfo = users.find(({ id }) => id === item.to_user_id);

            return {
                ...item,
                userFromInfo,
                userToInfo,
            };
        });

        return reply.send({ data: result });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
});

const start = async () => {
    try {
        fastify.listen({ port: PORT }, (err, address) => {
            if (err) throw err;
            // Server is now listening on ${address}
            console.log(`Server started on port ${PORT}`);
        });
    } catch (e) {
        console.error("Server failed to start:", e);
        process.exit(1);
    }
};

start();
