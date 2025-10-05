import Post from "@/models/posts";
import { NextResponse } from "next/server";

export async function GET(request, props) {
    const params = await props.params;
    try{
        const postId = params.id;

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

export async function PATCH(req, props) {
    const params = await props.params;
    try {
        const postId = params.id;
        const body = await req.json();
        const {commenterId, comment} = body.newComment;
        const newComment = {
            commenterId,
            comment,
            createdAt: new Date()
        }
        
        const post = await Post.findById(postId);
        
        
        post.comments.push(newComment);
        await post.save();
        
        return NextResponse.json({message: "Comments updated:", comments: post.comments},{status:201})


    }catch(error){
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}


