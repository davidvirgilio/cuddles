'use client'
import React, {useEffect, useState} from "react";

export default function FollowButton({followerId, toFollowId, initialFollowersArray}:{followerId: any, toFollowId: string, initialFollowersArray: string[]}){

    const [followersArray, setFollowing] = useState(initialFollowersArray || []);
    const [hasFollowed, setHasFollowed] = useState(false);
    
    useEffect(()=>{
        setHasFollowed(followersArray.includes(followerId));
    },[followersArray,followerId])

    const handleFollowToggle = async () => {
        try{
            const response = await fetch(`/api/mongodb/follow/${followerId}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({toFollowId}),

            });

            if(response.ok){
                const data = await response.json();
                setFollowing(data.followers)
                setHasFollowed(!hasFollowed);
            }else{
                console.error('Error while following/unfollowing');
            }
        }catch( error ){
            console.error('Error while following/unfollowing');
        }
    }

    return(
        <button className="btn" onClick={handleFollowToggle}>
            {hasFollowed ? 'Following' : 'Follow'}
        </button>
    )
}