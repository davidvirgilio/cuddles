import Post from "@/app/(models)/posts";
import { NextResponse } from "next/server";

export async function GET(res,{params}){
    try{
        const user = params.user
        const posts = await Post.find({user_id: user}).exec();
        return NextResponse.json({posts},{status:200});
        
    }catch(error){
        return NextResponse.json({message: "Error", error},{status:500});
    }
}