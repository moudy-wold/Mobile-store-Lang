"use client";
import type { ColumnsType } from "antd/es/table";
import { Space, Table, Modal, Button } from "antd";
import { GetProductById, Phone } from "@/app/[locale]/api/phone";
import { useState } from "react";
type Props = {
  data: any;
};
function productDetails({ data }: Props) {

  const onScroll = () => {
    window.scrollTo({ top: 1200, behavior: 'smooth' });
  };

  return (
    <div className="min-h-[370px]">
      <div className="w-full ">
        <div className="bg-[#f6f6f6]  border-2 border-[#f6f6f6]">
          <div>
            <div className="text-xl p-2 font-semibold mx-auto">
              مواصفات المنتج
            </div>
          </div>
        </div>
      </div>
      <div className="h-[310px] overflow-y-auto">
        Bu ürün TrendShop tarafından gönderilecektir.
        Kampanya fiyatından satılmak üzere 5 adetten az stok bulunmaktadır.
        İncelemiş olduğunuz ürünün satış fiyatını satıcı belirlemektedir.
      </div>
      <div className="">
        <button onClick={() => onScroll()} className="w-full p-3 pb-5 text-white text-base lg:text-xl bg-[#006496] hover:bg-[#004169] rounded-b-md block -mt-0 mx-auto">
          عرض المزيد
        </button>
      </div>
    </div>
  );
}
export default productDetails;
