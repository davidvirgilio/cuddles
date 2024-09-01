export default async function deleteS3Image( fileName: string | undefined ){
    try{
        const responseDelete = await fetch('/api/s3-upload',{
            method: 'DELETE',
            body: JSON.stringify({fileName}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const dataDelete = await responseDelete.json();
        if(responseDelete.ok){
            console.log('Avatar deleted')
        }else{
            console.error("Error deleting file on AWS:", dataDelete.error);
        }
        return true

    }catch(error){
        console.error('Error deleting file' ,error);
        return false
    }
}