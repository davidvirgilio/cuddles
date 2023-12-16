import Post from '@/slices/Post'

const getPosts = async () =>{
  try{
    const res = await fetch("https:cuddles.davidvirgilio.me/api/mongodb/posts",{
      cache: "no-store"
    })
    return res.json();
  }catch(error){
    console.log("failed to get posts", error)

  }
}

const getUsers = async () =>{
  try{
    const res = await fetch("https:cuddles.davidvirgilio.me/api/mongodb/users",{
      cache: "no-store"
    })
    return res.json();
  }catch(error){
    console.log("failed to get posts", error)

  }
}


export default async function Page() {

  const {posts} = await getPosts();
  const {users} = await getUsers();

  return (
    <Post posts={posts} users={users}/>
  )
}