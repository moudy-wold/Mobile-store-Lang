"use client";
import Link from "next/link";
import React from "react";


function Last_14Day() {

  return (
    <div className="bg-white shadow container p-2 py-4 border-2 border-red-500 rounded-lg ">
        <span className="text-lg">
      إشتراككم على وشك الإنتهاء .... جدد إشتراكك الآن بضغطة زر
        </span>
      <Link href="/admin/info" className="mx-1 p-2 border-2 border-red-500 bg-red-500 text-white text-center rounded-lg hover:text-red-500 hover:bg-white  transition-all duration-150 ">جدد الآن </Link>
          
    </div>
  );
}

export default Last_14Day;
