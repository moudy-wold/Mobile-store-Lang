"use client";
import React, { useState,useEffect } from "react";
import Image from "next/image";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FreeMode } from "swiper/modules";
SwiperCore.use([FreeMode]);

function Imagezoom({ images,locale }: any) {
  const [selectedImg, setSelectedImg] = useState("")
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [crusorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: any) => {
    let { left, top, width, height } = e.currentTarget.getBoundingClientRect();

    let x = ((e.pageX - left) / width) * 100;
    let y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
    setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
  };
  useEffect(()=>{
    {images && setSelectedImg(images[0])}
  
  },[images])
  return (
    <div>
      <div
        className="relative cursor-crosshair "
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <Image src={selectedImg} width={350} height={350} alt="asd" className="block m-auto" />
        {showZoom && (
          <div
            className={`absolute z-50 `}
            style={{
              left: `${crusorPosition.x - 100}px`,
              top: `${crusorPosition.y - 100}px`,
              pointerEvents: "none",
            }}
          >
            <div
              className={`w-[200px] h-[200px] scale-125`}
              style={{
                backgroundImage: `url(${selectedImg})`,
                backgroundPosition: `${position.x}% ${position.y}%`,
              }}
            ></div>
          </div>
        )}
      </div>


      <Swiper      
      // className="h-[500px]"        
        freeMode={true}
        // direction="vertical"
        breakpoints={{
          320: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
      >
        {images?.map((image: any) => (
          <SwiperSlide key={image}>
            <div className="cursor-pointer rounded-lg border-2 border-[#eee] flex items-center justify-center" onClick={() => setSelectedImg(image)}>
              <Image
                src={image}
                alt="asd"
                width={70}
                height={70}
                className=""
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>



    </div >
  )
}

export default Imagezoom
