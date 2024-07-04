import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const existUser = await User.findOne({ email });
  if (existUser) return res.status(409).json({ message: "User already exist" });
  const user = await User.create({ name, email, password });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  // before create token hashed pass
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    secure: true,
  });
  return res.status(201).json({
    message: "User created successfully",
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "Something Went Wrong" });
  try {
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Something Went Wrong" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const logOutUser = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    maxAge: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({
    message: "Logout successful",
    success: true,
  });
};
