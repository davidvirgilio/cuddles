import Image from "next/image";

export default function S3Image<children>(
    {
        src,
        alt,
        width,
        height,
        className,
        priority,
        onClick,
    }:{
        src: string,
        alt: string,
        width?: number,
        height?: number,
        className?: string,
        priority?: boolean,
        onClick?: (e:any) => void,
    }
){
    const URL = 'https://s3.eu-west-3.amazonaws.com/cuddles.storage'
    return (
    <Image
        alt={alt}
        className={className}
        src={`${URL}/${src}`}
        width={width}
        height={height}
        priority={priority}
        onClick={onClick}
    />);
}