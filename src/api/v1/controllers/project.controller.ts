import { Request, Response } from "express";
import { ProjectService } from "../services/project.service";

export class ProjectController {
    public static async create(req: Request, res: Response) {
        try {
            const project = await ProjectService.create(req.body);

            res.status(201).json(project);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public static async getAll(req: Request, res: Response) {
        try {
            const projects = await ProjectService.getAll();

            res.status(200).json({
                data: projects,
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public static async getById(req: Request, res: Response) {
        try {
            const project = await ProjectService.getById(req.params.id);

            res.status(200).json(project);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public static async update(req: Request, res: Response) {
        try {
            const project = await ProjectService.update(
                req.params.id,
                req.body.data
            );

            res.status(200).json(project);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public static async delete(req: Request, res: Response) {
        try {
            const project = await ProjectService.delete(req.params.id);

            res.status(200).json(project);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}
