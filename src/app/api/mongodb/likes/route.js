import Post from "@/models/posts";
import { NextResponse } from "next/server";


//The PATCH method is used to apply partial modifications to a resource. It's essentially a way to update specific parts of a resource without replacing the entire thing. 

export async function PATCH(req){
    try {

        const { searchParams } = new URL(req.url);
        const postId = searchParams.get("_id");
        const userId = searchParams.get("user_id");

        

        if (!postId || !userId) {
            return NextResponse.json({ message: "_id and user_id are required" }, { status: 400 });
        }

        // Find the post by ID
        const post = await Post.findById(postId);

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        
        // Check if the user has already liked the post
        const userIndex = post.likes.indexOf(userId);

        if (userIndex === -1) {
            // User hasn't liked the post, so add their ID
            post.likes.push(userId);
        } else {
            // User has liked the post, so remove their ID (toggle off)
            post.likes.splice(userIndex, 1);
        }

        // Save the updated post
        await post.save();

        return NextResponse.json({ message: "Likes updated", likes: post.likes }, { status: 200 });
        
    } catch (error) {
        console.error("Error:", error.message);
        console.error("Stack Trace:", error.stack);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }

}