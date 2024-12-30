import { Router } from "express";
import authController from "../controllers/authController.js";
const router = new Router();

router.get("/", authController.users);

export default router;
