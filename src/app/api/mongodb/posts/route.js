import { NextResponse } from "next/server";
import Post from "@/app/(models)/posts";

export async function POST(req){
    try{
        const body = await req.json();
        await Post.create(body);

        return NextResponse.json({message: "Post created"},{status:201});
    }catch(error){
        console.error("Error:", error.message);
        console.error("Stack Trace:", error.stack);
        return NextResponse.json({message: "Error", error},{status:500});
    }
}

export async function GET(){
    try{
        const posts = await Post.find().exec();
        return NextResponse.json({posts},{status:200});
    }catch(error){
        return NextResponse.json({message: "Error", error},{status:500});
    }
}

export async function DELETE(request){
    try{
        const { postId } = await request.json();
        await Post.findByIdAndDelete(postId);

        return NextResponse.json({success: true, message: "Post deleted"})

    }catch(error){
        return NextResponse.json({message: "Error deleting post", error},{status:500});
    }
}