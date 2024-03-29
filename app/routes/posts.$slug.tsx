import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { marked } from "marked";
import invariant from "tiny-invariant";
import { getPost } from "~/models/post.server";

export const loader = async({
    params}: LoaderFunctionArgs) =>{
        invariant(params.slug, "params.slug is required")

        const post = await getPost(String(params.slug));
        invariant(post,  `Post not found: ${params.slug}`)

        const html = marked(post.markdown)
        return json({post, html})
    };
/**
 {
    post: getPost(slug)
 }
 */


export default function PostSlug(){
    const {post, html} = useLoaderData<typeof loader>();
    return(<main className="mx-auto max-w-4xl">
    <h1 className="my-6 border-b-2 text-center text-3xl">
    {post!.title}
    </h1>
    <div dangerouslySetInnerHTML={{__html:html}}/>
    </main>);
}