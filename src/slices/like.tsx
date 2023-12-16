'use client'
import React, { useState, useEffect} from "react";
import { useSession } from "next-auth/react";


export default function Like({postId, userId}:{postId: string, userId: string}){

    const startLike = {
        user_id: userId,
    }

    const [like, setLike] = useState(false);
    const [formData, setFormData] = useState({startLike});

    
    const handleChange = (e:any)=>{
        setLike(!like);
    }

    return(
        <form method="post">
                <label htmlFor={postId}>
                {/* <button> */}
                    {!like && (<svg xmlns="http://www.w3.org/2000/svg" width="34" height="36" viewBox="0 0 34 36" fill="none" className="like">
                        <g clipPath="url(#clip0_253_25)">
                        <path d="M14.2592 36L13.3472 35.2795C0.202589 24.8848 -0.309685 16.891 0.0815579 13.9356C0.464357 11.028 2.09125 8.81848 4.65826 7.7123C7.5574 6.46539 10.0878 6.95234 12.1031 8.12607C14.2564 2.4263 18.8275 0.174542 22.6442 0.011289C27.4461 -0.191369 31.7103 2.71903 33.2753 7.26477C38.1926 21.5522 16.1957 34.8488 15.2584 35.4089L14.2592 36.0028V36ZM8.03308 10.3638C7.37163 10.3638 6.69329 10.5157 5.99524 10.8141C4.54286 11.439 3.65623 12.6718 3.43105 14.3775C2.69641 19.9365 8.5144 26.9142 14.5153 31.8793C18.5713 29.225 33.5934 18.5602 30.0834 8.3625C28.9913 5.19315 26.1288 3.24538 22.7906 3.38611C18.3912 3.57751 15.8551 7.09307 14.8925 10.4595C15.3288 10.952 15.7003 11.3376 15.9621 11.8584C16.2436 12.4213 16.2436 13.2657 15.6806 13.8286C15.1177 14.3916 13.9918 15.236 13.9918 15.236C13.9918 15.236 12.8293 12.9842 11.391 11.757C10.3017 10.8282 9.19274 10.3666 8.03308 10.3666V10.3638Z" fill="url(#paint0_linear_253_25)"/>
                        </g>
                        <defs>
                        <linearGradient id="paint0_linear_253_25" x1="-6.83717e-05" y1="18" x2="33.9931" y2="18" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF0033"/>
                        <stop offset="1" stopColor="#FF7B00"/>
                        </linearGradient>
                        <clipPath id="clip0_253_25">
                        <rect width="33.9931" height="36" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    )}
                    {like && (<svg xmlns="http://www.w3.org/2000/svg" width="34" height="36" viewBox="0 0 34 36" fill="none">
                    <path d="M14.2592 35.9987L13.3472 35.2781C0.202589 24.8834 -0.309685 16.8897 0.0815579 13.9343C0.464357 11.0267 2.09125 8.81714 4.65826 7.71096C7.5574 6.46405 10.0878 6.95099 12.1031 8.12472C14.2564 2.42496 18.8275 0.173199 22.6442 0.00994627C27.4461 -0.192712 31.7103 2.71769 33.2753 7.26342C38.1926 21.5508 16.1957 34.8475 15.2584 35.4076L14.2592 36.0015V35.9987Z" fill="url(#paint0_linear_310_391)"/>
                    <defs>
                    <linearGradient id="paint0_linear_310_391" x1="-6.83717e-05" y1="17.9987" x2="33.9931" y2="17.9987" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF0033"/>
                    <stop offset="1" stopColor="#FF7B00"/>
                    </linearGradient>
                    </defs></svg>)}
                {/* </button> */}
                <input
                    onChange={handleChange}
                    className="hidden"
                    type="checkbox"
                    id={postId}
                    name="like"
                />
                </label>
        </form>
    )
}