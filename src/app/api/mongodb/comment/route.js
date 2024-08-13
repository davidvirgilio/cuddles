import Post from "@/app/(models)/posts";
import { NextResponse } from "next/server";


//The PATCH method is used to apply partial modifications to a resource. It's essentially a way to update specific parts of a resource without replacing the entire thing. 

export async function GET(request){
    try{
        const { searchParams } = new URL(request.url);
        const postId = searchParams.get("_id");
    
        if (!postId) {
            return NextResponse.json({ message: "_id is required" }, { status: 400 });
        }
    
        const post = await Post.findById(postId);
    
        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        const comments = post.comments;

        return NextResponse.json({comments},{status:200})

    }catch(error){
        console.error("Error:", error.message);
        console.error("Stack Trace:", error.stack);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }

}
