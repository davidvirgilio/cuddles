import { hashPassword } from "@/lib/hash";
import { NextResponse } from "next/server";
import { verifyResetToken } from "@/lib/token";
import User from "@/models/users";


export async function POST(req){
    const body = await req.json();
    const { token, password } = body;

    // Step 1: Verify the token
    const decoded = verifyResetToken(token);
    if(!decoded){
        return NextResponse.json({error: 'Invalid or expired token'}, {status: 401});
    }

    // Step 2: Hash the new password and send it to the database
    const hashedPassword = await hashPassword(password);

    const user = await User.findByIdAndUpdate(decoded.userId, {password: hashedPassword});
    if (!user) {
        return NextResponse.json({error: 'User not found'}, {status: 401});
    }


    return NextResponse.json({message: 'Great'})
}