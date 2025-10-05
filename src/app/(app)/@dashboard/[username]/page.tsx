import Profile from "@/ui/pages/profile/profile"

export default async function Page(props:{params: Promise<{username: string}>}) {
    const params = await props.params;
    return <Profile params={params}/>
}