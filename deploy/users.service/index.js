import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import Fastify from "fastify";
import cors from "@fastify/cors";
import { UserController } from "./controllers/userController.js";

const userController = new UserController();

const PORT = Number(process.env.PORT) || 4000;

const fastify = Fastify();

fastify.register(cors);
fastify.get("/api/checkServer", (request, reply) => {
    reply.send({ message: "!!!!docker server launched!!!" });
});
fastify.post("/api/auth/login", async (req, reply) => {
    try {
        await userController.login(req, reply);
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка обработки запроса" });
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
