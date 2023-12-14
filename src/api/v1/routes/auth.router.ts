import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/me", verifyToken, AuthController.me);

export default router;
