// import { ThrowError } from "../error/response-error";
import { prismaClient } from "../config/database.js";
import userService from "../service/user-service.js";

export const getUser = async (req, res) => {
    try {
        const users = await prismaClient.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(404).json({ msg: "Data Tidak Di Temukan" })
    }
};

export const register = async (req, res, next) => {
    try {
        const result = await userService.Register(req.body);
        res.status(200).json({ data: result })
    } catch (error) {
        next(error)
    }
};

export const login = async (req, res, next) => {
    try {
        const result = await userService.LoginUser(req.body);
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
};

export const getuser = async (req, res, next) => {
    try {
        const username = req.user.username;
        const result = await userService.GetUser(username);
        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error)
    }
};

export const update = async (req, res, next) => {
    try {
        const username = req.user.username;
        const request = req.body;
        request.username = username
        const result = await userService.UpdateUser(request);
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error);
    }

};

export const logout = async (req, res, next) => {
    try {
        const username = req.user.username
        await userService.Logout(username)
        res.status(200).json({
            data: "OK"
        });
    } catch (error) {
        next(error)
    }
}; 