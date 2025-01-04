import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
export default function authMiddleware(req, res) {

    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Не авторизован" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decoded;

        return req;
    } catch (e) {
        res.status(401).json({ message: "Не авторизован" });
    }
}
