"use client"
import React, { useState } from "react";
import { ColumnsType } from "antd/es/table";
import Image from "next/image"
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import { Button } from "antd";
import SubscriptionInformation from "./SubscribInformations/SubscriptionInformation";
 

function PageContent({ data }: any) {
  const [arrFromData, setArrFromData] = useState([data])
  return (
    <div>
      <div className=" mb-5">
        <Button>
          <Link href="/admin/info/create">أضف معلومات</Link>
        </Button>
      </div>
      <table className="w-full">
        <thead className="bg-[#eee] border-2 border-[#f6f6f6]">
          <tr className=" ">
            <th colSpan={3} className="text-xl lg:text-xl font-bold p-3 ">
              المعلومات العامة
            </th>
          </tr>
        </thead>
        <tbody className="">

          <tr className="bg-white" key={data.id}>
            <td className="p-2 px-5 text-lg lg:text-xl text-[#006496] border-2 border-[#eee]">
              إسم المتجر
            </td>
            <td className="p-2 text-base lg:text-lg border-2 border-[#eee]">
              {data.name}
            </td>
            <td className="p-2 text-base lg:text-lg border-2 border-[#eee]">
              <a href={`/admin/info/create`}><CiEdit /></a>
            </td>
          </tr>

          <tr className="bg-white" key={data.id}>
            <td className="p-2 px-5 text-lg lg:text-xl text-[#006496] border-2 border-[#eee]">
              الشعار
            </td>
            <td className="p-2 text-base lg:text-lg border-2 border-[#eee]">
              <Image src={data?.logo ? data?.logo : ""} height={100} width={100} alt={data?.logo} />
            </td>
            <td className="p-2 text-base lg:text-lg border-2 border-[#eee]">
              <a href={`/admin/info/create`}><CiEdit /></a>
            </td>
          </tr>

          <tr className="bg-white" key={data.id}>
            <td className="p-2 px-5 text-lg lg:text-xl text-[#006496] border-2 border-[#eee]">
              الوصف
            </td>
            <td className="p-2 text-base lg:text-lg border-2 border-[#eee]">
              {data.description}
            </td>
            <td className="p-2 text-base lg:text-lg border-2 border-[#eee]">
              <a href={`/admin/info/create`}><CiEdit /></a>
            </td>
          </tr>

          <tr className="bg-white" key={data.id}>
            <td className="p-2 px-5 text-lg lg:text-xl text-[#006496] border-2 border-[#eee]">
              التواصل الإجتماعي
            </td>
          
            <td className=" p-2 text-base lg:text-lg border-2 border-[#eee]">
             {data?.social?.length &&  JSON.parse(data?.social).map((item: any, index: any) => (
                <span key={index} className="mx-3">
                  {item.name}
                </span>
              ))}
            </td>
            
            <td className="p-2 text-base lg:text-lg border-2 border-[#eee]">
              <a href={`/admin/info/create`}><CiEdit /></a>
            </td>
          </tr>

        </tbody>
      </table>
      <div className="mt-10">
        <h1 className="my-5 text-2xl">معلومات الإشتراك</h1>
      <SubscriptionInformation />
      </div>
    </div>

  )
}

export default PageContent;