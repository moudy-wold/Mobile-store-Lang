import React from "react";
import Image from "next/image";
import dynamic from 'next/dynamic'

const Loader = dynamic(() => import('@/app/[locale]/components/global/Loader/Loader'), { ssr: false })


function ImagesSlider( {image,locale} : any) {
  
    return (
        <div>
            {!image && <Loader />}
            <img src={image} alt={"image"} height={600} width={1000} className="!h-[620px]" />
        </div>
    )
}
export default ImagesSlider