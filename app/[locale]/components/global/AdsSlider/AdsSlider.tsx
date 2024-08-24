"use client"
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Navigation,
  Pagination, 
  Keyboard,
  Autoplay,
} from "swiper/modules";
 


function AdsSlder({ data }: any) {
  return (
    <main className="relative">
      <Swiper
        cssMode={true}
        navigation={true}       
        keyboard={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination,   Keyboard, Autoplay]}
      >
        {data?.data.map((item:any) => (
          <SwiperSlide key={item._id} >
            <div>
              <Image
                src={item.image}
                alt="asd"
                height={250}
                width={1000}
                className="!w-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}

export default AdsSlder;
