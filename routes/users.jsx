const express = require("express");

const userRouter = express.Router();

const {
  getUserInfo,
  getUserById,
  createUser,
  signInUser,
  getUserData,
} = require("../controller/userController");
const { isAuthenticated } = require("../middleware/middlewares");


userRouter.get("/", getUserInfo);

userRouter.get("/profile", isAuthenticated, getUserData);


userRouter.get("/:id", getUserById);


userRouter.post("/sign-up", createUser);


userRouter.post("/sign-in", signInUser);

module.exports = userRouter;