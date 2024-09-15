import React from "react";
import Image from "next/image"
import Loader from "../Loader/Loader";

function ImagesSlider( {image} : any) {
  
    return (
        <div>
            {!image && <Loader />}
            <img src={image} alt={image} height={600} width={1000} className="!h-[620px]" />
        </div>
    )
}
export default ImagesSlider