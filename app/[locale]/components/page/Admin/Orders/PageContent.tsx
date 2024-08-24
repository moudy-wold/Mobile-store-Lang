"use client"
import React from "react";
import OrderList from "./OrderList/OrderList";

function PageContent ({data}:any){
    return (
        <div className="">
            <div className="">
                <OrderList data={data}/>
            </div>
        </div>
    )
}
export default PageContent