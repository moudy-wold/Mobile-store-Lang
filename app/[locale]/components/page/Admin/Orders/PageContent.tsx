"use client"
import React from "react";
import OrderList from "./OrderList/OrderList";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

function PageContent({ data ,locale}: any) {
    const router = useRouter();
    const { card_System } = useSelector((state: any) => state.counter);
     if (!card_System) {
         router.push('/')
         console.log(card_System,"card System")
     } else {
        console.log(card_System,"card System")
     }
    return (
        <div className="">
            <div className="">
                <OrderList data={data} locale={locale} />
            </div>
        </div>
    )
}
export default PageContent