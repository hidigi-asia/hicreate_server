import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import prisma from "../../../utilities/prisma";

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const hashedPassword = req.body.password;

      const user = await prisma.user.create({
        data: {
          identifier: req.body.identifier,
          password: hashedPassword,
        },
      });

      delete user.password;

      const token = AuthService.generateToken(user.id);
      res.status(201).json({ token, user });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Error registering new user." });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const user = await prisma.user.findFirst({
        where: { identifier: req.body.identifier },
      });

      const isValid = await AuthService.comparePassword(
        req.body.password,
        user.password
      );

      delete user.password;

      if (!isValid) {
        res
          .status(401)
          .json({ message: "Invalid credentials or user not found." });
        return;
      }

      const token = AuthService.generateToken(user.id);
      res.status(200).json({ token, user });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Invalid credentials or user not found." });
    }
  }

  static async me(req: Request, res: Response): Promise<void> {
    try {
      var user = req.body.user;
      delete user.password;
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error getting user." });
    }
  }
}
