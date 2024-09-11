import ResetPassword from "@/ui/pages/authentication/reset-password/reset-password"

export default function Page({params}:{params: {token: string}}){
    return <ResetPassword token={params.token}/>
}