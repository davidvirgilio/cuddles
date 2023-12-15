import Post from '@/slices/Post'

const getPosts = async () =>{
  try{
    const res = await fetch("http://localhost:3000/api/mongodb/posts",{
      cache: "no-store"
    })
    return res.json();
  }catch(error){
    console.log("failed to get posts", error)

  }
}


export default async function Page() {

  const {posts} = await getPosts();

  return (
    <Post posts={posts} />
  )
}