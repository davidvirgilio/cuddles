
'use client'
import { useRouter } from "next/navigation";

export default function BackButton({
    className = '',
}:{
    className?: string;
}
) {
    const router = useRouter();
    const handleClose = ()=>{
        router.back();
    };
    return(
        <button onClick={handleClose} className={className}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.5812 0.460339C12.1554 1.0575 12.1368 2.00706 11.5397 2.58125L3.66416 10L11.5397 17.4187C12.1368 17.9929 12.1554 18.9425 11.5812 19.5397C11.0071 20.1368 10.0575 20.1554 9.46034 19.5812L0.460339 11.0812C0.166221 10.7984 2.38419e-06 10.408 2.38419e-06 10C2.38419e-06 9.59197 0.166221 9.20156 0.460339 8.91875L9.46034 0.418752C10.0575 -0.155438 11.0071 -0.136819 11.5812 0.460339Z" fill="#ED002F"/>
            </svg>
        </button>

    );
};