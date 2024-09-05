import User from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        const {email} = await req.json();
        const user = await User.findOne({email});
        return NextResponse.json({user},{status:200});
    }catch(error){
        
        return NextResponse.json({message: "There was an error", error},{status:500});
    }
}

export async function GET(req){
    try{
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("_id");
        const userInfo = await User.findOne({_id: userId}).exec();
        const userData = {
            "username": userInfo.username,
            "avatar": userInfo.profile_pic,
        };
        return NextResponse.json({userData},{status:200});
        
    }catch(error){
        return NextResponse.json({message: "Error", error},{status:500});
    }
}