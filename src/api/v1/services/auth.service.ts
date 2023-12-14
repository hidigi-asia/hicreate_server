import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    // return bcrypt.compare(password, hashedPassword);
    return password === hashedPassword;
  }

  static generateToken(userId: number): string {
    return jwt.sign({ userId }, JWT_SECRET);
  }
}
