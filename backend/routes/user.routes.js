import express from "express";
import {
  login,
  signUp,
  getUser,
  getLeaderboard,
  logout,
} from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const userRoutes = express.Router();

userRoutes.get("/getUserDetails", auth, getUser);
userRoutes.get("/leaderboard", auth, getLeaderboard);
userRoutes.post("/login", login);
userRoutes.post("/signup", signUp);
userRoutes.get("/logout", auth, logout);

export default userRoutes;
