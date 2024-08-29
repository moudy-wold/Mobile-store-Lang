"use client"
import React, { useState, useEffect } from 'react'
import Image from "next/image"
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import { Button } from "antd";
import SubscriptionInformation from "./SubscribInformations/SubscriptionInformation";
import Plans from "./Plans/Plans";
import { useSelector , useDispatch } from "react-redux";
import { setLast_14Day } from "@/app/[locale]/lib/todosSlice";


function PageContent() {
  const [slidePlans, setSlidePlans] = useState(false);
  const dispatch = useDispatch()
  
  const { infoData ,day_14} = useSelector((state: any) => state.counter)
  useEffect(() => {
    const targetDate: any = new Date(infoData?.data?.plan_expiration_date);
    const currentDate: any = new Date();

    // حساب الفرق بين التاريخين
    const timeDifference = targetDate - currentDate;
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));


    if (daysRemaining <= 14) {
      dispatch(setLast_14Day(true)) 
    }
  }, []);
  return (
    <div>
      <div className=" mb-5">
        <Button>
          <Link href="/admin/info/create">أضف معلومات</Link>
        </Button>
      </div>
      <table className="w-full overflow-x-scroll"  >
        <thead className="bg-[#eee] border-2 border-[#f6f6f6]">
          <tr className=" ">
            <th colSpan={3} className="text-xl lg:text-xl font-bold p-3 ">
              المعلومات العامة
            </th>
          </tr>
        </thead>
        <tbody className="">

          <tr className="bg-white" key={infoData?.data?.name}>
            <td className="p-2 px-5 text-lg lg:text-xl text-[#006496] border-2 border-[#eee]">
              إسم المتجر
            </td>
            <td className="p-2 text-base lg:text-lg border-2 border-[#eee]">
              {infoData?.data?.name}
            </td>
            <td className="p-2 text-base lg:text-lg border-2 border-[#eee]">
              <a href={`/admin/info/create`}><CiEdit /></a>
            </td>
          </tr>

          <tr className="bg-white" key={infoData?.data?.name}>
            <td className="p-2 px-5 text-lg lg:text-xl text-[#006496] border-2 border-[#eee]">
              الشعار
            </td>
            <td className="p-2 text-base lg:text-lg border-2 border-[#eee]">
              <Image src={infoData?.data?.logo ? infoData?.data?.logo : ""} height={100} width={100} alt={infoData?.data?.logo} />
            </td>
            <td className="p-2 text-base lg:text-lg border-2 border-[#eee]">
              <a href={`/admin/info/create`}><CiEdit /></a>
            </td>
          </tr>

          <tr className="bg-white" key={infoData?.data?.name}>
            <td className="p-2 px-5 text-lg lg:text-xl text-[#006496] border-2 border-[#eee]">
              الوصف
            </td>
            <td className="p-2 text-base lg:text-lg border-2 border-[#eee]">
              {infoData?.data?.description}
            </td>
            <td className="p-2 text-base lg:text-lg border-2 border-[#eee]">
              <a href={`/admin/info/create`}><CiEdit /></a>
            </td>
          </tr>

          <tr className="bg-white" key={infoData?.data?.name}>
            <td className="p-2 px-5 text-lg lg:text-xl text-[#006496] border-2 border-[#eee]">
              التواصل الإجتماعي
            </td>

            <td className=" p-2 text-base lg:text-lg border-2 border-[#eee]">
              {infoData?.data?.social?.length && JSON.parse(infoData?.data?.social).map((item: any, index: any) => (
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
        <SubscriptionInformation data={infoData} slidePlans={slidePlans} setSlidePlans={setSlidePlans} />
      </div>
      <div className="">
        {day_14 &&
          <Plans slidePlans={slidePlans} setSlidePlans={setSlidePlans} day_14={day_14} />
        }
      </div>
    </div>

  )
}

export default PageContent;