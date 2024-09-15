import React from "react";
import Link from "next/link"
import Search from "@/app/[locale]/components/global/Search/SearchUser/SearchUser"
import { CiCirclePlus } from "react-icons/ci";
import { GetBranchSlider } from "@/app/[locale]/api/slider";
import BranchList from "@/app/[locale]/components/page/Admin/Slider/BranchSlider/BranchList/PageContent";
import { Button } from "antd";
async function SliderList() {

  const data = (await GetBranchSlider()).data; 
  return (
    <div className="!w-[390px] sm:!w-[640px] md:!w-[768px] lg:!w-full " >
    <div className="grid grid-cols-[50%_50%]">
      <div className="flex items-center">
        <Button className="">
          <Link href="/admin/branch-slider/create" className="flex items-center justify-beetwen">أضف سلايدر <CiCirclePlus /></Link>
        </Button>
      </div>
        <div className="p-4">
            <Search />
        </div>
    </div>
    <BranchList data={data.sliders}  pageName="branch" />
    </div>
    )
}

export default SliderList;
