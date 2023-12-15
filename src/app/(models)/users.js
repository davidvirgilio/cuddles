
// import { Models, models, model } from "mongoose";
// import { Document, Schema } from "mongoose";
// import bcrypt from "bcryptjs"

// interface UserDocument extends Document{
//     username: string,
//     name: string,
//     password: string,
//     email: string,
//     profile_pic: string,
//     followers: any,
//     following: any,
// }

// interface Methods{
//     comparePassword(password: string): Promise<boolean>;
// }

// const userSchema = new Schema<UserDocument, {}, Methods>({
//     username: { type: String, required: true, trim: true},
//     name: {type: String, required: true, trim: true},
//     password: {type: String, required: true},
//     email: {type: String, required: true, unique: true},
//     profile_pic: {type: String},
//     followers: {type: Array},
//     following: {type: Array},
// })

// userSchema.pre("save", async function (next){
//     if(!this.isModified("password")) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// This is a previous test that actually works

import mongoose, {Schema} from "mongoose";
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        profile_pic: {
            type: String,
            required: false,
        },
        followers: Array,
        following: Array,
    },
    {
        timestamps: true,
    }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;