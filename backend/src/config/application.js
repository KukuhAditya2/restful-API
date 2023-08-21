import express from "express";
import router from "../routes/public-router.js";
import { errorMiddleware } from "../middleware/error-middlaware.js";
import userRouter from "../routes/user-router.js";


export const app = express();
app.use(express.json());

app.use(router);
app.use(userRouter);

app.use(errorMiddleware);