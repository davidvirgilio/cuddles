import Profile from "@/ui/pages/profile/profile"

export default function Page({params}:{params: {user: string}}){
    return <Profile params={params}/>
}