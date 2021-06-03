// import express from "express";
// import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

// const router = express.Router();

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const exisingUser = await User.findOne({ email });

    if (!exisingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      exisingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: exisingUser.email, id: exisingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: exisingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, username } = req.body;
  //   const { email, password, confirmPassword, username } = req.body;

  try {
    const exisingUser = await User.findOne({ email });

    if (exisingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

// export default router;
