"use client"
import React, { useState, useEffect } from 'react'
import Image from "next/image"
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import { Button } from "antd";
import SubscriptionInformation from "./SubscribInformations/SubscriptionInformation";
import { useSelector, useDispatch } from "react-redux";
import { setLast_14Day } from "@/app/[locale]/lib/todosSlice";
import { useTranslation } from '@/app/i18n/client';
import dynamic from 'next/dynamic';
const Plans = dynamic(() => import("./Plans/Plans"), { ssr: false })

function PageContent({ locale }: LocaleProps) {
  const { t } = useTranslation(locale, "common");

  const [slidePlans, setSlidePlans] = useState(false);
  const dispatch = useDispatch()
  const { infoData, day_14 } = useSelector((state: any) => state.counter)

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
          <Link href="/admin/info/create">{t("dd_informations")}</Link>
        </Button>
      </div>
      <table className="w-full overflow-x-scroll"  >
        <thead className="bg-[#eee] border-2 border-[#f6f6f6]">
          <tr className=" ">
            <th colSpan={3} className="text-xl lg:text-xl font-bold p-3 ">
              {t("general_information")}
            </th>
          </tr>
        </thead>
        <tbody className="">

          <tr className="bg-white" key={infoData?.data?.name}>
            <td className="p-2 px-5 text-lg lg:text-xl text-[#006496] border-2 border-[#eee]">
              {t("market_name")}
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
              {t("logo")}
            </td>
            <td className="p-2 text-base lg:text-lg border-2 border-[#eee]">
              <Image src={infoData?.data?.logo ? infoData?.data?.logo : "/"} height={100} width={100} alt={"infoData?.data?.logo"} />
            </td>
            <td className="p-2 text-base lg:text-lg border-2 border-[#eee]">
              <a href={`/admin/info/create`}><CiEdit /></a>
            </td>
          </tr>

          <tr className="bg-white" key={infoData?.data?.name}>
            <td className="p-2 px-5 text-lg lg:text-xl text-[#006496] border-2 border-[#eee]">
              {t("description")}
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

              {t("sosyal_medya")}
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
        <h1 className="my-5 text-2xl">{t("subscription_information")}</h1>
        <SubscriptionInformation data={infoData} slidePlans={slidePlans} setSlidePlans={setSlidePlans} locale={locale} />
      </div>
      <div className="">
        {day_14 &&
          <Plans slidePlans={slidePlans} setSlidePlans={setSlidePlans} locale={locale} />
        }
      </div>
    </div>

  )
}

export default PageContent;