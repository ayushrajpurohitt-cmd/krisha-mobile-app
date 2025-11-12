import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface User {
  id: string;
  email: string;
  name: string;
}

// Simple in-memory storage for demo purposes
// In production, use a proper database
const users: Array<{ id: string; email: string; password: string; name: string }> = [];

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(user: User): string {
  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; name?: string };
    return { id: decoded.userId, email: decoded.email, name: decoded.name || '' };
  } catch {
    return null;
  }
}

export async function registerUser(email: string, password: string, name: string): Promise<{ user: User; token: string } | null> {
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return null;
  }

  const hashedPassword = await hashPassword(password);
  const user = {
    id: Date.now().toString(),
    email,
    password: hashedPassword,
    name
  };
  
  users.push(user);
  
  const userResponse: User = { id: user.id, email: user.email, name: user.name };
  const token = generateToken(userResponse);
  
  return { user: userResponse, token };
}

export async function loginUser(email: string, password: string): Promise<{ user: User; token: string } | null> {
  const user = users.find(u => u.email === email);
  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return null;
  }

  const userResponse: User = { id: user.id, email: user.email, name: user.name };
  const token = generateToken(userResponse);
  
  return { user: userResponse, token };
}
