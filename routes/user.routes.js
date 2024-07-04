import express from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
} from "../controller/user.controller.js";
import { verifyToken } from "../helper/verifyToken.js";
// import { userController } from '../controllers/user.controller.js';

const router = express.Router();

// router.post('/register', userController.register);

router.post("/register", registerUser);
router.post("/login", verifyToken, loginUser);
router.post("/logout", logOutUser);

export default router;
