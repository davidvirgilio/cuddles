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

// Dashboard page
export default async function Dashboard() {
  
  // Data fetching on server to send as props on the Post component
  let {posts} = await getPosts();

  // It renders the posts component.
  return <Post posts={posts}
  />
}