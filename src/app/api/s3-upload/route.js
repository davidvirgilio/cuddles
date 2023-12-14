import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials:{
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    }
})

async function uploadImageS3(image, imageName){
    const imageBuffer = image;
    
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${imageName}`,
        Body: imageBuffer,
        ContentType: "image/jpg",
    }
    
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return imageName;

}

export async function POST(request) {
    try{
        const formData = await request.formData();
        const image = formData.get("image");

        if(!image){
            return new NextResponse({ error: "File is required." }, {status: 400});
        }

        const buffer = Buffer.from(await image.arrayBuffer());
        const imageName = await uploadImageS3(buffer, image.name);
 
        return NextResponse.json({success: true, imageName})


    }catch(error){
        return NextResponse.json({error: "Error uploading file"})
    }

}