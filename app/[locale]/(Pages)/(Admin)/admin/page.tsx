"use client"
import React, { useEffect, useState } from "react";
import { AdminItems } from "@/app/[locale]/components/global/BurgerMenu/BurgerMenu"
import Link from "next/link";

function Admin() {
  const [handle, setHandle] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setHandle(true)
    }, 100);
  }, [])

  return (
    <div className=" grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8 p-5">
      {handle && <>
        {AdminItems.map((item: any) => (
          <div key={item.key} className="border-2 border-gray-300 rounded-3xl p-2  hover:scale-110 relative z-10 transition-all duration-200 flex flex-row items-center justify-center">
            <Link href={item.url} >
              <div className="w-fit mx-auto">{item.icon}</div>
              <div className="w-fit mx-auto">{item.label}</div>
            </Link>
          </div>
        ))}
      </>}
    </div>
  );
}

export default Admin;
