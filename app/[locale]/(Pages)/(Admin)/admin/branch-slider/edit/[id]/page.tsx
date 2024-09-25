"use client";
import React from "react";
import PageContent from "@/app/[locale]/components/page/Admin/Slider/BranchSlider/Edit/PageContent";

function EditMainSlider({params: { locale } }: LocaleParams) {
        return (
          <div>
            <PageContent locale={locale}/>
          </div>
        );
}

export default EditMainSlider;