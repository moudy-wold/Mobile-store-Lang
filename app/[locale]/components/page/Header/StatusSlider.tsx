"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Modal } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import "swiper/css";
import {  Autoplay, FreeMode } from "swiper/modules";
SwiperCore.use([FreeMode]);
 
type Props = {
  data: any
}
type Image = {
  _id: number,
  title: string
  description: string,
  image: any,
}
function StatusSlider({data}:any) {
  const swiperRef = useRef<any>(null);
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const handleShowStatus = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
    if (swiperRef.current) { 
          swiperRef.current.swiper.slideTo(index); 
          // swiperRef.current.swiper.params.autoplay =  true
        }
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && !autoplayPaused) {
      swiperRef.current.swiper.autoplay.stop();
      setAutoplayPaused(true);
    }
  };
  return (
    <main>
      <div className="flex items-center justify-center ">
        <Swiper
          freeMode={true}
          spaceBetween={1}
          breakpoints={{
            320: { slidesPerView:4 , },
            1024: { slidesPerView: 5 },
            1220: { slidesPerView: 7  }
          }}
          >
          {data?.data?.map((item: Image, index:number) => (
            <SwiperSlide key={item._id} onClick={() => handleShowStatus(index)}>
              <div className="flex flex-col items-center mt-4" key={item._id}>
                <div className="border-2 border-[#006496] rounded-full p-1 ">
                  <img src={item.image} alt="item.id" className="rounded-full !w-[68px] !h-[68px] lg:!h-[180px] lg:!w-[180px]" />
                </div>
                <div className="mt-2 text-sm  lg:text-lg font-semibold">{item.title}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Modal
          centered
          open={open}
          onOk={() => handleCloseModal()}
          onCancel={() => handleCloseModal()}
          okButtonProps={{ style: { display: 'none' } }}
          cancelButtonProps={{ style: { display: 'none' } }}
          width={500}
        >                               
          <Swiper  
          initialSlide={activeIndex} 
          ref={swiperRef}          
          autoplay={open&&{ delay: 1000, pauseOnMouseEnter: true }} 
          onMouseLeave={handleMouseLeave}
          modules={[Autoplay]}
          
          >
            {data?.data?.map((item: Image) => (
              <SwiperSlide key={item._id}>
                <div className="flex flex-col items-center mt-4">
                <div className="mt-2 text-lg font-semibold">{item.title}</div>
                  <div className="p-2">
                    <img
                      src={item.image}
                      alt={item._id.toString()}
                      height={500}
                      width={500}
                      className=""
                    />
                  </div>
                  <div className="mt-2 text-lg font-semibold">{item.description}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Modal>
      </div>
    </main>
  );
}

export default StatusSlider;
