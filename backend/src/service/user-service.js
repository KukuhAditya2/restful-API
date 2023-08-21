import { validate } from "../validation/validation.js";
import {
  scemaUser,
  scemaLogin,
  scemaGetUser,
  scemaUpdate
} from "../validation/user-validation.js";
import { prismaClient } from "../config/database.js";
import ThrowError from "../error/response-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

// Register User
const Register = async (request) => {
  const user = validate(scemaUser, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username
    }
  });
  if (countUser === 1) {
    throw new ThrowError(400, "Username Already Exists");
  }

  const hasPassword = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: {
      username: user.username,
      password: hasPassword,
      name: user.name
    },
    select: {
      username: true,
      name: true
    }
  });
};

// Login User
const LoginUser = async (request) => {
  const loginValidate = validate(scemaLogin, request);
  const user = await prismaClient.user.findUnique({
    where: {
      username: loginValidate.username
    },
    select: {
      username: true,
      password: true
    }
  });

  if (!user) {
    throw new ThrowError(401, "Username or Password Wrong");
  }
  const passwordValide = await bcrypt.compare(
    loginValidate.password,
    user.password
  );
  if (!passwordValide) {
    throw new ThrowError(401, "Username or Password Wrong");
  }

  const token = uuid();
  return prismaClient.user.update({
    data: {
      token: token
    },
    where: {
      username: user.username
    },
    select: {
      name: true,
      token: true
    }
  });
};

// Get User
const GetUser = async (username) => {
  username = validate(scemaGetUser, username);

  const getUser = await prismaClient.user.findUnique({
    where: {
      username: username
    },
    select: {
      username: true,
      name: true
    }
  });

  if (!getUser) {
    throw new ThrowError(400, "User Is Not Found");
  }

  return getUser;
};

const UpdateUser = async (request) => {
  const userValidate = validate(scemaUpdate, request);

  const user = await prismaClient.user.count({
    where: {
      username: userValidate.username
    }
  });
  if (user !== 1) {
    throw new ThrowError(404, "User Is Not Found");
  }

  const data = {};
  if (userValidate.name) {
    data.name = userValidate.name;
  }
  if (userValidate.password) {
    data.password = await bcrypt.hash(userValidate.password, 10);
  }

  return prismaClient.user.update({
    where: {
      username: userValidate.username
    },
    data: data,
    select: {
      username: true,
      name: true
    }
  });
};

const Logout = async (username) => {
  username = validate(scemaGetUser, username);

  const userLogout = await prismaClient.user.findUnique({
    where: {
      username: username
    }
  });

  if (!userLogout) {
    throw new ThrowError(404, "User Not Found");
  }

  return prismaClient.user.update({
    where: {
      username: username
    },
    data: {
      token: null
    },
    select: {
      username: true
    }
  });
};

export default {
  Register,
  LoginUser,
  GetUser,
  UpdateUser,
  Logout
};
