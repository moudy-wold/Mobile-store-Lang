"use client";
import React from "react"
import Imagezoom from "./Imagezoom";
import ProductDetails from "@/app/[locale]/components/page/Category/DynamicSection/SomeProductDetails";
import MiddleSection from "./MiddleSections";
import AllProductDetails from "@/app/[locale]/components/page/Category/DynamicSection/AllProductDetails";
import Hero from "@/app/[locale]/components/global/Hero/Hero";
import { useTranslation } from "@/app/i18n/client";
import Questions from "./Questions";
import Rating from "./Rating";

type Props = {
    data: any,
    locale: any,
    store?: boolean
}

function ProductPage({ locale, data, store }: Props) {
    console.log(data.data)
    const { t } = useTranslation(locale, "common");
    const breadcrumbData = [
        { title: store == true ? `${data.data.category_sub.name}` : `${data?.data?.categoryName}`, url: store == true ? `/admin/talab/${data.data.category_sub.name}/${data.data.name}` : `/category/${data?.data?.categoryName}`, id: 1 },
        { title: data?.data?.name, url: '/#', id: 2 },
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
                    <MiddleSection locale={locale} data={data?.data} store={store} />
                </div>
                <div className="">
                    <ProductDetails data={data?.data} locale={locale} />
                </div>
            </div>

            {/* Start Questions && Reviews*/}
            <div className="grid lg:grid-cols-2 gap-10 px-8">
                <Questions locale={locale} product_id={data?.data?._id} questions={data.data.questions} store={store} />
                <Rating locale={locale} product_id={data?.data?._id} reviews={data.data.reviews} store={store} />
            </div>
            {/* End Questions && Reviews */}

            <div className="w-full bg-white p-5">
                <AllProductDetails locale={locale} data={data?.data} />
            </div>
        </>
    )
}

export default ProductPage;