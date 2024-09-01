import Post from "@/app/(models)/posts";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    try{
        const postId = params.postId
        const post = await Post.findById(postId).exec();
        console.log(post);
        return NextResponse.json({post},{status:200});
        
    }catch(error){
        return NextResponse.json({message: "Error", error},{status:500});
    }
}

export async function PATCH(request, {params}) {
    try{
        const postId = params.postId;
        const newData = await request.json();
        await Post.findByIdAndUpdate(postId, newData)
        return NextResponse.json({message: "Updated"},{status:200}); 
    }catch(error){
        console.error({message: "Error when reading params"})
        return NextResponse.json({message: "Error", error},{status:500});
    }
}