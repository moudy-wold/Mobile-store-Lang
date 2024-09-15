"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Popup( props:any ) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center fixed bg-[#0000007d]  z-[99999999999] -top-1/2 -left-1/2 translate-x-1/2 translate-y-1/2  w-full h-full">
      <div className="  bg-white w-1/3 h-fit rounded-lg p-5 ">
        <div className="flex items-center justify-center mb-5 ">
          <Image
            src="/assets/correct.svg"
            alt="correct"
            height={30}
            width={35}
            className="p-1 border-2 border-gray-300 rounded-md"
          />
        </div>
        <div className="">
          <p className="text-center">            
            تم تجديد إشتراككم و تفعيل  حسابكم بنجاح
          </p>
        </div>
        {/* Start Button */}
        <div>
          <button
            onClick={() => {
              props.setOpenPopup(false);
              router.push("./");
            }}
            className="mt-7 mx-auto block rounded-lg bg-[#004696] px-8 py-3 border-2 border-[#004696] text-white hover:text-[#004696] hover:bg-white transition-all duration-150"
          >
            OK
          </button>
        </div>
        {/* End Button */}
      </div>
    </div>
  );
}

export default Popup;
