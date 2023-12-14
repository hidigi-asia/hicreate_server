import prisma from "../../../utilities/prisma";

export class ProjectService {
    public static async create(data: any){
        console.log(data);
        
        try {
            const project = await prisma.project.create({
                data,
            });

            return project;
        } catch (error) {
            throw error;
        }
    }

    public static async getAll(){
        try {
            const projects = await prisma.project.findMany({
                select: {
                    id: true,
                    manifest: true,
                }
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
                select: {
                    id: true,
                    manifest: true,
                    data: true,
                }
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
