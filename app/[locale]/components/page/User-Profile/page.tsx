"use client";
import React, { useState, useEffect } from "react";
import { GetCustomerByIdForCustomer } from "@/app/[locale]/api/customer";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import { FaBorderNone, FaServicestack } from "react-icons/fa";
import { TbPasswordMobilePhone } from "react-icons/tb";
import { RiInformationFill } from "react-icons/ri";
import { useTranslation } from "@/app/i18n/client";

import dynamic from "next/dynamic";

const MyServices = dynamic(() => import("@/app/[locale]/components/page/User-Profile/MyServices/MyServices"))
const MyInfo = dynamic(() => import("./MyInfo/MyInfo"))
const MyOrder = dynamic(() => import("./MyOrder/MyOrder"))

type MenuItems = {
  label: string | React.ReactNode;
  key: string;
  icon: React.ReactNode;
  items?: MenuItems;
  tab?: string;
}[];

enum Tabs {
  MYSERVICES = "MYSERVICES",
  MYORDER = "MYORDER",
  INFO = "INFO",
}
type Props = {
  data: {
    userName: string;
    phoneNumber: string;
    role: string;
    _id: string;
    services: any[];
  }[];
};
function UserProfile({ id, services, locale }: any) {
  const { t } = useTranslation(locale, "common");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [title, setTitle] = useState<any>("MYSERVICES");
  const [current, setCurrent] = useState("1");
  const [tab, setTab] = useState<any>();
  const [data, setData] = useState<any>([]);
  const { infoData } = useSelector((state: any) => state.counter);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await GetCustomerByIdForCustomer();
        console.log(res.data)
        setData(res?.data?.data);
      } catch (err: any) {
        console.log(err);
      }
    };
    const user: any = localStorage.getItem("userRole");
    if (JSON.parse(user) == "admin" || JSON.parse(user) == "employee") {
      setTitle(itemsForAdmin[0].label);
      setCurrent(t("account_info"));
      setTab(Tabs.INFO);
      setIsAdmin(true);
      setIsEmployee(true);
    } else {
      setTab(Tabs.MYSERVICES);
      setCurrent(t("MYSERVICES"));
      getData();
    }
  }, []);

  const onClick = (item: any) => {
    setCurrent(item.key);
    setTitle(item.label);
    setTab(item.tab);
  };

  const itemsForCustomer: MenuItems = [
    {
      label: t("my_services"),
      key: "1",
      icon: <FaServicestack />,
      tab: "MYSERVICES",
    },
    {
      label: t("my_orders"),
      key: "2",
      icon: <FaBorderNone />,
      tab: "MYORDER",
    },
    {
      label: t("account_info"),
      key: "3",
      icon: <RiInformationFill />,
      tab: "INFO",
    },
  ];

  const itemsForAdmin: MenuItems = [
    {
      label: t("account_info"),
      key: "1",
      icon: <TbPasswordMobilePhone />,
      tab: "INFO",
    },
  ];

  return (
    <div className="pt-5 lg:pt-0">
      <div className="bg-white p-5 flex items-center justify-center">
        <p className="text-3xl font-medium">{title}</p>
      </div>
      <div className="">
        <div className="bg-white flex items-center w-ful lg:w-3/5">
          <Menu
            style={{
              width: "100%",
              fontSize: "18px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
            }}
            defaultOpenKeys={["sub1"]}
            selectedKeys={[current]}
            mode="inline"
            className="flex items-center [&>div]:flex"
          >
            {!isAdmin ? (
              <div className="flex items-center">
                {itemsForCustomer.map((item: any) => (
                  <div className="flex items-center " key={item.key}>
                    {item.label == Tabs.MYSERVICES &&
                    infoData?.plan_detils_limit?.enable_repair_service == 1 ? (
                      <>
                        <Menu.Item
                          onClick={() => onClick(item)}
                          className="w-full flex "
                        >
                          <div
                            className={`flex  w-full items-center hover:text-[#036499!important] ${
                              current == item.key
                                ? "text-[#036499]"
                                : "[&{sapn}]: text-[#8c8c8c] "
                            }`}
                          >
                            <span className="ml-3 text-sm lg:text-xl ">
                              {item.label}
                            </span>
                            <span className="text-xl ">{item.icon}</span>
                          </div>
                        </Menu.Item>
                      </>
                    ) : (
                      <></>
                    )}

                    <Menu.Item
                      onClick={() => onClick(item)}
                      className="w-full flex "
                    >
                      <div
                        className={`flex  w-full items-center hover:text-[#036499!important] ${
                          current == item.key
                            ? "text-[#036499]"
                            : "[&{sapn}]: text-[#8c8c8c] "
                        }`}
                      >
                        <span className="ml-3 text-sm lg:text-xl ">
                          {item.label}
                        </span>
                        <span className="text-xl ">{item.icon}</span>
                      </div>
                    </Menu.Item>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {itemsForAdmin.map((item: any) => (
                  <div key={item.key}>
                    <Menu.Item onClick={() => onClick(item)} className=" flex ">
                      <div
                        className={`flex  items-center hover:text-[#036499!important] ${
                          current == item.key
                            ? "text-[#036499]"
                            : "[&{sapn}]: text-[#8c8c8c] "
                        }`}
                      >
                        <span className="ml-3 text-sm lg:text-xl ">
                          {item.label}
                        </span>
                        <span className="text-xl ">{item.icon}</span>
                      </div>
                    </Menu.Item>
                  </div>
                ))}
              </div>
            )}
          </Menu>
        </div>

        <div className="bg-[#f6f6f6]">
          {tab == Tabs.INFO && (
            <MyInfo
              data={data}
              customer={isAdmin && isEmployee ? false : true}
            />
          )}
          {tab == Tabs.MYSERVICES && <MyServices services={data?.Services} locale={locale} />}
          {tab == Tabs.MYORDER && <MyOrder locale={locale} />}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
