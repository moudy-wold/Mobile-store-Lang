import React from "react";
import Link from "next/link";
import Search from "@/app/[locale]/components/global/Search/SearchUser/SearchUser";
import { CiCirclePlus } from "react-icons/ci";
import { GetBranchSlider } from "@/app/[locale]/api/slider";
import BranchList from "@/app/[locale]/components/page/Admin/Slider/BranchSlider/BranchList/PageContent";
import { Button } from "antd";
import { useTranslation } from "@/app/i18n";

type Props = {
  params: {
    locale: string;
  };
};
async function SliderList({ params: { locale } }: Props) {
  const data = (await GetBranchSlider()).data;

  return (
    <div className="!w-[390px] sm:!w-[640px] md:!w-[768px] lg:!w-full ">
     
      <BranchList data={data.sliders} pageName="branch" locale={locale} />
    </div>
  );
}

export default SliderList;
