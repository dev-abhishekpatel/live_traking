import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

const users = [
  {
    id: 'u-1001',
    name: 'Admin User',
    email: 'admin@schoolbus.com',
    password: '$2a$10$QnTmjiKcDlBOc6o/iAxC/.84b.Wb7glqH/Kza8Y8T7iSNpUuKBHjm',
    role: 'admin',
  },
  {
    id: 'u-1002',
    name: 'Driver User',
    email: 'driver@schoolbus.com',
    password: '$2a$10$QnTmjiKcDlBOc6o/iAxC/.84b.Wb7glqH/Kza8Y8T7iSNpUuKBHjm',
    role: 'driver',
  },
  {
    id: 'u-1003',
    name: 'Parent User',
    email: 'parent@schoolbus.com',
    password: '$2a$10$QnTmjiKcDlBOc6o/iAxC/.84b.Wb7glqH/Kza8Y8T7iSNpUuKBHjm',
    role: 'parent',
  },
  {
    id: 'u-1004',
    name: 'Staff User',
    email: 'staff@schoolbus.com',
    password: '$2a$10$QnTmjiKcDlBOc6o/iAxC/.84b.Wb7glqH/Kza8Y8T7iSNpUuKBHjm',
    role: 'staff',
  },
];

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }

  const normalizedEmail = email.toLowerCase();
  const existingUser = users.find((user) => user.email.toLowerCase() === normalizedEmail);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = {
    id: `u-${Date.now()}`,
    name,
    email: normalizedEmail,
    password: await bcrypt.hash(password, 10),
    role: role || 'parent',
  };

  users.push(user);

  return res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token: generateToken(user),
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token: generateToken(user),
  });
};
