import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const postSchema = new Schema(
    {
        img: {
            type: String,
            required: true,
        },
        caption: {
            type: String,
            required: true,
        },
        user_id: String,
        likes: Array,
        comments: Array,
    },
    {
        timestamps: true,
    }
)

const Post = mongoose.models.Post || mongoose.model("Post", postSchema)

export default Post;