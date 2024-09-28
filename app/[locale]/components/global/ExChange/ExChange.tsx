"use client"
import React, { useEffect, useState } from "react";
function ExChange({locale}:LocaleProps) {

    const [data, setData] = useState()
    // useEffect(() => {
    //     const getData = async ()=>{
    //         const url = "http://api.exchangeratesapi.io/v1/latest?access_key=29cf561b15a5c53bb087b6e3aa49a581"
    //         axios.get(url)
    //         .then((res)=>{
    //                 setData(res.data)
    //         })
    //         .catch((err:any)=>{
    //             console.log(err)
    //         })
    //     }
    //     getData()        
    // },[])


    return (
        <div>            
            <div className="block ">
            <div className="flex lg:block text-left border-[1px] rounded-lg px-1 bg-gray-400 text-white text-base select-none ">
                    <p className="text-[12px] md:text-base mx-[1px] md:mx-2" >DOL: 30.30</p>
                    <p className="text-[12px] md:text-base mx-[1px] md:mx-2" >EUR: 33.40</p>
                    <p className="text-[12px] md:text-base mx-[1px] md:mx-2" >SYP: 150365</p>
                </div>
            </div>
            
        </div>
    )
}
export default ExChange;