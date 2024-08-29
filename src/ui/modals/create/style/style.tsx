'use client'
import { useEffect, useState } from "react"
import style from "./style.module.sass"
import create from "../create.module.sass"
import CloseButton from "@/ui/components/close-button"
import Cropper from "react-easy-crop"
import { Point, Area } from "react-easy-crop";
import getCroppedImg from "@/app/lib/create-image-from-crop";
import { useSession } from "next-auth/react";
import urlToImage from "@/app/lib/name-image"

import { useRouter } from "next/navigation"

export default function Style(){

    const router = useRouter();
    const [crop, setCrop] = useState<Point>({x: 0, y: 0});
    const [imageUrl, setImageUrl] = useState<string>("");
    const [aspectRatio, setAspectRatio] = useState(0)
    const [zoom, setZoom] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [ratio, setRatio] = useState(1/1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({x: 0, y:0, width: 0, height:0 })
    const [objectFit, setFit] = useState<'contain' | 'cover' | 'horizontal-cover' | 'vertical-cover'>('cover');
    const [isProfilePicture, setIsProfile] = useState(false);
    const {data: session, update } = useSession();
    const userId = session?.user.id;
    
    
    useEffect(()=>{
        const typeOfImage = sessionStorage.getItem('type');
        if(typeOfImage === 'profile'){
            setIsProfile(true);
        }
        
        setImageUrl(sessionStorage.getItem('image-to-upload') as string);

        if (imageUrl && !isProfilePicture) {
            getImageAspectRatio(imageUrl).then((originalRatio) => {
                if(originalRatio > 3/2 ){
                    setAspectRatio(1.5);
                }else if(originalRatio < 4/5){
                    setAspectRatio(0.8);
                }else{
                    setAspectRatio(originalRatio);
                }
            });
        }else{
            setAspectRatio(1/1);
        }
    },[imageUrl, aspectRatio, isProfilePicture]);

    useEffect(() => {
        if(ratio === 1){
            setFit('cover');
        }else if(ratio > 1){
            setFit('horizontal-cover');
        }else{
            setFit('vertical-cover');
        }

    }, [ratio]);
    
    function getImageAspectRatio(imageDataUrl: string): Promise<number> {
        return new Promise((resolve, reject) => {
            const img = new window.Image(); // Renamed from Image to imgElement
            img.onload = () => {
                const originalRatio = img.width / img.height;
            resolve(originalRatio);
          };
          img.onerror = reject;
          img.src = imageDataUrl;
        });
      }

    const handleRotation = (e: any)=>{
        const alpha = e.target.value;
        const alphaToRadians = alpha * Math.PI/180;
        const ratioAbs = (ratio > 1) ? ratio : 1/ratio;

        const newZoom = Math.sqrt(Math.pow(Math.cos(alphaToRadians),2)) + (ratioAbs) * Math.sqrt(Math.pow(Math.sin(alphaToRadians),2));

        setZoom(newZoom)
        setRotate(e.target.value)
    };

    const toggleRatio = ()=>{
        setRatio((prevRatio) => prevRatio === 1/1 ? aspectRatio : 1/1);
    };

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels)
      };

    const handleNext = async()=>{
        
        try{
            const FinalImage = await getCroppedImg(imageUrl, croppedAreaPixels, rotate);
            sessionStorage.setItem('image-cropped', FinalImage as string);
            router.push('./details',{scroll: false})
            
        }catch(error){
            console.error(error);
        }

    };

    const handleUpload = async()=>{

        const profileImage = await getCroppedImg(imageUrl, croppedAreaPixels, rotate);

        if(!profileImage){
            console.error("No image found to upload.");
            return;
        }

        const imageFile = await urlToImage(profileImage, userId, "image/jpg", "avatar");
        

        // setUploading(true);
        const newData = { profile_pic:  imageFile.name }
        const formData = new FormData();
        formData.append("image",imageFile);

        try{
            const response = await fetch('/api/s3-upload',{
                method: "POST",
                body: formData,
            })
            const data = await response.json();

            const res = await fetch(`../api/mongodb/users/${userId}`, {
                method:"PATCH",
                body: JSON.stringify(newData),
                headers:{
                    "Content-type": "application/json"
                }
            })
            if(!res.ok){
                const errorData = await res.json();
                throw new Error('Failed to update profile picture' + errorData);
    
            }

            
        }catch(error){
            console.log("Error during submission:", error);
            // setUploading(false);
        }
        
        await update({profile_pic: imageFile.name});
        sessionStorage.clear();
        router.back();
    }

    const handleClose = ()=>{
        sessionStorage.clear();
    }

    return (
        <>
        <header className={create.header}>
            <CloseButton onClose={handleClose}/>
            <h2>New post</h2>
            <button
                className={create.button}
                onClick={ isProfilePicture ? handleUpload : handleNext}
            >
                    {isProfilePicture ? "Save" : "Next"}
            </button>
        </header>
            <div className={style.container}>
                <Cropper
                    image={imageUrl}
                    classes={{containerClassName: style.cropper}}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotate}
                    aspect={ratio}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    objectFit={objectFit}
                />
            </div>
            <div className={style.buttons}>
                {
                    !isProfilePicture && (
                        <button  onClick={()=>{toggleRatio()}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25ZM13.3713 10.6537C13.3713 8.96926 14.7369 7.60373 16.4213 7.60373H33.5752C35.2596 7.60373 36.6252 8.96926 36.6252 10.6537V13.3732H39.3448C41.0292 13.3732 42.3948 14.7388 42.3948 16.4232V33.5771C42.3948 35.2615 41.0292 36.6271 39.3448 36.6271H36.6252V39.346C36.6252 41.0305 35.2596 42.396 33.5752 42.396H16.4213C14.7369 42.396 13.3713 41.0305 13.3713 39.346V36.6271H10.6525C8.968 36.6271 7.60247 35.2615 7.60247 33.5771L7.60247 16.4232C7.60247 14.7388 8.968 13.3732 10.6525 13.3732H13.3713V10.6537ZM13.3713 15.4732H10.6525C10.1278 15.4732 9.70247 15.8986 9.70247 16.4232L9.70247 33.5771C9.70247 34.1017 10.1278 34.5271 10.6525 34.5271H13.3713V15.4732ZM15.4713 34.5271V15.4732L34.5252 15.4732V34.5271H15.4713ZM15.4713 36.6271V39.346C15.4713 39.8707 15.8967 40.296 16.4213 40.296H33.5752C34.0998 40.296 34.5252 39.8707 34.5252 39.346V36.6271H15.4713ZM36.6252 34.5271H39.3448C39.8694 34.5271 40.2948 34.1017 40.2948 33.5771V16.4232C40.2948 15.8986 39.8694 15.4732 39.3448 15.4732H36.6252V34.5271ZM34.5252 13.3732L15.4713 13.3732V10.6537C15.4713 10.1291 15.8967 9.70373 16.4213 9.70373H33.5752C34.0998 9.70373 34.5252 10.1291 34.5252 10.6537V13.3732Z" fill="url(#paint0_linear_648_403)"/>
                                <defs>
                                <linearGradient id="paint0_linear_648_403" x1="6.57588e-07" y1="9.5" x2="44.5" y2="41.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#ED002F"/>
                                <stop offset="1" stopColor="#FF6600"/>
                                </linearGradient>
                                </defs>
                            </svg>
                        </button>
                    )
                }
                <button  onClick={()=>{setRotate((rotate < 270) ? rotate+90 : 0)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50ZM6.31715 21.371L9.63556 21.139C11.2667 15.1518 16.3219 10.4088 22.8564 9.49044C30.4219 8.42717 37.4943 12.8387 40.0688 19.7071L38.032 19.9933C35.6542 14.2231 29.6002 10.5623 23.1347 11.471C17.6643 12.2398 13.3787 16.0719 11.768 20.9899L14.0924 20.8273L10.6756 27.8327L6.31715 21.371ZM12.0417 30.4522L10.0128 30.7374C12.5126 37.74 19.6598 42.2647 27.3114 41.1893C34.391 40.1943 39.7342 34.7099 40.8678 28.0178L43.7883 27.8136L39.4298 21.3519L36.0131 28.3573L38.8057 28.162C37.6462 33.799 33.0583 38.362 27.033 39.2088C20.4805 40.1297 14.3506 36.3573 12.0417 30.4522ZM30.6326 24.3297C30.4842 24.6187 30.41 24.9312 30.41 25.2672C30.41 25.5015 30.4334 25.7203 30.4803 25.9234C30.535 26.1265 30.6131 26.3023 30.7147 26.4508C30.824 26.5992 30.9646 26.7203 31.1365 26.814C31.3162 26.9 31.5311 26.9429 31.7811 26.9429C32.0623 26.9429 32.3436 26.8765 32.6248 26.7437C32.9139 26.6031 33.1717 26.4234 33.3982 26.2047C33.6248 25.9859 33.8084 25.7359 33.949 25.4547C34.0896 25.1656 34.16 24.8648 34.16 24.5523C34.16 24.4117 34.1326 24.2476 34.0779 24.0601C34.0311 23.8648 33.9607 23.6812 33.867 23.5094C33.7732 23.3375 33.6561 23.1929 33.5154 23.0758C33.3748 22.9586 33.2146 22.9 33.035 22.9C32.7146 22.9 32.3982 22.9586 32.0857 23.0758C31.7732 23.1929 31.492 23.357 31.242 23.5679C30.992 23.7789 30.7889 24.0328 30.6326 24.3297ZM31.1248 25.7242C31.1014 25.6148 31.0897 25.4898 31.0897 25.3492C31.0897 25.2711 31.1209 25.1734 31.1834 25.0562C31.2459 24.939 31.3318 24.814 31.4412 24.6812C31.5584 24.5484 31.6834 24.4195 31.8162 24.2945C31.949 24.1617 32.0857 24.0445 32.2264 23.9429C32.367 23.8336 32.4998 23.7476 32.6248 23.6851C32.7576 23.6148 32.8709 23.5797 32.9646 23.5797C33.0662 23.5797 33.1521 23.6109 33.2225 23.6734C33.2928 23.7359 33.3436 23.8101 33.3748 23.8961C33.4139 23.982 33.4412 24.0797 33.4568 24.189C33.4725 24.2906 33.4803 24.3844 33.4803 24.4703C33.4803 24.6656 33.4334 24.8687 33.3396 25.0797C33.2459 25.2828 33.1209 25.4703 32.9646 25.6422C32.8084 25.814 32.6326 25.9586 32.4373 26.0758C32.242 26.1851 32.0506 26.2398 31.8631 26.2398C31.7147 26.2398 31.5897 26.2203 31.4881 26.1812C31.3865 26.1344 31.3045 26.0758 31.242 26.0054C31.1873 25.9273 31.1482 25.8336 31.1248 25.7242ZM23.4256 26.1929C23.4256 25.8726 23.4529 25.5328 23.5076 25.1734C23.5623 24.814 23.6482 24.4625 23.7654 24.1187C23.8826 23.775 24.0311 23.4469 24.2107 23.1344C24.3904 22.8219 24.6014 22.5484 24.8436 22.314C25.0857 22.0719 25.3592 21.8844 25.6639 21.7515C25.9764 21.6109 26.324 21.5406 26.7068 21.5406C27.2381 21.5406 27.7068 21.6265 28.1131 21.7984C28.5271 21.9703 28.8709 22.2125 29.1443 22.525C29.4256 22.8375 29.6365 23.2125 29.7772 23.65C29.9178 24.0797 29.9881 24.5523 29.9881 25.0679C29.9881 25.4273 29.9529 25.8179 29.8826 26.2398C29.8123 26.6617 29.699 27.0797 29.5428 27.4937C29.3943 27.9 29.2068 28.2906 28.9803 28.6656C28.7537 29.0406 28.492 29.3726 28.1951 29.6617C27.8982 29.9508 27.5584 30.1812 27.1756 30.3531C26.8006 30.525 26.3943 30.6109 25.9568 30.6109C25.5662 30.6109 25.2303 30.5406 24.949 30.4C24.6756 30.2594 24.4451 30.0719 24.2576 29.8375C24.0701 29.6031 23.9217 29.3336 23.8123 29.0289C23.7029 28.7164 23.617 28.4 23.5545 28.0797C23.4998 27.7515 23.4647 27.4234 23.449 27.0953C23.4334 26.7672 23.4256 26.4664 23.4256 26.1929ZM24.4217 26.7203C24.4217 27.0328 24.4373 27.3609 24.4686 27.7047C24.4998 28.0406 24.5779 28.3531 24.7029 28.6422C24.8279 28.9234 25.0076 29.1578 25.242 29.3453C25.4764 29.525 25.7967 29.6148 26.2029 29.6148C26.5389 29.6148 26.8397 29.5367 27.1053 29.3804C27.3709 29.2164 27.6053 29.0054 27.8084 28.7476C28.0115 28.4898 28.1873 28.2008 28.3357 27.8804C28.492 27.5523 28.617 27.2203 28.7107 26.8844C28.8045 26.5484 28.8748 26.2242 28.9217 25.9117C28.9686 25.5992 28.992 25.3219 28.992 25.0797C28.992 24.7281 28.9647 24.3961 28.91 24.0836C28.8553 23.7711 28.7576 23.5015 28.617 23.275C28.4764 23.0484 28.2811 22.8726 28.0311 22.7476C27.7811 22.6148 27.449 22.5484 27.035 22.5484C26.6912 22.5484 26.3865 22.6148 26.1209 22.7476C25.8631 22.8804 25.6365 23.0562 25.4412 23.275C25.2459 23.4937 25.0818 23.7476 24.949 24.0367C24.824 24.3179 24.7225 24.6148 24.6443 24.9273C24.5662 25.2398 24.5076 25.5523 24.4686 25.8648C24.4373 26.1695 24.4217 26.4547 24.4217 26.7203ZM21.7029 25.3023C21.7107 25.3804 21.7147 25.4351 21.7147 25.4664C21.7147 25.8883 21.6795 26.3062 21.6092 26.7203C21.5467 27.1344 21.4764 27.5484 21.3982 27.9625C21.3201 28.3765 21.2459 28.7945 21.1756 29.2164C21.1131 29.6304 21.0818 30.0523 21.0818 30.482C21.324 30.482 21.5389 30.4351 21.7264 30.3414C21.9139 30.2398 22.0701 30.0758 22.1951 29.8492C22.2107 29.7554 22.2381 29.6031 22.2772 29.3922C22.3162 29.1812 22.3592 28.9429 22.4061 28.6773C22.4607 28.4117 22.5154 28.1344 22.5701 27.8453C22.6248 27.5484 22.6756 27.2711 22.7225 27.0133C22.7772 26.7476 22.824 26.5094 22.8631 26.2984C22.9022 26.0875 22.9295 25.9312 22.9451 25.8297V25.607C22.9451 25.3101 22.9334 24.9742 22.91 24.5992C22.8943 24.2242 22.8553 23.8531 22.7928 23.4859C22.7381 23.1109 22.6482 22.7476 22.5232 22.3961C22.4061 22.0367 22.2459 21.7203 22.0428 21.4469C21.8475 21.1734 21.5975 20.9547 21.2928 20.7906C20.9881 20.6265 20.6248 20.5445 20.2029 20.5445C19.7576 20.5445 19.3709 20.6226 19.0428 20.7789C18.7225 20.9273 18.4568 21.1383 18.2459 21.4117C18.0428 21.6773 17.8904 21.9859 17.7889 22.3375C17.6951 22.689 17.6482 23.0601 17.6482 23.4508V23.6734C17.6561 23.775 17.66 23.8883 17.66 24.0133V24.3648C17.6678 24.4742 17.6717 24.5484 17.6717 24.5875C17.8123 24.775 17.949 24.9351 18.0818 25.0679C18.2225 25.2008 18.3631 25.3062 18.5037 25.3844C18.6522 25.4625 18.8123 25.5211 18.9842 25.5601C19.1639 25.5914 19.367 25.607 19.5936 25.607C19.8279 25.607 20.0272 25.5992 20.1912 25.5836C20.3553 25.5601 20.5115 25.5172 20.66 25.4547C20.8162 25.3844 20.9725 25.2828 21.1287 25.15C21.285 25.0094 21.4686 24.8219 21.6795 24.5875V24.7633C21.6795 24.8414 21.6834 24.9312 21.6912 25.0328C21.699 25.1265 21.7029 25.2164 21.7029 25.3023ZM18.6678 23.8023C18.6522 23.6461 18.6443 23.4898 18.6443 23.3336C18.6443 23.0679 18.6678 22.8258 18.7147 22.607C18.7693 22.3883 18.8553 22.2008 18.9725 22.0445C19.0897 21.8883 19.2498 21.7672 19.4529 21.6812C19.6561 21.5875 19.9061 21.5406 20.2029 21.5406C20.2889 21.5406 20.4021 21.5679 20.5428 21.6226C20.6912 21.6773 20.8318 21.7476 20.9647 21.8336C21.0975 21.9117 21.2107 22.0054 21.3045 22.1148C21.4061 22.2242 21.4568 22.3336 21.4568 22.4429C21.4568 22.5914 21.3943 22.7867 21.2693 23.0289C21.1443 23.2711 20.9881 23.5094 20.8006 23.7437C20.6131 23.9703 20.4061 24.1695 20.1795 24.3414C19.9607 24.5054 19.7537 24.5875 19.5584 24.5875C19.3475 24.5875 19.1795 24.5523 19.0545 24.482C18.9373 24.4039 18.8475 24.3101 18.785 24.2008C18.7303 24.0836 18.6912 23.9508 18.6678 23.8023Z" fill="url(#paint0_linear_648_414)"/>
                        <defs>
                        <linearGradient id="paint0_linear_648_414" x1="6.57588e-07" y1="9.5" x2="44.5" y2="41.5" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#ED002F"/>
                        <stop offset="1" stopColor="#FF6600"/>
                        </linearGradient>
                        </defs>
                    </svg>
                </button>
            </div>


            {/* <input
                type="range"
                name="rotate"
                className={style.slider}
                value={rotate}
                min={-25}
                max={25}
                step={1}
                onChange={handleRotation}
            /> */}
            {/* <button onClick={()=>{setRotate(rotate+90)}}>Rotate 90</button> */}
            {/* <input
                type="range"
                name="zoom"
                className={style.slider}
                value={zoom}
                min={1}
                max={3}
                step={0.01}
                onChange={(e: any)=>{setZoom(e.target.value)}}
            /> */}
        </>
    )
}