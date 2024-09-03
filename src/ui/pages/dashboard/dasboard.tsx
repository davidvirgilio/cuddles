
import Post from "@/ui/components/show-posts/show-posts";
import { getPosts, getUsers } from "@/lib/get";

const URL = process.env.NEXTAUTH_URL;

export const revalidate = 60

export default async function Dashboard() {
  
  let {posts} = await getPosts();
  let {users} = await getUsers();

  return (
    <>
      <Post posts={posts} users={users}/>
    </>
  )
}