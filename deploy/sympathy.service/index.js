import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import cors from "cors";
import { db } from './db/db.js';
import { USERS_API_URL } from "./config.js";

const PORT = process.env.PORT || 4002;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/create", async (req, res) => {
    const { from_user_id, to_user_id } = req.body || {};

    if (!from_user_id || !to_user_id) {
        return res.status(400).json({ error: 'invalid' });
    }

    try {
        await db('sympathy').insert({ from_user_id, to_user_id, created_at: new Date() });
        return res.status(201).json({ res: 'success' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/api/", async (req, res) => {
    try {
        const data = await db('sympathy').select();

        const userIds = data.reduce((acc, { to_user_id, from_user_id }) => {
            acc.push(to_user_id, from_user_id);
            return acc;
        }, []);

        const uniqUserIds = [...new Set(userIds)];

        let users = [];
        const queryString = new URLSearchParams({ ids: uniqUserIds }).toString();

        try {
            const response = await fetch(`${USERS_API_URL}/users?${queryString}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const { result } = await response.json();
            users = result;
        } catch (error) {
            console.error("Error fetching users:", error);
        }

        const result = data.map(item => {
            const userFromInfo = users.find(({ id }) => id === item.from_user_id);
            const userToInfo = users.find(({ id }) => id === item.to_user_id);

            return {
                ...item,
                userFromInfo,
                userToInfo
            };
        });

        return res.json({ data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.error("Server failed to start:", e);
    }
};

start();
