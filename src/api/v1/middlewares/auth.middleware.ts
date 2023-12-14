import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../../utilities/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    req.body.user = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: req.body.user.userId },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.body.user = user;

    next();
  } catch (error) {
    res.status(400).json({ message: `Invalid token. ${error}` });
  }
};
