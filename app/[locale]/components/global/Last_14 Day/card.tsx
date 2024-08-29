    "use client";
import Link from "next/link";
import React  from "react";

function Car() {
 
 
  return (
    <div className="ml-2">                      
                    
              إشتراككم على وشك الإنتهاء .... جدد إشتراكك الآن بضغطة زر                
            
          
              <Link href="/admin/info" className="mx-1 px-2 bg-red-500 text-white text-center rounded-lg  ">جدد الآن </Link>

        
       
    </div>
  );
}

export default Car;
