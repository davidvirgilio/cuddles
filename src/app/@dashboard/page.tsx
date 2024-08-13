import Post from '@/slices/Post'


const URL = process.env.NEXTAUTH_URL;

const getPosts = async () =>{
  try{
    const res = await fetch(`${URL}/api/mongodb/posts`,{
      cache: "no-store"
    })
    return res.json();
  }catch(error){
    console.log("failed to get posts", error)

  }
}

const getUsers = async () =>{
  try{
    const res = await fetch(`${URL}/api/mongodb/users`,{
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