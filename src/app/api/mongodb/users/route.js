import User from "@/app/(models)/users";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        const body = await req.json();
        const userData = body.updatedFormData;

        await User.create(userData);

        return NextResponse.json({message: "User created"},{status:201});
    }catch(error){
        return NextResponse.json({message: "Error", error},{status:500});
    }
}

export async function GET(){
    try{
        const users = await User.find();
        return NextResponse.json({users},{status:200});
        
    }catch(error){
        return NextResponse.json({message: "Error", error},{status:500});
    }
}