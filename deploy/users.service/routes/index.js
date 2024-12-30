import express from "express";
const router = express.Router();
import authRouter from "./authRouter.js";
import usersRouter from "./usersRouter.js";

router.use("/auth", authRouter);
router.use("/users", usersRouter);

export default router;
