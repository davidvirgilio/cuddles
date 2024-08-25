import mongoose from "mongoose";

const url = process.env.MONGODB_URI as string;
let connection: typeof mongoose;

export default async function startDb() {
    if(!connection) connection = await mongoose.connect(url);
    return connection;
};