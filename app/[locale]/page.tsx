import React from "react";
import { GetBranchSliderForCustomer } from "@/app/[locale]/api/slider";
import { Category, GetAllCategoriesForCustomer } from "@/app/[locale]/api/category";
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('@/app/[locale]/components/page/Header/PageContent'))
const AdsSlder = dynamic(() => import('@/app/[locale]/components/global/AdsSlider/AdsSlider'),{ssr:false})
const ProductsSlider = dynamic(() => import('@/app/[locale]/components/page/Category/DynamicSection/ProductsSlider'))


interface RootLayoutProps {
  params: {
    locale: string;
  };
 
}
 

export default async function Home({ params: { locale } }: RootLayoutProps) {
  // const branchSliderData = await GetBranchSliderForCustomer();
  // const allCategoryData = await GetAllCategoriesForCustomer();
  return (


    // <div className="pt-12 lg:pt-0 bg-[#f1f7fc]">
    <div className="pt-12 lg:pt-0 ">
      {/* <Header locale={locale}/> */}
 
      {/* {allCategoryData?.data?.data?.map((category: Category, index: number) => (
        <div key={index}>
          {index == 1 && <><AdsSlder locale={locale} data={branchSliderData.data} /></>}
          <ProductsSlider category={category} locale={locale} />
        </div>
      ))}   */}

{/* {allCategoryData?.data?.data?.map((category: Category, index: number) => (
        <div key={index}>
          <ProductsSlider category={category} locale={locale} />
        </div>
      ))}   */}


    </div>


  );
}
