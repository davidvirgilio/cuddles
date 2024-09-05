import { Int32, ObjectId } from "mongodb"


export interface comment{
    commenterId: string,
    comment: string,
    createdAt: Date,
}

export interface post{
    _id: ObjectId,
    img: string,
    caption: string,
    user_id: string,
    likes: string[],
    comments: Comment[],
    createdAt: Date,
    updatedAt: Date,
    __v: Int32,
}