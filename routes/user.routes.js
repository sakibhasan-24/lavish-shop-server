import express from "express";
import {
  getAlluser,
  loginUser,
  logOutUser,
  registerUser,
  updateUser,
} from "../controller/user.controller.js";
import { verifyAdmin, verifyToken } from "../helper/verifyToken.js";
// import { userController } from '../controllers/user.controller.js';

const router = express.Router();

// router.post('/register', userController.register);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.get("/get-all-users", verifyToken, verifyAdmin, getAlluser);
router.put("/update/:id", verifyToken, updateUser);
export default router;
