import Post from "@/models/posts";
import { NextResponse } from "next/server";
import User from "@/models/users";

export async function GET(request ,{params}){
    try{
        const userId = params.userId
        const posts = await Post.find({user_id: userId}).populate('user_id','username profile_pic', User).sort('-createdAt').exec();
        return NextResponse.json({posts},{status:200});
        
    }catch(error){
        return NextResponse.json({message: "Error", error},{status:500});
    }
}