import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import Fastify from "fastify";
import cors from "@fastify/cors";
import { SympathyController } from "./controllers/sympathyController.js";
import db from "./db/db.js";

const sympathyController = new SympathyController();

const PORT = Number(process.env.PORT) || 4002;

const fastify = Fastify();

fastify.register(cors);

fastify.post("/api/create", async (req, reply) => {
    try {
        await sympathyController.create(req, reply, db);
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка обработки запроса" });
    }
});

fastify.get("/api", async (req, reply) => {
    try {
        await sympathyController.getSympathies(req, reply, db);
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
});

const start = async () => {
    try {
        fastify.listen({ port: PORT, host: '0.0.0.0'}, (err, address) => {
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
