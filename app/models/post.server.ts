import { prisma } from "~/db.server";

type Post ={
    slug:string;
    title:string;
    markdown:string;
};

export async function getPosts(): Promise<Array<Post>>{
    return await prisma.post.findMany();
}

export async function getPost(slug:string): Promise<Post | null>{
    return await prisma.post.findUnique({where:{slug}});
}