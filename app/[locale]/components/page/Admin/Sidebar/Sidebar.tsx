"use client";
import React, { useState, useEffect } from "react";
import { Space, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setcategoryId } from "@/app/[locale]/lib/todosSlice";
import { usePathname } from "next/navigation";
import { GetAllCategories } from "@/app/[locale]/api/category";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { GetInfoForCustomer } from "@/app/[locale]/api/info";
import MenuItems from "../../../global/MenuItems/MenuItems";
import Image from "next/image";
import Link from "next/link";
import { SidebarMenuItemTypes } from "@/app/[locale]/api/adminpage";
import { useTranslation } from "@/app/i18n/client";
import { CiCirclePlus } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { FaInfoCircle, FaBorderNone } from "react-icons/fa";
import { BiCustomize, BiSupport } from "react-icons/bi";
import { GrStatusGoodSmall } from "react-icons/gr";
import { AiTwotoneSliders } from "react-icons/ai";
import { TfiLayoutSlider, TfiLayoutSliderAlt } from "react-icons/tfi";
import { RiAdminFill } from "react-icons/ri";
import { RxSection } from "react-icons/rx";
import { GrPieChart } from "react-icons/gr";
import { FaFirstOrderAlt } from "react-icons/fa";
import { SiFoursquarecityguide } from "react-icons/si";
import { TbCategoryFilled } from "react-icons/tb";



function Sidebar({ locale }: any) {
  const { t, i18n } = useTranslation(locale, "common");

  const dispatch = useDispatch();
  const path = usePathname();
  const isAdmin = path.includes("admin");
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedAdminItems, setUpdatedAdminItems] = useState<any[]>([]);
  const [current, setCurrent] = useState("0");
  const { infoData } = useSelector((state: any) => state.counter);
  const [openKeys, setOpenKeys] = useState<string[]>([]); // التحكم بالمفاتيح المفتوحة

  const AdminItems: SidebarMenuItemTypes[] = [
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
        {
          label: t("add_head_code"),
          key: "88888",
          url: "/",
          icon: <TbCategoryFilled />,
        },
        {
          label: t("add_body_code"),
          key: "888888",
          url: "/",
          icon: <TbCategoryFilled />,
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
      label: <Link href="/admin/talab">{t("talab")}</Link>,
      key: "10",
      icon: <GrPieChart />,
      url: "/admin/talab",
    },
    {
      label: <Link href="/admin/my-order">{t("my_orders")}</Link>,
      key: "11.11",
      icon: <FaFirstOrderAlt />,
      url: "/admin/my-order",
    },
  ];

  const AdminItemsOnlyRepair: SidebarMenuItemTypes[] = [
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
        {
          label: t("add_head_code"),
          key: "88888",
          url: "/",
          icon: <TbCategoryFilled />,
        },
        {
          label: t("add_body_code"),
          key: "888888",
          url: "/",
          icon: <TbCategoryFilled />,
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
      label: <Link href="/admin/talab">{t("talab")}</Link>,
      key: "10",
      icon: <GrPieChart />,
      url: "/admin/talab",
    },
    {
      label: <Link href="/admin/my-order">{t("my_orders")}</Link>,
      key: "11.11",
      icon: <FaFirstOrderAlt />,
      url: "/admin/my-order",
    },
  ];
  const AdminItemsOnlyCard: SidebarMenuItemTypes[] = [
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
        {
          label: t("add_head_code"),
          key: "88888",
          url: "/",
          icon: <TbCategoryFilled />,
        },
        {
          label: t("add_body_code"),
          key: "888888",
          url: "/",
          icon: <TbCategoryFilled />,
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
      label: <Link href="/admin/talab">{t("talab")}</Link>,
      key: "10",
      icon: <GrPieChart />,
      url: "/admin/talab",
    },
    {
      label: <Link href="/admin/my-order">{t("my_orders")}</Link>,
      key: "11.11",
      icon: <FaFirstOrderAlt />,
      url: "/admin/my-order",
    },
  ];

  useEffect(() => {
    setIsLoading(true);

    const getCategories = async () => {
      try {
        const res = await GetInfoForCustomer();
        let card_System = res?.data?.plan_detils_limit?.enable_cart;
        let repair_Service_System =
          res?.data?.plan_detils_limit?.enable_repair_service;

        if (card_System && repair_Service_System) {
          setUpdatedAdminItems(AdminItems);
        } else if (card_System && !repair_Service_System) {
          setUpdatedAdminItems(AdminItemsOnlyCard);
        } else if (!card_System && repair_Service_System) {
          setUpdatedAdminItems(AdminItemsOnlyRepair);
        }

        const cate = await GetAllCategories();
        setCategoryList(cate.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCategories();
  }, []);

  // const onClick: MenuProps["onClick"] = (e) => {
  //   console.log(e);
  //   setCurrent(e.key);
  //   dispatch(CloseBurgerMenu());
  // };

  // const onOpenChange = (keys: string[]) => {
  //   // تصفية المفاتيح غير المعرفة
  //   const filteredKeys = keys.filter((key) => key !== undefined);

  //   setOpenKeys(filteredKeys); // تحديث المفاتيح المفتوحة بعد التصفية
  // };

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center">
          <Space size="large">
            <Spin size="large" />
          </Space>
        </div>
      )}
      <div
        className={`${locale == "ar" ? "right-0" : "left-0"
          } fixed z-50 top-0 bg-white w-[320px] h-[100vh] overflow-auto `}
      >
        <div className="px-6 py-1">
          <div className="my-0 w-fit mx-auto">
            <Link href="/">
              <Image
                src={infoData?.data?.logo}
                width={95}
                height={159}
                alt="logo"
              />
            </Link>
          </div>
          <MenuItems
            setcategoryId={setcategoryId}
            setCurrent={setCurrent}
            setOpenKeys={setOpenKeys}
            current={current}
            updatedAdminItems={updatedAdminItems}
            categoryList={categoryList}
          />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
