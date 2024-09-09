import { NextResponse } from "next/server";
import Post from "@/models/posts";
import User from "@/models/users";

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

export async function GET(req){
    try{
        const { searchParams } = new URL(req.url);
        const offset = searchParams.get("offset");
        const limit = searchParams.get("limit");

        // const posts = await Post.find().exec(); 
        // The query asks for the whole array with username and profile_pic populated form the poster ID.
        const posts = await Post.find().populate('user_id', 'username profile_pic', User).sort('-createdAt').skip(offset).limit(limit).exec();
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