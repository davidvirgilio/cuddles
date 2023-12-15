import User from "@/app/(models)/users";
import { NextResponse } from "next/server";

export async function GET(res,{params}){
    try{
        const username = params.user
        const user = await User.findOne({username: username});
        return NextResponse.json({user},{status:200});
        
    }catch(error){
        return NextResponse.json({message: "Error", error},{status:500});
    }
}