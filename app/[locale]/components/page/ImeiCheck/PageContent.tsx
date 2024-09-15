"use client"
import React, { useState } from "react";
import Image from "next/image";
import Hero from "@/app/[locale]/components/global/Hero/Hero";
import "./style.css"
type FieldType = {
    serachImei: string;
}


const breadcrumbData = [
    { title: 'فحص الإيمي', url: '/phone', id: 1 },
];

function PageContent() {
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async () => {
        setIsLoading(true)
        try {
            //   const response  = await AddCustomer(obj)    
            setIsLoading(false)
        } catch (err: any) {
            setIsLoading(false)

            //   notification.error({
            //     message:err.response.data.error.errors[0].msg
            //   })
        }

    };

    return (
        <div className="py-5  h-[100vh]">
            <div className=" container ">
                <Hero title="الرئيسية" breadcrumb={breadcrumbData} />
            </div>
            <Image src="/imei.jpg" alt="asd" height={300} width={1100} className="!h-[350px] !w-full mt-6 " />
            <div className="border-2 border-gray-200 rounded-lg  flex justify-center py-20">
                <form
                    name="imei-check"
                    autoComplete="off"
                    onSubmit={onFinish}
                    className=" flex items-center w-[350px] sm:w-[550px] lg:w[600px]"
                >
                    <div className="w-full border-2 border-gray-200 rounded-lg px-1 flex items-center justify-center " >
                        <input type="number" placeholder="يرجى كتابة رقم الإيمي" className="w-96  p-3 text-xl outline-none" />
                        <button type="submit" className={`bg-[#4678e9] rounded-md py-2 px-5 text-white text-xl w-44  text-center transition-all duration-200 ${!isLoading && "hover:scale-110"}`}>
                            {isLoading ? "جاري الغحص..." : "فحص   "}

                        </button>
                    </div>
                    {isLoading &&
                        <div className="w-16 -mt-3 mr-2">
                            <div className="loader"></div>
                        </div>
                    }
                </form>

            </div>
        </div>
    )
}
export default PageContent