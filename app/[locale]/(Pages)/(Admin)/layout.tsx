"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/[locale]/components/page/Admin/Sidebar/Sidebar";
import LoaderForCustomer from "@/app/[locale]/components/global/Loader/LoaderForCustomer/LoaderForCustomer"
import Last_14Day from "../../components/global/Last_14 Day/Last_14Day";
import { useDispatch, useSelector } from "react-redux";
import { getSupportTicket } from "@/app/[locale]/lib/services/SupportTicket";
import type { AppDispatch } from '@/app/[locale]/lib/store';
import { setClickSidbar } from "../../lib/todosSlice";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  const { day_14 , clic} = useSelector((state: any) => state.counter)
  const [isAdmin, setIsAdmin] = useState(true)

  useEffect(() => {
    const user: any = localStorage.getItem("userRole")

    if (JSON.parse(user) != "admin") {
      setIsAdmin(false)
    }
    
  }, [])
  
  useEffect(()=>{
    dispatch(getSupportTicket());
  },[setClickSidbar])

  return (
    <>
      {isAdmin ?
        <div>
          
          <div className="grid lg:grid-cols-[25%_72%] gap-3  lg-pt-0 ">          
            <div className="hidden lg:block">
              <Sidebar />
            </div>

            <div className={`${day_14 ? "" :"p-10" }`}>
              {day_14 && <Last_14Day />}
          
              {children}
            </div>
          </div>
        </div>
        :
        <div className="text-xl p-10">
          <LoaderForCustomer />
        </div>
      }
    </>
  );
}

export default AdminLayout;
