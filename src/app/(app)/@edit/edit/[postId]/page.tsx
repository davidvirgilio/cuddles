import { getPostById } from "@/lib/get";
import Modal from "@/ui/modals/create/wrapper/wrapper";
import EditPost from "@/ui/modals/edit/post/edit-post";

export default async function Page(props:{params: Promise<{postId: string}>}) {
    const params = await props.params;

    const postId = params.postId
    const {post} = await getPostById(postId);

    return (
        <Modal>
            <EditPost post={post} />
        </Modal>
    )
}