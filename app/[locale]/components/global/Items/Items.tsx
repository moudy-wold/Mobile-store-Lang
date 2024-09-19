import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { BiCustomize } from 'react-icons/bi';
import { GrStatusGoodSmall } from 'react-icons/gr';
import { AiTwotoneSliders } from 'react-icons/ai';
import { TfiLayoutSlider, TfiLayoutSliderAlt } from 'react-icons/tfi';
import { FaBorderNone, FaInfoCircle } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import { RxSection } from 'react-icons/rx';
import { RiAdminFill } from 'react-icons/ri';

const AdminItems = ({card_System} :any, {repair_Service_System}:any) => {
  // const { card_System, repair_Service_System } = useSelector((state: any) => state.counter);
  // console.log(card_System,repair_Service_System)
  const filteredItems = [
    {
      label: "قسم الزبائن",
      key: "1",
      icon: <BiCustomize />,
      url: "/admin/customer",
      items: [
        {
          label: <Link href="/admin/customer/create">إضافة زبون</Link>,
          key: "11",
          icon: <BiCustomize />,
        },
        {
          label: <Link href="/admin/customer">قائمة الزبائن</Link>,
          key: "111",
          icon: <BiCustomize />,
        },
      ],
    },
    {
      label: <Link href="/admin/status">الحالات</Link>,
      key: "33",
      icon: <GrStatusGoodSmall />,
      url: "/admin/status",
    },
    {
      label: "قسم السلاديرات",
      key: "4",
      icon: <AiTwotoneSliders />,
      url: "/admin/main-slider",
      items: [
        {
          label: <Link href="/admin/main-slider">السلايدر الرئيسي</Link>,
          key: "44",
          icon: <TfiLayoutSlider />,
        },
        {
          label: <Link href="/admin/branch-slider">السلايدر الفرعي</Link>,
          key: "444",
          icon: <TfiLayoutSliderAlt />,
        },
      ],
    },
    {
      label: <Link href="/admin/orders">الطلبات</Link>,
      key: "3333",
      icon: <FaBorderNone />,
      url: "/admin/orders",
    },
    {
      label: "الإعدادات",
      key: "8",
      icon: <IoIosSettings />,
      url: "/admin/info",
      items: [
        {
          label: <Link href="/admin/category">الأقسام</Link>,
          key: "88",
          icon: <RxSection />,
        },
        {
          label: <Link href="/admin/employees"> الموظفين </Link>,
          key: "888",
          url: "/admin/employees",
          icon: <RiAdminFill />,
        },
        {
          label: <Link href="/admin/info"> المعلومات العامة</Link>,
          key: "8888",
          url: "/admin/info",
          icon: <FaInfoCircle />,
        },
      ],
    },
  ].filter(item => {
    if (item.label === "قسم الزبائن" && !repair_Service_System) return false;
    if (item.label === "السلة" && !card_System) return false;
    return true;
  });

  return filteredItems;
}

export default AdminItems;
