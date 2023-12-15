'use client'
import users from "@/sample-data/users.json"
import Image from "next/image"
import style from "./posts.module.sass"
import React from "react"
import { useState } from "react"
import Link from "next/link"

export default function Post({posts}:{posts: any[]}){

    const [showComments, setShowComments] = useState(false);

    const toggleComments = ()=>{
        setShowComments(!showComments);
    }

    const showPosts = posts.map((post, index)=>{
        
        //Looking for the user info
        const userId = post.user_id;
        const userInfo = users.find(({user_id})=> user_id === userId);
        
        //getting comments
        const commentsArray = post.comments;
        const comments = commentsArray.map((comment: any, index: number)=>{
            
            //Looking for the commenter's info
            const commenterId = comment.user_id
            const text = comment.comment
            const commenterInfo = users.find(({user_id})=> user_id === commenterId);

            if(commenterInfo){
                //Commenter data
                const commenter = commenterInfo.username;

                return (
                 <div key={index}><span>{commenter}. </span>{text}</div>
                )
            }
        })


        
        if(userInfo){
            //Defining variables
            const username = userInfo.username;
            const profilePic = userInfo?.profile_pic;
            const image = post.image;
            const caption = post.caption;


            return (
                <div key={index} className={style.post}>
                    <Link className={style.userInfo} href={username}>
                        <Image alt={username} src={`/images/${profilePic}.jpg`} width={40} height={40}/>
                        <span>{username}</span>
                    </Link>
                    <Image className={style.postImage} alt="Post Image" src={`https://s3.eu-west-3.amazonaws.com/cuddles.storage/${image}.jpg`} width={1080} height={1080}/>
                    <div className={style.engagement}>
                        <div className={style.icons}>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="36" viewBox="0 0 34 36" fill="none">
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
                            </button>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="36" viewBox="0 0 48 36" fill="none">
                                    <g clipPath="url(#clip0_253_27)">
                                        <path d="M26.1969 3.14823C28.5659 3.14823 30.9638 3.47355 33.3224 4.11369C36.6647 5.02143 39.3617 6.52471 41.3425 8.57893C43.074 10.376 44.1759 12.5562 44.5274 14.8859C44.8816 17.2234 44.4802 19.6476 43.3705 21.8986C42.1584 24.3489 40.1252 26.5317 37.4833 28.2108C34.9542 29.819 31.7692 30.6349 28.015 30.6349C23.7518 30.6349 19.4728 29.5488 16.8886 28.5308C16.1986 28.2606 15.4142 28.1216 14.5563 28.1216C12.1794 28.1216 9.26728 29.15 5.9905 30.6034C8.36479 27.0774 10.3797 23.5015 9.03903 20.2694C7.62233 16.8535 7.92141 13.477 9.9048 10.5072C11.3267 8.37691 13.5358 6.56406 16.2931 5.26279C19.2288 3.87757 22.6525 3.14561 26.1916 3.14561M26.1969 0C12.2083 0 1.41507 10.1084 6.13217 21.4788C7.34686 24.404 2.14441 30.1548 0.197759 33.6651C-0.418769 34.7748 0.446994 36 1.54887 36C1.76663 36 1.99487 35.9528 2.2205 35.8478C5.49465 34.3236 11.3372 31.2724 14.5563 31.2724C15.0049 31.2724 15.4037 31.3328 15.7343 31.4613C18.1322 32.4058 22.8729 33.7831 28.0124 33.7831C31.7692 33.7831 35.7413 33.0459 39.1702 30.8658C52.1409 22.6174 50.5038 5.52514 34.1435 1.07564C31.4387 0.341058 28.7653 0 26.1969 0Z" fill="url(#paint0_linear_253_27)"/>
                                        <path d="M17.5786 16.8929H17.5734C17.5734 16.8929 17.5734 16.8929 17.5786 16.8929ZM17.5786 13.7446C15.8393 13.7446 14.4304 15.1535 14.4304 16.8929C14.4304 18.6323 15.8393 20.0411 17.5786 20.0411C19.318 20.0411 20.7269 18.6323 20.7269 16.8929C20.7269 15.1535 19.318 13.7446 17.5786 13.7446Z" fill="url(#paint1_linear_253_27)"/>
                                        <path d="M27.2857 16.8929H27.2804C27.2804 16.8929 27.2804 16.8929 27.2857 16.8929ZM27.2857 13.7446C25.5463 13.7446 24.1375 15.1535 24.1375 16.8929C24.1375 18.6323 25.5463 20.0411 27.2857 20.0411C29.0251 20.0411 30.4339 18.6323 30.4339 16.8929C30.4339 15.1535 29.0251 13.7446 27.2857 13.7446Z" fill="url(#paint2_linear_253_27)"/>
                                        <path d="M36.9927 16.8929H36.9875C36.9875 16.8929 36.9875 16.8929 36.9927 16.8929ZM36.9927 13.7446C35.2533 13.7446 33.8445 15.1535 33.8445 16.8929C33.8445 18.6323 35.2533 20.0411 36.9927 20.0411C38.7321 20.0411 40.1409 18.6323 40.1409 16.8929C40.1409 15.1535 38.7321 13.7446 36.9927 13.7446Z" fill="url(#paint3_linear_253_27)"/>
                                    </g>
                                    <defs>
                                        <linearGradient id="paint0_linear_253_27" x1="-1.6597" y1="20.209" x2="47.6599" y2="14.5133" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#FF0033"/>
                                        <stop offset="1" stopColor="#FF7B00"/>
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_253_27" x1="14.4304" y1="16.8929" x2="20.7269" y2="16.8929" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#FF0033"/>
                                        <stop offset="1" stopColor="#FF7B00"/>
                                        </linearGradient>
                                        <linearGradient id="paint2_linear_253_27" x1="24.1375" y1="16.8929" x2="30.4339" y2="16.8929" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#FF0033"/>
                                        <stop offset="1" stopColor="#FF7B00"/>
                                        </linearGradient>
                                        <linearGradient id="paint3_linear_253_27" x1="33.8445" y1="16.8929" x2="40.1409" y2="16.8929" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#FF0033"/>
                                        <stop offset="1" stopColor="#FF7B00"/>
                                        </linearGradient>
                                        <clipPath id="clip0_253_27">
                                        <rect width="47.8085" height="36" fill="white" transform="translate(-0.00683594)"/>
                                        </clipPath>
                                    </defs>
                                </svg>                       
                            </button>
                        </div>
                        <p><span>{username}. </span>{caption}</p>
                        <div className={style.commentButtons}>
                            <button type="button" onClick={toggleComments}>View comments</button>
                            <button>+ Add comment</button>
                        </div>
                        {
                            showComments && (
                                <div className={`${style.comments}`}>{comments}</div>
                            )
                        }
                    </div>

                </div>
            )
        }
        })
    return(
        <div>{showPosts}</div>
    )
}
