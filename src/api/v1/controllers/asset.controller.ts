import { Request, Response } from "express";
import { AssetService } from "../services/asset.service";
import { appPath } from "../../../app";
import multer from "multer";

export class AssetController {
    public static async create(req: Request, res: Response) {
        try {
            var { project } = req.body;
            
            var data = {} as any;
            
            data.file = req.file;
            data.project = project;

            const asset = await AssetService.create(data);

            res.status(201).json(asset);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public static async getAll(req: Request, res: Response) {
        try {
            const assets = await AssetService.getAll();

            res.status(200).json({
                data: assets,
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public static async getById(req: Request, res: Response) {
        try {
            const asset = await AssetService.getById(req.params.key);

            res.status(200).json({
                data: asset,
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}
