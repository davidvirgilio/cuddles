/*
 * Users controller for handling users-related data.
 * Description: This module defines a Mongoose schema and model for the users collection.
 */


import mongoose, {Schema} from "mongoose";

// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGODB_URI);

// Use native JavaScript promises with Mongoose
mongoose.Promise = global.Promise;

// Define the SCHEMA for the 'User' collection.
const userSchema = new Schema(
    {
        // Username associated with a user
        username: {
            type: String,
            required: true,
        },

        // Name of the user
        name: {
            type: String,
            required: true,
        },

        // Password associated with the account
        password: {
            type: String,
            required: true,
        },

        // Email address
        email: {
            type: String,
            required: true,
        },

        // User's profile picture
        profile_pic: {
            type: String,
            required: false,
        },

        // Array of user IDs who follow the actual user. 
        followers: Array,

        // Array of user IDs who the actual user follows.
        following: Array,
    },
    {
        // Set timestamps for when the document was created and last updated
        timestamps: true,
    }
)

// Create or use an existing 'user' model based on the schema.
const User = mongoose.models.User || mongoose.model("User", userSchema)

// Export the Post model for use in other parts of the application
export default User;