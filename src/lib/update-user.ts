export async function updateAvatarOnDB(userId: string | undefined, filename: string | undefined){
    try{
        const newData = { profile_pic:  filename };
        const response = await fetch(`../api/mongodb/users/${userId}`, {
            method:"PATCH",
            body: JSON.stringify(newData),
            headers:{
                "Content-type": "application/json"
            }
        });

        if(!response.ok){
            throw new Error(response.statusText);
        }
    }catch(error){
        console.log("Error updating  avatar on database: ", error);
    }
}