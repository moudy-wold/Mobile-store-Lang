import React from "react"
import Imagezoom from "./Imagezoom";
import ProductDetails from "@/app/[locale]/components/page/Category/DynamicSection/SomeProductDetails";
import MiddleSection from "./MiddleSections";
import AllProductDetails from "@/app/[locale]/components/page/Category/DynamicSection/AllProductDetails";
import Hero from "@/app/[locale]/components/global/Hero/Hero";
type Props = {
    data: any
}

function ProductPage({ data }: Props) {
    console.log(data)
    const breadcrumbData = [
        { title: data?.data?.categoryName , url: `/category/${data?.data?.categoryName}`, id: 1 },
        { title: data?.data?.name, url: '/#', id: 2 },
    ];
    return (
        <>
            <div className=" container">
                <Hero title="الرئيسية" breadcrumb={breadcrumbData} />
            </div>
            
            <div className="lg:grid lg:grid-cols-[29%_36%_31%] gap-5 p-8">
                <div className="">
                    <Imagezoom images={data?.data?.images} />
                </div>

                <div>
                    <MiddleSection data={data?.data} />
                </div>
                <div className="">
                    <ProductDetails data={data?.data} />
                </div>
            </div>
            <div className="w-full bg-white p-5">
                <AllProductDetails data={data?.data} />
            </div>
        </>
    )
}

export default ProductPage;