"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from 'react-redux'
// import  {AdminItems, AdminItemsOnlyRepair, AdminItemsOnlyCard}  from "@/app/[locale]/components/global/BurgerMenu/BurgerMenu";
import {GetInfoForCustomer} from "@/app/[locale]/api/info"
import ItemCard from "@/app/[locale]/components/page/Admin/ItemCard/ItemCard";
import { SidebarMenuItemTypes } from "@/app/[locale]/api/adminpage";
import { useTranslation } from "@/app/i18n/client";
import { CiMenuFries, CiLogin, CiCirclePlus } from "react-icons/ci";
import { IoMdCart, IoMdClose, IoIosSettings } from "react-icons/io";
import { FaInfoCircle, FaBorderNone } from "react-icons/fa";
import { BiCustomize, BiSupport } from "react-icons/bi";
import { GrStatusGoodSmall } from "react-icons/gr";
import { AiTwotoneSliders } from "react-icons/ai";
import { TfiLayoutSlider, TfiLayoutSliderAlt } from "react-icons/tfi";
import { RiAdminFill } from "react-icons/ri";
import { BsArrowsExpandVertical } from "react-icons/bs";
import { RxSection } from "react-icons/rx";
import { MdFavorite } from "react-icons/md";
import { GrPieChart } from "react-icons/gr";
import { FaFirstOrderAlt } from "react-icons/fa";
import { SiFoursquarecityguide } from "react-icons/si";

function HomePage( { locale } : LocaleProps) {
  const { t, i18n } = useTranslation(locale, "common");

  const [handle, setHandle] = useState(false);
  const [card_System ,setCard_System] = useState(true)
  const [repair_Service_System ,setRepair_Service_System] = useState(false)
  
  const AdminItems : SidebarMenuItemTypes[] = [
    {
      label: t("customer_section"),
      key: "1",
      icon: <BiCustomize />,
      url: "/admin/customer",
      items: [
        {
          label: <Link href="/admin/customer/create">{t("add_customer")}</Link>,
          key: "1.1",
          icon: <CiCirclePlus />,
        },
        {
          label: <Link href="/admin/customer">{t("customer_list")}</Link>,
          key: "1.2",
          icon: <BiCustomize />,
        },
      ],
    },
    // {
    //   label: <Link href="/admin/message">رسائل الصفحة</Link>,
    //   key: "3",
    //   icon: <AiFillMessage />,
    //   url: "/admin/message",
    // },
    {
      label: <Link href="/admin/status">{t("statuses")}</Link>,
      key: "33",
      icon: <GrStatusGoodSmall />,
      url: "/admin/status",
    },
    {
      label: <Link href="/admin/guiding-image">{t("guiding_images")}</Link>,
      key: "4.44",
      icon: <SiFoursquarecityguide />,
      url: "/admin/guiding-image",
    },
    {
      label: t("sliders_section"),
      key: "4",
      icon: <AiTwotoneSliders />,
      url: "/admin/main-slider",
      items: [
        {
          label: <Link href="/admin/main-slider">{t("main_slider")}</Link>,
          key: "44",
          icon: <TfiLayoutSlider />,
        },
        {
          label: <Link href="/admin/branch-slider">{t("secondary_slider")}</Link>,
          key: "444",
          icon: <TfiLayoutSliderAlt />,
        },
      ],
    },
    {
      label: t("sections"),
      key: "5.5",
      icon: <RxSection />,
      url: "/",
      items: [
        {
          label: <Link href="/admin/category">{t("all_sections")}</Link>,
          key: "88",
          icon: <RxSection />,
        },
      ],
    },
    {
      label: <Link href="/admin/orders"> {t("orders")}</Link>,
      key: "3333",
      icon: <FaBorderNone />,
      url: "/admin/orders",
    },
    {
      label: t("settings"),
      key: "8",
      icon: <IoIosSettings />,
      url: "/admin/info",
      items: [
        {
          label: <Link href="/admin/employees"> {t("employees")} </Link>,
          key: "888",
          url: "/admin/employees",
          icon: <RiAdminFill />,
        },
        {
          label: <Link href="/admin/info">{t("general_info")} </Link>,
          key: "8888",
          url: "/admin/info",
          icon: <FaInfoCircle />,
        },
      ],
    },
    {
      label: <Link href="/admin/support">{t("support")}</Link>,
      key: "9",
      icon: <BiSupport />,
      url: "/admin/support",
    },
    {
      label: <Link href="/admin/store">{t("store")}</Link>,
      key: "10",
      icon: <GrPieChart />,
      url: "/admin/store",
    },
    {
      label: <Link href="/admin/my-order">{t("my_orders")}</Link>,
      key: "11.11",
      icon: <FaFirstOrderAlt />,
      url: "/admin/my-order",
    },
  ];
  
  const AdminItemsOnlyRepair : SidebarMenuItemTypes[] = [
    {
      label: t("customer_section"),
      key: "1",
      icon: <BiCustomize />,
      url: "/admin/customer",
      items: [
        {
          label: <Link href="/admin/customer/create">{t("add_customer")}</Link>,
          key: "1.1",
          icon: <CiCirclePlus />,
        },
        {
          label: <Link href="/admin/customer">{t("customer_list")}</Link>,
          key: "1.2",
          icon: <BiCustomize />,
        },
      ],
    },
  
    {
      label: <Link href="/admin/status">{t("statuses")}</Link>,
      key: "33",
      icon: <GrStatusGoodSmall />,
      url: "/admin/status",
    },
  
    {
      label: <Link href="/admin/guiding-image">{t("guiding_images")}</Link>,
      key: "4.44",
      icon: <SiFoursquarecityguide />,
      url: "/admin/guiding-image",
    },
    {
      label: t("sections"),
      key: "5.5",
      icon: <RxSection />,
      url: "/",
      items: [
        {
          label: <Link href="/admin/category">{t("all_sections")}</Link>,
          key: "88",
          icon: <RxSection />,
        },
      ],
    },
    {
      label: t("sliders_section"),
      key: "4",
      icon: <AiTwotoneSliders />,
      url: "/admin/main-slider",
      items: [
        {
          label: <Link href="/admin/main-slider">{t("main_slider")}</Link>,
          key: "44",
          icon: <TfiLayoutSlider />,
        },
        {
          label: <Link href="/admin/branch-slider">{t("secondary_slider")}</Link>,
          key: "444",
          icon: <TfiLayoutSliderAlt />,
        },
      ],
    },
    {
      label: t("settings"),
      key: "8",
      icon: <IoIosSettings />,
      url: "/admin/info",
      items: [
        {
          label: <Link href="/admin/employees"> {t("employees")} </Link>,
          key: "888",
          url: "/admin/employees",
          icon: <RiAdminFill />,
        },
        {
          label: <Link href="/admin/info">{t("general_info")} </Link>,
          key: "8888",
          url: "/admin/info",
          icon: <FaInfoCircle />,
        },
      ],
    },
    {
      label: <Link href="/admin/support">{t("support")}</Link>,
      key: "9",
      icon: <BiSupport />,
      url: "/admin/support",
    },
    {
      label: <Link href="/admin/store">{t("store")}</Link>,
      key: "10",
      icon: <GrPieChart />,
      url: "/admin/store",
    },
    {
      label: <Link href="/admin/my-order">{t("my_orders")}</Link>,
      key: "11.11",
      icon: <FaFirstOrderAlt />,
      url: "/admin/my-order",
    },
  ];
   const AdminItemsOnlyCard : SidebarMenuItemTypes[] = [
    {
      label: <Link href="/admin/status">{t("statuses")}</Link>,
      key: "33",
      icon: <GrStatusGoodSmall />,
      url: "/admin/status",
    },
  
    {
      label: <Link href="/admin/guiding-image">{t("guiding_images")}</Link>,
      key: "4.44",
      icon: <SiFoursquarecityguide />,
      url: "/admin/guiding-image",
    },
    {
      label: t("sections"),
      key: "5.5",
      icon: <RxSection />,
      url: "/",
      items: [
        {
          label: <Link href="/admin/category">{t("all_sections")}</Link>,
          key: "88",
          icon: <RxSection />,
        },
      ],
    },
    {
      label: t("sliders_section"),
      key: "4",
      icon: <AiTwotoneSliders />,
      url: "/admin/main-slider",
      items: [
        {
          label: <Link href="/admin/main-slider">{t("main_slider")}</Link>,
          key: "44",
          icon: <TfiLayoutSlider />,
        },
        {
          label: <Link href="/admin/branch-slider">{t("secondary_slider")}</Link>,
          key: "444",
          icon: <TfiLayoutSliderAlt />,
        },
      ],
    },
    {
      label: <Link href="/admin/orders">{t("orders")}</Link>,
      key: "3333",
      icon: <FaBorderNone />,
      url: "/admin/orders",
    },
    {
      label: t("settings"),
      key: "8",
      icon: <IoIosSettings />,
      url: "/admin/info",
      items: [
        {
          label: <Link href="/admin/employees"> {t("employees")} </Link>,
          key: "888",
          url: "/admin/employees",
          icon: <RiAdminFill />,
        },
        {
          label: <Link href="/admin/info">{t("general_info")} </Link>,
          key: "8888",
          url: "/admin/info",
          icon: <FaInfoCircle />,
        },
      ],
    },
    {
      label: <Link href="/admin/support">{t("support")}</Link>,
      key: "9",
      icon: <BiSupport />,
      url: "/admin/support",
    },
    {
      label: <Link href="/admin/store">{t("store")}</Link>,
      key: "10",
      icon: <GrPieChart />,
      url: "/admin/store",
    },
    {
      label: <Link href="/admin/my-order">{t("my_orders")}</Link>,
      key: "11.11",
      icon: <FaFirstOrderAlt />,
      url: "/admin/my-order",
    },
  ];
  
  useEffect(() => {
    const getData = async ()=>{
      try{
        const res  = await GetInfoForCustomer();
        setCard_System(res?.data?.plan_detils_limit?.enable_cart);
        setRepair_Service_System(res?.data?.plan_detils_limit?.enable_repair_service);
      }
      catch(err){
        console.log(err)
      }
    }
    getData();
    
    setTimeout(() => {
      setHandle(true)
    }, 100);
    
  }, [])


  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8 p-5">
      {handle && (
        <>
          {card_System && repair_Service_System && (
            <>
              {AdminItems?.map((item: any) => (
                <ItemCard key={item.key} item={item} locale={locale}/>
              ))}
            </>
          )}
          {card_System && !repair_Service_System && (
            <>
              {AdminItemsOnlyCard?.map((item: any) => (
                <ItemCard key={item.key} item={item} locale={locale}/>
              ))}
            </>
          )}
          {!card_System && repair_Service_System && (
            <>
              {AdminItemsOnlyRepair?.map((item: any) => (
                <ItemCard key={item.key} item={item} locale={locale}/>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
  
}

export default HomePage;
