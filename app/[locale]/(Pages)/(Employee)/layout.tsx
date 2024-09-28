"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "@/app/[locale]/components/page/Employee/Sidebar/Sidebar";
import LoaderForCustomer from "@/app/[locale]/components/global/Loader/LoaderForCustomer/LoaderForCustomer";

interface RootLayoutProps {
  params: {
    locale: string;
  };
  children: ReactNode;
}

export default async function EmployeeLayout({
  params: { locale },
  children,
}: RootLayoutProps) {
  const [isEmployee, setIsEmployee] = useState(true);

  useEffect(() => {
    const user: any = localStorage.getItem("userRole");

    if (JSON.parse(user) != "employee") {
      setIsEmployee(false);
    }
  }, []);

  return (
    <>
      {isEmployee ? (
        <div className="grid lg:grid-cols-[25%_72%] gap-3  lg-pt-0 ">
          <div className="hidden lg:block">
            <Sidebar  locale={locale} />
          </div>

          <div className="pt-10">{children}</div>
        </div>
      ) : (
        <div className="text-xl p-10">
          <LoaderForCustomer />
        </div>
      )}
    </>
  );
}
