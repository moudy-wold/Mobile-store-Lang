"use client";
import React, { useState } from "react";
import { Menu, MenuProps } from "antd";
import { BiCustomize } from "react-icons/bi";
import { RxSection } from "react-icons/rx";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";

function SideBar({ locale }: LocaleProps) {
  const { t } = useTranslation(locale, "common");
  const [current, setCurrent] = useState("0");
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const EmployeeItems: any = [
    {
      label: <Link href="/employee/customer/create">{t("add_customer")}</Link>,
      key: "1",
      url: "/employee/customer/create",
      icon: <BiCustomize />,
    },
    {
      label: <Link href="/employee/customer">{t("customer_list")}</Link>,
      key: "2",
      url: "/employee/customer",
      icon: <RxSection />,
    },
  ];

  return (
    <div>
      <div className={`right-0 fixed z-50 top-0bg-white w-[320px] h-[100vh]`}>
        <div className="px-6 py-1">
          <Menu
            onClick={onClick}
            style={{ width: 286, fontSize: "18px", fontWeight: "500" }}
            defaultOpenKeys={["sub2"]}
            selectedKeys={[current]}
            mode="inline"
            items={EmployeeItems}
          />
        </div>
      </div>
    </div>
  );
}

export default SideBar;

