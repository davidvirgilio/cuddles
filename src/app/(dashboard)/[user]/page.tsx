import Post from "@/slices/post";
export default function Page({params}:{params: {user: string}}){
    const name = params.user;
    return (
        <Post />
    )
}