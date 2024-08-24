import React from "react";
import Header from "@/app/[locale]/components/page/Header/PageContent";
import AdsSlder from "@/app/[locale]/components/global/AdsSlider/AdsSlider";
import { GetBranchSliderForCustomer } from "@/app/[locale]/api/slider";
import { Category, GetAllCategoriesForCustomer } from "@/app/[locale]/api/category";
import ProductsSlider from "@/app/[locale]/components/page/Category/DynamicSection/ProductsSlider";

export default async function Home() {
  const branchSliderData = await GetBranchSliderForCustomer();
  const allCategoryData = await GetAllCategoriesForCustomer();
  return (


    <div className="pt-12 lg:pt-0 bg-[#f1f7fc]">
      <Header />
 
      {allCategoryData?.data?.data?.map((category: Category, index: number) => (
        <div key={index}>
          {index == 1 && <><AdsSlder data={branchSliderData.data} /></>}
          <ProductsSlider category={category} />
        </div>
      ))}  




    </div>


  );
}
