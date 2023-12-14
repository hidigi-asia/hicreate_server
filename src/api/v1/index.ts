import { Router } from "express";

import authRouter from "./routes/auth.router";
import assetRouter from "./routes/asset.router";
import projectRouter from "./routes/project.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/assets", assetRouter);
router.use("/projects", projectRouter);

export default router;
