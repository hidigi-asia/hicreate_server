import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";
import upload from "../../../utilities/multer";

const router = Router();

router.post("/", upload.single("file"), ProjectController.create);
router.get("/", ProjectController.getAll);
router.get("/:id", ProjectController.getById);
router.put("/:id", ProjectController.update);
router.delete("/:id", ProjectController.delete);

export default router;
