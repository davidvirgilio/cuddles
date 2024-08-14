/*
 * Comments controller for handling comments-related data.
 * Description: This module defines a Mongoose schema and model for the comments store on the each post.
 */


import mongoose, {Schema} from "mongoose";

// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGODB_URI);

// Use native JavaScript promises with Mongoose
mongoose.Promise = global.Promise;

// Define the SCHEMA for the 'Comment' collection.
const commentSchema = new Schema(
    {
        // Id associated with a commenter
        commenterId: {
            type: String,
            required: true,
        },

        // Content of the comment
        comment: {
            type: String,
            required: true,
        },
    },
    {
        // Set timestamps for when the document was created and last updated
        timestamps: true,
    }
)

// Create or use an existing 'user' model based on the schema.
const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema)

// Export the Post model for use in other parts of the application
export default Comment;