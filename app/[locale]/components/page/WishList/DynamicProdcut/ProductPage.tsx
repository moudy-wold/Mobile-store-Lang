import React from "react";

import Hero from "@/app/[locale]/components/global/Hero/Hero";
import Imagezoom from "@/app/[locale]/components/page/Category/DynamicSection/Imagezoom";
import MiddleSection from "@/app/[locale]/components/page/Category/DynamicSection/MiddleSections";
import ProductDetails from "@/app/[locale]/components/page/Category/DynamicSection/SomeProductDetails";
import AllProductDetails from "@/app/[locale]/components/page/Category/DynamicSection/AllProductDetails";
import { useTranslation } from "@/app/i18n/client";
type Props = {
  data: any;
  locale: string;
};

function DynamicProduct({ data, locale }: Props) {
  const { t } = useTranslation(locale, "common");
  const breadcrumbData = [
    {
      title: data?.data?.categoryName,
      url: `/${data?.data?.categoryName}`,
      id: 1,
    },
    { title: data.name, url: "/#", id: 2 },
  ];
  return (
    <>
      <div className=" container">
        <Hero locale={locale} title={t("home")} breadcrumb={breadcrumbData} />
      </div>
      <div className="lg:grid lg:grid-cols-[29%_36%_31%] gap-5 p-8">
        <div className="">
          <Imagezoom images={data?.data?.images} />
        </div>

        <div>
          <MiddleSection locale={locale} data={data?.data} />
        </div>
        <div className="">
          <ProductDetails data={data?.data} locale={locale} />
        </div>
      </div>
      <div className="w-full bg-gray-100 p-5">
        <AllProductDetails locale={locale} data={data?.data} />
      </div>
    </>
  );
}

export default DynamicProduct;
