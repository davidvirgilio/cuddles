/*
 * Posts controller for handling post-related data.
 * Description: This module defines a Mongoose schema and model for the posts collection.
 */

import mongoose, {Schema} from "mongoose";

// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGODB_URI);

// Use native JavaScript promises with Mongoose
mongoose.Promise = global.Promise;

// Define the SCHEMA for the 'Post' collection. An schema defines the structure of the document in a collection.
const postSchema = new Schema(
    {
        // URL or path to the image associated with the post
        img: {
            type: String,
            required: true,
        },

        // Text caption for the post
        caption: {
            type: String,
            required: true,
        },

        // ID of the user who created the post
        user_id: String,

        // Array of user IDs who liked the post
        likes: Array,

        // Array of comments on the post, each containing text and metadata
        comments: Array,
    },
    {
        // Automatically add createdAt and updatedAt timestamps
        timestamps: true,
    }
)

// Create or use an existing 'Post' MODEL based on the schema
const Post = mongoose.models.Post || mongoose.model("Post", postSchema)

// Export the Post model for use in other parts of the application
export default Post;