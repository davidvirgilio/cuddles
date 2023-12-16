import User from "@/app/(models)/users";
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