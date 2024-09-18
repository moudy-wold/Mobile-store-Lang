"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from 'react-redux'
import  {AdminItems, AdminItemsOnlyRepair, AdminItemsOnlyCard}  from "@/app/[locale]/components/global/BurgerMenu/BurgerMenu";
import {GetInfoForCustomer} from "@/app/[locale]/api/info"
import ItemCard from "@/app/[locale]/components/page/Admin/ItemCard/ItemCard";

function Admin() {    
  const [handle, setHandle] = useState(false);
  const [card_System ,setCard_System] = useState(true)
  const [repair_Service_System ,setRepair_Service_System] = useState(false)
  useEffect(() => {
    const getData = async ()=>{
      try{
        const res  = await GetInfoForCustomer();
        setCard_System(res?.data?.plan_detils_limit?.enable_cart);
        setRepair_Service_System(res?.data?.plan_detils_limit?.enable_repair_service);
      }
      catch(err){
        console.log(err)
      }
    }
    getData();
    
    setTimeout(() => {
      setHandle(true)
    }, 100);
    
  }, [])


  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8 p-5">
      {handle && (
        <>
          {card_System && repair_Service_System && (
            <>
              {AdminItems?.map((item: any) => (
                <ItemCard key={item.key} item={item} />
              ))}
            </>
          )}
          {card_System && !repair_Service_System && (
            <>
              {AdminItemsOnlyCard?.map((item: any) => (
                <ItemCard key={item.key} item={item} />
              ))}
            </>
          )}
          {!card_System && repair_Service_System && (
            <>
              {AdminItemsOnlyRepair?.map((item: any) => (
                <ItemCard key={item.key} item={item} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
  
}

export default Admin;
