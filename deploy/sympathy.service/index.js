import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express, { query } from "express";
import cors from "cors";
import {db} from './db/db.js'

const PORT = process.env.PORT || 4002;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/create", async(req, res) => {
    const {from_user_id, to_user_id} = req.body || {};

    if (!from_user_id || !to_user_id) {
        return res.json({error: 'invalid'});
    }

    try {
       await db('sympathy').insert({from_user_id, to_user_id, created_at: new Date()})

       return res.json({res: 'success'});
    } catch (error) {
        return res.json({error});
    }

});

app.get("/api/", async(req, res) => {
    const {from_user_id} = req.query || {};

    if (!from_user_id) {
        return res.json({error: 'invalid'});
    }

    try {
        const data = await db('sympathy').select().where({from_user_id});
        console.log(data);
       return res.json({data});
    } catch (error) {
        console.log(error)
        return res.json({error});
    }

});

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
