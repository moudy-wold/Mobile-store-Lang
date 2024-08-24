import React from "react";
import Link from "next/link"
import { CiCirclePlus } from "react-icons/ci";
import { GetMainSlider } from "@/app/[locale]/api/slider";
import  MainSliderList  from "@/app/[locale]/components/page/Admin/Slider/MainSlider/MainList/PageContent";
import { Button } from "antd";
async function SliderList() {

  const data = (await GetMainSlider()).data;

  return (
    <div className="!w-[390px] sm:!w-[640px] md:!w-[768px] lg:!w-full " >
    <div className="grid grid-cols-[50%_50%]">
      <div className="flex items-center">
        <Button className="">
          <Link href="/admin/main-slider/create" className="flex items-center justify-beetwen">أضف سلايدر <CiCirclePlus /></Link>
        </Button>
      </div>
        
    </div>
    <div style={{  overflowX: 'auto' }}>
    <MainSliderList data={data.sliders} pageName="main" />
    </div>
    </div>
    )
}

export default SliderList;
