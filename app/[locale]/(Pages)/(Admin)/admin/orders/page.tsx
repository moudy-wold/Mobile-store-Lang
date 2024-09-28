import React from "react";
import PageContent from "@/app/[locale]/components/page/Admin/Orders/PageContent";
import {GetAllOrders} from "@/app/[locale]/api/order";

async function Page({ params: { locale } }: LocaleParams) {
     const data = await GetAllOrders()
            // id:1,
            // userName: "moudy",
            // phoneNumber: "0552871918",
            // address: "asd asd ewd adfc dasf  dsf sdf ",
            // note: "asd asd qa dfsf f ds fwe fagh e ge g",
            // orderStatus: "pending",
            // products: [{
            //     id: 1,
            //     name: "Beyaz Yüksek Taban Çizgili Bağcıklı Kadın Spor Ayakkabı",
            //     image: "/headphone/apple-airpods-3rd-generation-white_360.jpeg",
            //     size: "32gb",
            //     quantity: 1,
            //     price: 420,

            // },
             
    return (
        <div className="">
            <PageContent data={data?.data?.data} locale={locale} />
        </div>
    )
}
export default Page