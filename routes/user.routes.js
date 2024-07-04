import express from "express";
import { loginUser, registerUser } from "../controller/user.controller.js";
// import { userController } from '../controllers/user.controller.js';

const router = express.Router();

// router.post('/register', userController.register);

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
