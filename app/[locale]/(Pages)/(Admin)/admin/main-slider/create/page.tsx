import React from "react";
import AddMainSlider from "@/app/[locale]/components/page/Admin/Slider/MainSlider/Create/PageContent"
function Page({params: { locale } }: LocaleParams) {

  return (
    <div>
      <AddMainSlider locale={locale} />
    </div>
  );
}

export default Page;
