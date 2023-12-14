import fs from "fs";
import prisma from "../../../utilities/prisma";

var uploadDir = "/uploads/";

export class AssetService {
    public static async create(data: any) {
        try {
            const file = data.file;
            const originalName = file.originalname;
            const extension = originalName.split(".") || undefined;

            const asset = await prisma.asset.create({
                data: {
                    id: file.key,
                    extension: extension[extension.length - 1],
                    fileName: file.originalname,
                    url: file.location,
                    projects: {
                        connect: {
                            id: data.project || undefined,
                        },
                    },
                },
            });

            return asset;
        } catch (error) {
            console.log(error);
            
            throw error;
        }
    }

    public static async getAll() {
        try {
            const assets = await prisma.asset.findMany();

            return assets;
        } catch (error) {
            throw error;
        }
    }

    public static async getById(id: string) {
        try {
            const asset = await prisma.asset.findFirst({
                where: {
                    id: id,
                },
            });

            return asset;
        } catch (error) {
            throw error;
        }
    }
}
