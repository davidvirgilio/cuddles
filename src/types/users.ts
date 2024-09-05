import { ObjectId, Int32 } from "mongodb";

export interface user{
    _id: string,
    username: string,
    name: string,
    email: string,
    password: string,
    profile_pic: string,
    followers: string[],
    following: string[],
    createdAt: Date,
    updatedAt: Date,
    __v: Int32,
}