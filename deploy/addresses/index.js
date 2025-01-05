import dotenv from "dotenv";
import Fastify from "fastify";
import cors from "@fastify/cors";
import db from "./db/db.js";

dotenv.config({ path: "../.env" });

const PORT = process.env.PORT || 4001;
const fastify = Fastify();


fastify.register(cors);

fastify.get("/", async (request, reply) => {
    const data = {
      msg: 'msg from addresses'
    };

    return reply.send({ data });
});

fastify.get("/api/getCities", async (request, reply) => {
    const {ids: strIds} = request.query || {};
    const ids = strIds ? strIds.split(',') : [];

    if (!ids.length) {
        return reply.send({ message: 'Ids of cities is empty' });
    }

    try {
        const data = await db('cities').select().whereIn('id', ids);

        return reply.send({ data });
    } catch (error) {
        return reply.send({ error });
    }
});

const start = async () => {
    try {
        fastify.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
            if (err) throw err;
            console.log(`Server started on port ${PORT}`);
        });
    } catch (e) {
        console.error("Server failed to start:", e);
        process.exit(1);
    }
};

start();
