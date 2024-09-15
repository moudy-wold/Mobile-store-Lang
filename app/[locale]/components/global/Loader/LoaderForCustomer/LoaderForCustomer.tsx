"use client"
import React, { useEffect, useState } from "react";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { useRouter } from "next/navigation"


export default function LoaderForCustomer() {
  
    const router = useRouter()

    useEffect(() => {
      setTimeout(() => {
        router.push("/auth/login")
        
      }, 1000);
   // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
      <div>
        <Loader />
      </div>
    )
  }