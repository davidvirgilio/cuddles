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
        const followerId = params.user;
        const body = await req.json();
        const toFollowId = body.toFollowId;
        
        const followerData = await User.findById(followerId);
        const toFollowData = await User.findById(toFollowId);
        
        const doIFollowThey = followerData.following.indexOf(toFollowId);
        const toFollowIndex = toFollowData.followers.indexOf(followerId);

        if(doIFollowThey === -1){
            followerData.following.push(toFollowId);
        } else{
            followerData.following.splice(doIFollowThey, 1);
        }
        // console.log("Following",followerData.following)
        console.log("Followers",toFollowData.followers)

        if(toFollowIndex === -1){
            toFollowData.followers.push(followerId);
            console.log("Followers after push:", toFollowData.followers)
        } else{
            toFollowData.followers.splice(toFollowIndex, 1);
            console.log("Followers after splice:", toFollowData.followers)
        }

        await followerData.save();
        await toFollowData.save();
        
        return NextResponse.json({message: "Following saved", followers: toFollowData.followers, following: followerData.following},{status:201})


    }catch(error){
        console.log(error)
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
    
}