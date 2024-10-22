"use client"
import React, { useEffect, useState } from "react";
import OrderList from "./OrderList/OrderList";
import { useRouter } from 'next/navigation';
import { GetInfoForCustomer } from "@/app/[locale]/api/info"

function PageContent({ data, locale }: any) {
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await GetInfoForCustomer();

                if (res?.data?.plan_detils_limit?.enable_cart == 0) {
                    router.push('/')
                    console.log(res?.data?.plan_detils_limit?.enable_cart, "card System")
                } else {
                    console.log(res?.data?.plan_detils_limit?.enable_cart, "else")
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        getData();


    }, [])
    return (
        <div className="">
            <div className="">
                <OrderList data={data} locale={locale} />
            </div>
        </div>
    )
}
export default PageContent