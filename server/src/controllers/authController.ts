import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CustomError from "../utils/CustomError";
import asyncWrapper from "../utils/asyncWrapper";
import { Request, Response, NextFunction } from "express";
import { any } from "joi";

// Register user
export const register = asyncWrapper(async (req, res) => {
  const { username, password, role, name, phoneNumber, email } = req.body;

  // check the existing user
  const existUsername = await User.findOne({ username });
  if (existUsername) {
    throw new CustomError("Username already exists", 409);
  }

  // check the email user
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new CustomError("Email already exists", 409);
  }

  // Hash the password
  if (password) {
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashPassword,
      role,
      name,
      phoneNumber: phoneNumber,
      email,
    });

    // Ensure role is not admin
    if (newUser.role === "Admin") {
      throw new CustomError("Cannot register as admin", 400);
    }

    newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  }
});

export const registerAdminAccount = asyncWrapper(async (req, res) => {
  const { username, password, name, phoneNumber, email } = req.body;

  // check the existing user
  const existUsername = await User.findOne({ username });
  if (existUsername) {
    throw new CustomError("Username already exists", 409);
  }

  // check the email user
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new CustomError("Email already exists", 409);
  }

  // Hash the password
  if (password) {
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newAdmin = new User({
      username,
      password: hashPassword,
      role: "Admin",
      name,
      phoneNumber: phoneNumber,
      email,
    });

    newAdmin.save();
    res
      .status(201)
      .json({ success: true, message: "Admin user registered successfully" });
  }
});

// Login user
export const login = asyncWrapper(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) throw new CustomError("Invalid login credentials", 400);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new CustomError("Invalid login credentials", 400);

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
  return res.status(200).json({
    message: "Login Successful...!",
    username: user.username,
    token,
  });
});

// View profile
export const profile = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json(user);
});

// Reset password
export const resetPassword = asyncWrapper(async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    throw new CustomError(
      "New password and confirm password do not match",
      400
    );
  }

  const user = await User.findById(req.user.id);
  if (!user) throw new CustomError("User not found", 404);

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw new CustomError("Current password is incorrect", 400);

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedPassword = await User.findByIdAndUpdate(
    req.user.id,
    { password: hashedPassword },
    {
      new: true,
    }
  );
  res
    .status(201)
    .json({ success: true, message: "Password resetted successfully" });
});
