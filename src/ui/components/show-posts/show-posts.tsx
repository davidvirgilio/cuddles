'use client'

import { getPosts, getUserPosts } from '@/lib/get';
import { post } from '@/types/post';
import { Post } from '@/ui/components/post/post';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import style from './show-posts.module.sass'

const numberOfPostsToFetch = 5;

interface PostsProps{
    initialPosts: post[],
    isProfile?: boolean
}

export default function Posts({ initialPosts, isProfile = false}: PostsProps ){
    const [offset, setOffset] = useState(numberOfPostsToFetch);
    const [posts, setPosts] = useState(initialPosts);
    const [stopFetching, setStopFetching] = useState(false);
    const { ref, inView } = useInView();
    const { data: session } = useSession();
    const userId = session?.user.id;

    
    
    useEffect(() => {
        async function loadMorePosts(){
            let morePosts = { posts };
            if(!stopFetching){
                if(isProfile){
                    morePosts = await getUserPosts(userId, offset, numberOfPostsToFetch);
                }else{
                    morePosts = await getPosts(offset, numberOfPostsToFetch);
                }
                setPosts( [ ...posts ,  ...morePosts.posts ] );
                setOffset( offset + numberOfPostsToFetch )
                setStopFetching( offset > posts.length ? true : false  );
            }
        }
        if (inView) {
          loadMorePosts()
        }
      }, [inView, isProfile, offset, posts, userId, stopFetching])

    return(
        <div>
            { posts.map((post, index)=>
                <Post
                    key={index}
                    index={index}
                    post = {post}
                    isProfile={ isProfile }
                />
            )}
            {
                !stopFetching && (
                    <div ref={ref} className={style.loading}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="38" viewBox="0 0 40 38" fill="none">
                            <path d="M36.0457 11.8585C38.0154 19.5324 34.2036 30.5389 24.6668 33.4127C20.5809 34.5906 16.02 34.1268 12.1769 32.3709C6.14535 29.7119 3.01415 23.2221 3.8739 16.7066C5.01023 7.61668 13.9253 2.27049 22.1946 5.87306C26.4597 7.66699 28.926 12.3862 28.7203 17.0894C28.7288 18.5802 28.3861 20.1153 27.7283 21.4257C25.214 26.7216 16.7414 28.1352 12.9717 23.5841C10.1267 20.1324 11.441 13.1457 15.9502 11.926C17.5663 11.5874 19.5167 11.7358 20.7697 12.8917C21.217 13.3187 21.633 13.958 21.9529 14.5593C22.0647 14.7948 22.1862 15.0329 22.7585 15.0599C23.3309 15.0869 24.2748 14.1801 24.6921 13.3273C25.1094 12.4745 25.1779 11.8745 24.84 11.1972C22.0419 6.41419 14.8692 6.57738 11.1043 10.2659C7.931 13.4193 6.96423 17.9851 8.0272 22.1877C9.08897 26.4811 13.0679 29.5475 17.2657 30.0849C24.3109 31.1083 31.3633 26.6505 32.3806 19.2024C32.8171 15.8587 32.3602 12.3469 30.898 9.30999C28.1287 3.55765 22.1645 0.601716 16.0176 0.931789C1.14913 1.74286 -4.84754 20.0601 4.41501 31.0862C8.27611 35.6127 14.2187 37.7146 19.9532 37.7367C27.073 37.814 34.0244 33.6949 37.4249 27.2983C39.023 24.3265 39.8515 21.0012 39.9694 17.6416C39.9958 16.8722 40.1413 16.4526 39.4475 15.3298C38.7537 14.2071 37.1195 12.5886 36.0457 11.8585Z" fill="url(#paint0_linear_752_409)"/>
                            <path d="M18.9273 19.2565C18.6219 19.1755 18.2972 19.2553 18.0616 19.47C16.4262 20.9608 15.8599 22.9683 16.882 23.8002C17.9582 24.6751 18.9622 23.9389 19.1786 22.9793C19.2135 22.8272 19.4023 22.7805 19.5009 22.8996C20.1226 23.6517 21.3455 23.8395 21.9118 22.5597C22.4505 21.3437 21.0485 19.8209 18.9261 19.2553L18.9273 19.2565Z" fill="url(#paint1_linear_752_409)"/>
                            <path d="M17.164 18.5204C17.7267 18.2076 17.8515 17.3331 17.4426 16.5672C17.0337 15.8013 16.2461 15.4341 15.6833 15.7469C15.1205 16.0597 14.9958 16.9342 15.4046 17.7001C15.8135 18.466 16.6012 18.8333 17.164 18.5204Z" fill="url(#paint2_linear_752_409)"/>
                            <path d="M15.8341 20.6346C16.1561 20.0968 15.8474 19.3057 15.1447 18.8676C14.4419 18.4296 13.6112 18.5105 13.2893 19.0483C12.9673 19.5861 13.276 20.3772 13.9787 20.8153C14.6815 21.2533 15.5121 21.1725 15.8341 20.6346Z" fill="url(#paint3_linear_752_409)"/>
                            <path d="M20.4978 16.4457C20.519 15.5738 20.0168 14.8538 19.3761 14.8376C18.7355 14.8214 18.1989 15.5151 18.1778 16.387C18.1566 17.2589 18.6588 17.9788 19.2994 17.995C19.9401 18.0112 20.4766 17.3176 20.4978 16.4457Z" fill="url(#paint4_linear_752_409)"/>
                            <path d="M23.162 18.5516C23.5913 17.8345 23.512 16.9869 22.985 16.6583C22.4579 16.3298 21.6827 16.6448 21.2534 17.3619C20.8241 18.079 20.9033 18.9266 21.4304 19.2552C21.9574 19.5837 22.7327 19.2687 23.162 18.5516Z" fill="url(#paint5_linear_752_409)"/>
                            <defs>
                                <linearGradient id="paint0_linear_752_409" x1="5.05592" y1="5.86938" x2="32.8365" y2="33.0935" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FF0033"/>
                                <stop offset="1" stopColor="#FF7B00"/>
                                </linearGradient>
                                <linearGradient id="paint1_linear_752_409" x1="17.2427" y1="20.2909" x2="20.8519" y2="23.8278" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FF0033"/>
                                <stop offset="1" stopColor="#FF7B00"/>
                                </linearGradient>
                                <linearGradient id="paint2_linear_752_409" x1="15.347" y1="16.0374" x2="17.5405" y2="18.1869" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FF0033"/>
                                <stop offset="1" stopColor="#FF7B00"/>
                                </linearGradient>
                                <linearGradient id="paint3_linear_752_409" x1="13.5183" y1="18.7799" x2="15.6443" y2="20.8621" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FF0033"/>
                                <stop offset="1" stopColor="#FF7B00"/>
                                </linearGradient>
                                <linearGradient id="paint4_linear_752_409" x1="18.3768" y1="15.437" x2="20.336" y2="17.357" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FF0033"/>
                                <stop offset="1" stopColor="#FF7B00"/>
                                </linearGradient>
                                <linearGradient id="paint5_linear_752_409" x1="21.399" y1="17.1342" x2="23.0465" y2="18.7487" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FF0033"/>
                                <stop offset="1" stopColor="#FF7B00"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>  
                )
            }
            
        </div>
    )
}
