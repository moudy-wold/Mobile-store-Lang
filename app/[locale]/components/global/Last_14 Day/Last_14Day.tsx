"use client";
import Link from "next/link";
import React  from "react";
import Marquee from "react-fast-marquee";
 

function SecoundNavbar() {
  const data = [
    { id: "1", label: "dfvevfsav" },
    { id: "2", label: "twe4rgywe" },
    { id: "3", label: "astyhds" },
    { id: "4", label: "asd" },
    { id: "5", label: "asdad" },
    { id: "6", label: "aasd" },
    { id: "7", label: "aasdsd" },
    { id: "8", label: "asd" },
    { id: "9", label: "23543 2qrfc" },
    { id: "11", label: "asvgrerg" },
    { id: "12", label: "cxv" },
    { id: "13", label: "bnrt" },
    { id: "14", label: "t r" },
    { id: "15", label: "qwdsfw aefae" },
    { id: "16", label: "asd" },
    { id: "17", label: "234" },
    { id: "18", label: "sdf2 q322" },
    { id: "19", label: "ghf" },
    { id: "20", label: "sadfsadfsd fd" },
    { id: "21", label: "asd" },
    { id: "22", label: "fb" },
    { id: "23", label: "sdfqe 23 423" },
    { id: "24", label: "asd" },
  ];
  return (
    <div className="bg-white shadow container ">                      
           <div className="bg-white shadow">
      <div className="container bg-white grid grid-cols-[23%_77%] py-2 ">
        <div className="flex items-center justify-between py-3">
          <div className="text-center text-[#5e5e5e] text-sm ">
            مؤشر السوق الرئيسية (تاسي)
          </div>
          <div className="bg-mold text-white rounded-3xl  relative flex items-center justify-center w-24 py-[2px] pb-1">
            <span className="">Tasi</span>
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 bg-white p-1 cursor-pointer rounded-full">
             s
            </div>
          </div>
        </div>
        <div className="flex items-center ">
          <Marquee className="w-full" pauseOnHover={true}  >
            {data.map((item: { id: string; label: string }) => (
              <>
                <Link href={`stock/${item.id}`} className="mx-4 text-xs">
                  {item.label}
                </Link>
              </>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
    </div>
  );
}

export default SecoundNavbar;
