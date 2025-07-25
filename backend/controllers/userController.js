import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/userModel.js';
import { getBillsByUserId } from '../models/billModel.js';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

export const registerUser = async (req, res) => {
  const { name, email, password, flat_no } = req.body;
  const existing = await findUserByEmail(email);
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await createUser(name, email, hashed, flat_no);
  res.json({ token: generateToken(user.id), name: user.name });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ token: generateToken(user.id), name: user.name });
};

export const getUserBills = async (req, res) => {
  const bills = await getBillsByUserId(req.user.id);
  res.json(bills);
};
