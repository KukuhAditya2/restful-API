import express from "express";
import { getuser, update, logout } from "../controllers/user-controllers.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { createAddress, updateAddress, getAddress, deleteAddres, list } from "../controllers/address-controller.js";
import { create, getContact, updateContact, deleteContact, search } from "../controllers/contact-controller.js";


const userRouter = express.Router();

userRouter.use(authMiddleware);

// User API
userRouter.get('/users/current', getuser);
userRouter.patch('/users/current', update);
userRouter.delete('/users/logout', logout);

// Contact API
userRouter.post('/contacts', create);
userRouter.get('/contacts/:contactId', getContact);
userRouter.put('/contacts/:contactId', updateContact);
userRouter.delete('/contacts/:contactId', deleteContact);
userRouter.get('/contacts', search);

// Address API
userRouter.post('/contacts/:contactId/address', createAddress);
userRouter.put('/contacts/:contactId/address/:addressId', updateAddress);
userRouter.get('/contacts/:contactId/address/:addressId', getAddress);
userRouter.delete('/contacts/:contactId/address/:addressId', deleteAddres);
userRouter.get('/contacts/:contactId/address', list);


export default userRouter;