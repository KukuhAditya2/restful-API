import express from "express";
import { getUser, register, login } from "../controllers/user-controllers.js";

const router = express.Router();


router.get('/users', getUser);
router.post('/users/register', register);
router.post('/users/login', login);


export default router;