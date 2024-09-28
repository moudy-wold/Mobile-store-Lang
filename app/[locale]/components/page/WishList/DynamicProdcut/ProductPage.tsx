import React from "react"
import Imagezoom from "./Imagezoom";
import ProductDetails from "./SomeProductDetails";
import MiddleSection from "./MiddleSections";
import AllProductDetails from "./AllProductDetails";
import Hero from "@/app/[locale]/components/global/Hero/Hero";
type Props = {
    data: any,
    locale:string
}

function DynamicProduct({ data,locale }: Props) {    
    const breadcrumbData = [
        { title: data?.data?.categoryName, url: `/${data?.data?.categoryName}`, id: 1 },
        { title: data.name, url: '/#', id: 2 },
    ];
    return (
        <>
            <div className=" container">
                <Hero locale={locale} title="الرئيسية" breadcrumb={breadcrumbData} />
            </div>
            <div className="lg:grid lg:grid-cols-[29%_36%_31%] gap-5 p-8">
                <div className="">
                    <Imagezoom images={data?.data?.images} />
                </div>

                <div>
                    <MiddleSection  locale={locale} data={data?.data} />
                </div>
                <div className="">
                    <ProductDetails data={data?.data} />
                </div>
            </div>
            <div className="w-full bg-gray-100 p-5">
                <AllProductDetails locale={locale} data={data?.data} />
            </div>
        </>
    )
}

export default DynamicProduct;