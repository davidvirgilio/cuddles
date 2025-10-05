import ResetPassword from "@/ui/pages/authentication/reset-password/reset-password"

export default async function Page(props:{params: Promise<{token: string}>}) {
    const params = await props.params;
    return <ResetPassword token={params.token}/>
}