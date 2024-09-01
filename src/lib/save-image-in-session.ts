export default function saveImageInSession(file:  File | undefined) {
    if(file){
        const reader = new FileReader();
        reader.onload = (e)=>{
            const image = document.createElement('img');
            image.onload = (e)=>{
                
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                
                const width = image.width;
                const height = image.height;
                const ratio = width / height;
                
                let dWidth = width;
                let dHeight = height;
                
                if(width > 1080){
                    dWidth = 1080;
                    dHeight = 1080 / ratio;
                }
                
                canvas.width = dWidth;
                canvas.height = dHeight;
                
                ctx?.drawImage(image , 0 , 0 , dWidth , dHeight);
                const imgToUrl = canvas.toDataURL(file.type);
                sessionStorage.setItem('image-to-upload', imgToUrl);
            }
            const imageData = reader.result as string;
            image.src = imageData;

        }
        reader.readAsDataURL(file);

        return true
    }else{
        return false
    }
}