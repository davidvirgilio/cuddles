import { getPostById } from "@/lib/get";
import Modal from "@/ui/modals/create/wrapper/wrapper";
import EditPost from "@/ui/modals/edit/post/edit-post";

export default async function Page({params}:{params: {postId: string}}){

    const postId = params.postId
    const {post} = await getPostById(postId);

    return (
        <Modal>
            <EditPost post={post} />
        </Modal>
    )
}