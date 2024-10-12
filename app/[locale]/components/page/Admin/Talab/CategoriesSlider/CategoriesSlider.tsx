"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { GetMainCategories_Talab } from "@/app/[locale]/api/talab";
import Image from "next/image";
import Link from "next/link";

function CategoriesSlider({ locale }: any) {
  const [data, setData] = useState<any>([]);

  const GetData = async () => {
    try {
      const res = await GetMainCategories_Talab()
      setData(res.data.data)
      console.log(res.data.data)
    } catch (err: any) {
      console.log(err)
    }
  }

  useEffect(() => {
    GetData()
  }, [])

  return (
    <div className="">
      <div className="flex items-center justify-center ">
        <Swiper
          freeMode={true}
          spaceBetween={1}
          breakpoints={{
            320: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
            1220: { slidesPerView: 9 }
          }}
        >
          {data?.map((item: any, index: number) => (
            <SwiperSlide key={index} onClick={() => { console.log(item.slug) }}>
              <Link href={`/admin/talab/${item.slug}`} className="flex flex-col items-center justify-center">
                <Image src={item.icon} alt="item.id" width={70} height={70} className="!w-24 !h-24 border-2 border-gray-300 rounded-full p-1 " />
                <p className="">{item.name} </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
export default CategoriesSlider