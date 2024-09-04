import Profile from "@/ui/pages/profile/profile"

export default function Page({params}:{params: {username: string}}){
    return <Profile params={params}/>
}