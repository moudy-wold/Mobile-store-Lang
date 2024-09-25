import React from "react";
import EditMainSlider from "@/app/[locale]/components/page/Admin/Slider/MainSlider/Edit/PageContent";

function Page({params: { locale } }: LocaleParams) {
  return (
    <div>
      <EditMainSlider locale={locale}/>
    </div>
  );
}

export default Page;