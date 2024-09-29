import React from "react";
import { GetMainSlider } from "@/app/[locale]/api/slider";
import MainSliderList from "@/app/[locale]/components/page/Admin/Slider/MainSlider/MainList/PageContent";

async function SliderList({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const data = (await GetMainSlider()).data;

  return (
    <div className="!w-[390px] sm:!w-[640px] md:!w-[768px] lg:!w-full ">
      <div style={{ overflowX: "auto" }}>
        <MainSliderList data={data.sliders} pageName="main" locale={locale} />
      </div>
    </div>
  );
}

export default SliderList;
