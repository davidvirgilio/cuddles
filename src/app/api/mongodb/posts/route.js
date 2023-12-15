import Post from "@/app/(models)/posts";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        const body = await req.json();
        const postData = body.formData;
        await Post.create(postData);

        return NextResponse.json({message: "Post created"},{status:201});
    }catch(error){
        return NextResponse.json({message: "Error", error},{status:500});
    }
}

export async function GET(req){
    try{
        const posts = await Post.find();
        return NextResponse.json({posts},{status:200});
    }catch(error){
        return NextResponse.json({message: "Error", error},{status:500});
    }
}
