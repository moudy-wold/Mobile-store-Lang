"use client"
import React, { useEffect, useState } from "react";
import { EmployeeItems } from "@/app/[locale]/components/page/Employee/Sidebar/Sidebar"
import Link from "next/link";
import {useRouter} from "next/navigation";

function Page() {
  const [handle, setHandle] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      setHandle(true)
    }, 100);
  }, [])
const handleLink = (url:string)=>{
  router.push(url)
}
  return (
    <div className=" grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8 p-5">
      {handle && <>
        {EmployeeItems.map((item: any) => (
          <div key={item.key} className="border-2 border-gray-300 rounded-3xl p-2  hover:scale-110 relative z-10 transition-all duration-200 flex flex-row items-center justify-center">
             
              <div  onClick={()=>handleLink(item.url)} className="w-full text-center">
                <p className="w-fit mx-auto">{item.icon}</p>
                <p className="w-fit mx-auto">{item.label}</p>
              </div>
            
          </div>
        ))}
      </>}
    </div>
  );
}

export default Page;
