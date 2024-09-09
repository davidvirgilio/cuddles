'use client'

import { getPosts, getUserPosts } from '@/lib/get';
import { post } from '@/types/post';
import { Post } from '@/ui/components/post/post';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const numberOfPostsToFetch = 5;

interface PostsProps{
    initialPosts: post[],
    isProfile?: boolean
}

export default function Posts({ initialPosts, isProfile = false}: PostsProps ){
    const [offset, setOffset] = useState(numberOfPostsToFetch);
    const [posts, setPosts] = useState(initialPosts);
    const { ref, inView } = useInView();
    const { data: session } = useSession();
    const userId = session?.user.id;

    
    
    useEffect(() => {
        const loadMorePosts = async()=>{
            let morePosts = { posts };
            if(isProfile){
                morePosts = await getUserPosts(userId, offset, numberOfPostsToFetch);
            }else{
                morePosts = await getPosts(offset, numberOfPostsToFetch);
            }
            setPosts( [ ...posts ,  ...morePosts.posts ] );
            setOffset( offset + numberOfPostsToFetch )
        }
        if (inView) {
          loadMorePosts()
        }
      }, [inView])

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
            <div ref={ref}></div>
        </div>
    )
}
