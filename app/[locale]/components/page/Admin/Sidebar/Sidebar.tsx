"use client";
import React, { useState, useEffect, Fragment } from "react";
import { Space, Spin, Menu, MenuProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setcategoryId } from "@/app/[locale]/lib/todosSlice";
import { usePathname } from "next/navigation";
import {
  AdminItems,
  AdminItemsOnlyRepair,
  AdminItemsOnlyCard,
} from "@/app/[locale]/components/global/BurgerMenu/BurgerMenu";
import { GetAllCategories } from "@/app/[locale]/api/category";
import { RxSection } from "react-icons/rx";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { GetInfoForCustomer } from "@/app/[locale]/api/info";
import MenuItems from "../../../global/MenuItems/MenuItems";
import Image from "next/image";
import Link from "next/link";

type BurgerMenu = {
  label: string | React.ReactNode;
  key: string;
  icon: React.ReactNode;
  items?: BurgerMenu;
  url?: string;
}[];
function Sidebar({ locale }: any) {
  const dispatch = useDispatch();
  const path = usePathname();
  const isAdmin = path.includes("admin");
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedAdminItems, setUpdatedAdminItems] = useState<any[]>([]);
  const [current, setCurrent] = useState("0");
  const { infoData } = useSelector((state: any) => state.counter);

  const [openKeys, setOpenKeys] = useState<string[]>([]); // التحكم بالمفاتيح المفتوحة

  // const handleClick = (category: any) => {
  //   localStorage.setItem("categoryId", category._id);
  //   dispatch(setcategoryId(category._id));
  // };

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
        className={`${
          locale == "ar" ? "right-0" : "left-0"
        } fixed z-50 top-0 bg-white w-[320px] h-[100vh] overflow-auto `}
      >
        <div className="px-6 py-1">
          <div className="my-10 w-fit mx-auto">
            <Link href="/">
              <Image
                src={infoData?.data?.logo}
                width={95}
                height={159}
                alt="logo"
              />
            </Link>
          </div>
          {/* <Menu onOpenChange={onOpenChange}  mode="inline">
            {updatedAdminItems?.map((item: any, index: number) => (
              <Fragment key={index}>
                {item?.items?.length > 0 ? (
                  <Menu.SubMenu
                    key={item.key}
                    title={
                      <div className="flex items-center">
                        <span className="ml-3 text-sm lg:text-xl">
                          {item.label}
                        </span>
                        <span className="text-xl">
                          <RxSection />
                        </span>
                      </div>
                    }
                  >
                    {item.items &&
                      item.items.map((child: any) => (
                        <Menu.Item key={child.key}>
                          <div
                            className={`flex  w-full items-center hover:text-[#036499!important] ${
                              current == child.key
                                ? "text-[#036499]"
                                : "[&{sapn}]: text-[#000] "
                            }`}
                          >
                            <span className="ml-3 text-sm lg:text-xl ">
                              {child.label}
                            </span>
                            <span className="text-xl ">{child.icon}</span>
                          </div>
                        </Menu.Item>
                      ))}
                    {item.label == "الأقسام" && (
                      <>
                        {categoryList &&
                          categoryList.map((child: any) => (
                            <Menu.Item key={child._id}>
                              <div
                                onClick={() => {
                                  handleClick(child);
                                }}
                                className={`flex  w-full items-center hover:text-[#036499!important] ${
                                  current == child.key
                                    ? "text-[#036499]"
                                    : "[&{sapn}]: text-[#000] "
                                }`}
                              >
                                <span className="ml-3 text-sm lg:text-xl ">
                                  {child.title}
                                </span>
                                <span className="text-xl ">{child.icon}</span>
                              </div>
                            </Menu.Item>
                          ))}
                      </>
                    )}
                  </Menu.SubMenu>
                ) : (
                  <div className="flex items-center " key={item.key}>
                    {item?.url?.includes("support") ||
                    item?.url?.includes("orders") ? (
                      <Menu.Item
                        onClick={() => onClick(item)}
                        className={`w-full flex ${
                          current == item.key ? "text-[#e6f4ff]" : "!bg-white "
                        } `}
                      >
                        <div
                          className={`flex w-full items-center justify-between hover:text-[#036499!important] ${
                            current == item.key
                              ? "text-[#036499]"
                              : "[&{sapn}]: text-[#000] "
                          }`}
                        >
                          <div className="flex items-center ">
                            <span className="ml-3 text-sm lg:text-xl ">
                              {item.label}
                            </span>
                            <span className="text-xl ">{item.icon}</span>
                          </div>
                          <div
                            className={`flex items-center justify-center  rounded-lg mx-4 h-8 px-2 border-2 border-red-500 
                              ${
                                item?.url?.includes("support") &&
                                (unReadMeessage == 0
                                  ? " text-red-500 bg-white"
                                  : "text-white bg-red-500")
                              } 
                            ${
                              item?.url?.includes("orders") &&
                              (unReadORder == 0
                                ? "text-red-500 bg-white"
                                : "text-white bg-red-500")
                            } `}
                          >
                            {item?.url?.includes("support") && unReadMeessage}
                            {item?.url?.includes("orders") && unReadORder}
                          </div>
                        </div>
                      </Menu.Item>
                    ) : (
                      <Menu.Item
                        onClick={() => onClick(item)}
                        className={`w-full flex ${
                          current == item.key ? "text-[#e6f4ff]" : "!bg-white "
                        } `}
                      >
                        <div
                          className={`flex  w-full items-center hover:text-[#036499!important] ${
                            current == item.key
                              ? "text-[#036499]"
                              : "[&{sapn}]: text-[#000] "
                          }`}
                        >
                          <span className="ml-3 text-sm lg:text-xl ">
                            {item.label}
                          </span>
                          <span className="text-xl ">{item.icon}</span>
                        </div>
                      </Menu.Item>
                    )}
                  </div>
                )}
              </Fragment>
            ))}
          </Menu> */}
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
