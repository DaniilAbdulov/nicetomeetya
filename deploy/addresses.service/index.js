import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import cors from "cors";
import {db} from './db/db.js'

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/getCities", async(req, res) => {
    const strIds = req.query?.ids || [];
    const ids = strIds.split(',');

    try {
        const data = await db('cities').select().whereIn('id', ids);

       return res.json({data});
    } catch (error) {
        return  res.json({error});
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
