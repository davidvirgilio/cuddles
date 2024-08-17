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



export async function PATCH(req, {params}) {
    try {
        const userId = params.user;
        const body = await req.json();
        await User.findByIdAndUpdate(
            userId,
            body,
            {new: true},

        );

        if(!userId){
            return NextResponse.json({message: "User ID is required"}, {status: 400});
        }
        if(!body){
            return NextResponse.json({message: "Body is required"}, {status: 400});
        }
        
        return NextResponse.json({body: body},{status:200})


    }catch(error){
        console.log(error)
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
    
}