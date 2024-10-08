"use client";

import React, { useState,useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { GetMainCategories_Talab } from "@/app/[locale]/api/talab";

function CategoriesSlider({ locale }: any) {
  const [data, setData] = useState([]);

  const GetData = async ()=>{
      try{
          const res = await GetMainCategories_Talab()
          console.log(res.data.data)
          setData(res.data.data)
      }catch(err:any) {
        console.log(err)
      }
  }
  const datas = [
    { label: "شاشات" },
    { label: "سوكة شحن" },
    { label: "كاميرات" },
    { label: "تاتش" },
    { label: "شاصيهات" },
    { label: "بوردات" },
    { label: "آيسيات" },
    { label: "سماعات" },
    { label: "إكسسوارات" },
    { label: "شاشات" },
    { label: "سوكة شحن" },
    { label: "كاميرات" },
    { label: "تاتش" },
  ]
  useEffect(()=>{
    GetData()
  },[])
  return (
    <div className="">
      <div className="flex items-center justify-center ">
        <Swiper
          freeMode={true}
          spaceBetween={8}
          breakpoints={{
            320: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1220: { slidesPerView: 7 }
          }}
        >
          {datas?.map((item: { label: string }, index: number) => (
            <SwiperSlide key={index} onClick={() => { console.log(" ") }}>
              <div className="flex items-center justify-center bg-[#ececec] rounded-lg p-1 px-2 cursor-pointer hover:scale-105 transition-all duration-150 " key={index}>
                <p className="">{item.label} </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
export default CategoriesSlider