import User from "@/models/users";
import { NextResponse } from "next/server";

export async function GET(res, props) {
    const params = await props.params;
    try{
        const userId = params.id
        const user = await User.findById({ _id: userId }).exec();
        return NextResponse.json({user},{status:200});
        
    }catch(error){
        return NextResponse.json({message: "Error", error},{status:500});
    }
}