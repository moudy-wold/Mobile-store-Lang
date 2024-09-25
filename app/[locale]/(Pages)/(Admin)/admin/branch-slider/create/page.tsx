import React from "react";
import PageContent from "@/app/[locale]/components/page/Admin/Slider/BranchSlider/Create/PageContent"

function AddMainSlider({params: { locale } }: LocaleParams) {

  return (
    <div >
      <PageContent locale={locale} />
    </div>
  );
}

export default AddMainSlider;
