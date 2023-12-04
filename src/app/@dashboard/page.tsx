import posts from "@/sample-data/posts.json"
import Post from '@/slices/Post'

export default function Page() {
  return (
    <Post posts={posts} />
  )
}