import Post from "@/models/posts";
import { NextResponse } from "next/server";
import User from "@/models/users";

export async function GET(request, props) {
    const params = await props.params;
    try{
        const { searchParams } = new URL(request.url);
        const offset = searchParams.get("offset");
        const limit = searchParams.get("limit");

        const userId = params.userId
        const posts = await Post.find({user_id: userId}).populate('user_id','username profile_pic', User).sort('-createdAt').skip(offset).limit(limit).exec();
        return NextResponse.json({posts},{status:200});
        
    }catch(error){
        return NextResponse.json({message: "Error", error},{status:500});
    }
}