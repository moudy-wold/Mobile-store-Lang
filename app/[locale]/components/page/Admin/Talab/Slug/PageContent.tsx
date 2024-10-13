"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { GetMainCategories_Talab } from "@/app/[locale]/api/talab";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
import Slider from "react-slick";
import ProductsPage from "@/app/[locale]/components/global/ProductsPage/ProductsPage";

type Props = {
  locale: string,
  data: any
}

 

function PageContent({ locale, data }: Props) {
  const { t } = useTranslation(locale, "common")
  const [slelctedCate_id , setSelectedCate_id]= useState("")
  const [slelctedCate_slug , setSelectedCate_slug]= useState("")

  useEffect(() => {
    if (data) {
      setSelectedCate_id(data.data[0].id); 
    }
  }, []); 

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  let sliderItems: any = data?.data?.map((item: any, index: number) => {
    return (

      <div className="">
        <button onClick={()=>{setSelectedCate_id(item.id);setSelectedCate_slug(item.slug);}} className="flex flex-col items-center justify-center">
          <Image src={item.icon} alt="item.id" width={70} height={70} className="!w-24 !h-24 border-2 border-gray-300 rounded-full p-1 " />
          <p className="">{item.name} </p>
        </button>
      </div>
    )
  })

  return (
    <div className="">
      <div className="">
        <Slider {...settings} >
          {sliderItems}
        </Slider>
        {slelctedCate_id!= "" && <ProductsPage locale={locale} id={slelctedCate_id} title={slelctedCate_slug} store={true} />}
        
      </div>
    </div>
  )
}

export default PageContent
