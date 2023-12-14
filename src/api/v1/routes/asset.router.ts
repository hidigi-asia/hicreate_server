import { Router } from "express";
import upload from "../../../utilities/multer";
import { AssetController } from "../controllers/asset.controller";

const router = Router();

router.post("/", upload.single("file"), AssetController.create);
router.get("/", AssetController.getAll);
router.get("/:key", AssetController.getById);

export default router;
