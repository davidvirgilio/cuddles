import { post } from '@/types/post';
import { Post } from '@/ui/components/post/post';

interface PostsProps{
    posts: post[],
    isProfile?: boolean
}

export default function Posts({ posts, isProfile = false}: PostsProps ){
        
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
        </div>
    )
}
