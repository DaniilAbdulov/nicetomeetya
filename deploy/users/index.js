import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import Fastify from "fastify";
import cors from "@fastify/cors";
import { UserController } from "./controllers/userController.js";
import authMiddleware from "./middleware/authMiddleware.js";
import { AuthController } from "./controllers/authController.js";
import db from "./db/db.js";

const userController = new UserController();
const authController = new AuthController();

const PORT = Number(process.env.PORT) || 4000;

const fastify = Fastify();

fastify.register(cors);

//
fastify.get("/", (request, reply) => {
    reply.send({ message: "just answer" });
});


//
fastify.get("/api/checkServer", (request, reply) => {
    reply.send({ message: "!!!!docker server launched!!!" });
});

fastify.post("/api/auth/login", async (req, reply) => {
    try {
        await authController.login(req, reply, db);
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка обработки запроса" });
    }
});

fastify.get("/api/auth", async (req, reply) => {
    try {
        const checkedReq = authMiddleware(req);

        await authController.check(checkedReq, reply, db);
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка обработки запроса" });
    }
});


///////
fastify.get("/api/users", async (req, reply) => {
    try {
        await userController.getUsers(req, reply, db);
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка обработки запроса" });
    }
});


const start = async () => {
    try {
        fastify.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
            if (err) throw err;
            console.log(`Server started on port ${PORT}`);
            console.log(`Full address: ${address}`);
        });
    } catch (e) {
        console.error("Server failed to start:", e);
        process.exit(1);
    }
};

start();
