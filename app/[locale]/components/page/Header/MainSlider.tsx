import React from "react";
import AdsSlder from "@/app/[locale]/components/global/AdsSlider/AdsSlider";

import { GetMainSliderForCustomer } from "@/app/[locale]/api/slider";
type Data = {
  id: string;
  img: string;
  title: string;
}[];

async function MainSlider({locale} :LocaleProps) {

const data = await GetMainSliderForCustomer()
 
  return (
    <main className="relative">
      <AdsSlder locale={locale} data={data.data} />
    </main>
  );
}

export default MainSlider;
