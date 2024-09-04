/**
 * Page Title: Dashboard | Cuddles
 * Description: Main page that shows the dashboard when the user is login.
 * Route Path: '/'
 * Layout: 'DashboardLayout'
 * Data Fetching: It fetches all post array and all users array.
 * Props: None.
 * Events: None.
 */


import Post from "@/ui/components/show-posts/show-posts";
import { getPosts, getUsers } from "@/lib/get";

// Cache revalidation time in seconds. Next will invalidate the cache in 60 seconds.
export const revalidate = 60

// Dashboard page
export default async function Dashboard() {
  
  // Data fetching on server to send as props on the Post component
  let {posts} = await getPosts();
  let {users} = await getUsers();

  // It renders the posts component.
  return <Post posts={posts} users={users}/>
}