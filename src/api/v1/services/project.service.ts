import prisma from "../../../utilities/prisma";

export class ProjectService {
    public static async create(data: any){
        try {
            var payload = data.manifest;

            payload.data = data.data || undefined;

            const project = await prisma.project.upsert({
                create: payload,
                update: payload,
                where: { 
                    id: payload.id
                },
            });

            return project;
        } catch (error) {
            throw error;
        }
    }

    public static async getAll(){
        try {
            const projects = await prisma.project.findMany({
                where: {
                    isPublic: true,
                },
                select: {
                    id: true,
                    name: true,
                    author: true,
                    description: true,
                },
            });

            return projects;
        } catch (error) {
            throw error;
        }
    }

    public static async getById(id: string){
        try {
            const project = await prisma.project.findUnique({
                where: { id },
            });

            return project;
        } catch (error) {
            throw error;
        }
    }

    public static async update(id: string, data: any){
        try {
            const project = await prisma.project.update({
                where: { id },
                data,
            });

            return project;
        } catch (error) {
            throw error;
        }
    }

    public static async delete(id: string){
        try {
            const project = await prisma.project.delete({
                where: { id },
            });

            return project;
        } catch (error) {
            throw error;
        }
    }
}
