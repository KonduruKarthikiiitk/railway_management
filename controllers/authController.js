import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByUsername } from "../models/userModel.js";

const registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  const existingUser = await findUserByUsername(username);
  if (existingUser) return res.status(400).json({ message: "User exists" });

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const newUser = await createUser(username, passwordHash, role);
  res.json(newUser);
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const validPassword = await bcrypt.compare(password, user.password_hash);
  if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
};

export { registerUser, loginUser };
