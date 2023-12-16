import Post from "@/app/(models)/posts";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        const body = await req.json();
        const id = body.formData;
        await Post.findByIdAndUpdate(id,{body});
        return NextResponse.json({message: "Post created"},{status:201});
    }catch(error){
        console.error("Error:", error.message);
        console.error("Stack Trace:", error.stack);
        return NextResponse.json({message: "Error", error},{status:500});
    }
}