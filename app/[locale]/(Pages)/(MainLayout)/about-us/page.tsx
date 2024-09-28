import React from "react";
import Image from "next/image";
import {GetInfoForCustomer} from "@/app/[locale]/api/info"
async function Page({ params: { locale } }: LocaleParams) {
const data = await GetInfoForCustomer();
    
    return (
        <div className="my-20  mx-auto p-2 w-[90%] md:w-3/5 ">
            <h2 className="text-2xl m-auto block w-fit mb-4 ">{data?.data?.data?.name}</h2>
             
            <div className="w-fit my-4 mx-auto ">
                <Image src={data?.data?.data?.logo} height={100} width={150} alt="asd" />
                </div>
            <p className="text-2xl text-center">
            {data?.data?.data?.description}
             
            </p>
        </div>
    )
}

export default Page;