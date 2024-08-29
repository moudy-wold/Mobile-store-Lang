"use client"
import React, { useState, useEffect } from "react";
import { Space, Spin, Menu, MenuProps } from 'antd';
import Link from "next/link"
import { useDispatch, useSelector } from 'react-redux'
import { CloseBurgerMenu, setcategoryId } from "@/app/[locale]/lib/todosSlice";
import { usePathname } from "next/navigation";
import  {AdminItems, AdminItemsOnlyRepair, AdminItemsOnlyCard}  from "@/app/[locale]/components/global/BurgerMenu/BurgerMenu";
import { GetAllCategories } from "@/app/[locale]/api/category";
import { RxSection } from "react-icons/rx";
import { TbJumpRope } from "react-icons/tb";
import Loader from "@/app/[locale]/components/global/Loader/Loader"
import {GetInfoForCustomer} from "@/app/[locale]/api/info"
type BurgerMenu = {
  label: string | React.ReactNode,
  key: string,
  icon: React.ReactNode,
  children?: BurgerMenu,
  url?: string
}[]
function Sidebar() {

  const dispatch = useDispatch()  
  const path = usePathname()
  const isAdmin = path.includes("admin");
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedAdminItems, setUpdatedAdminItems] = useState<any[]>([])
  const [current, setCurrent] = useState('0');  

  const handleClick = (category: any) => {    
    localStorage.setItem("categoryId", category._id);
    dispatch(setcategoryId(category._id))
  }

  useEffect(() => {
    setIsLoading(true)
   
    const getCategories = async () => {
      const res = await GetInfoForCustomer()
      let card_System = res?.data?.plan_detils_limit?.enable_cart;
        let repair_Service_System = res?.data?.plan_detils_limit?.enable_repair_service;
        let array :any  = [];
        if(card_System && repair_Service_System){
          array= AdminItems
        }else if(card_System && !repair_Service_System){
            array= AdminItemsOnlyCard
        }else if (!card_System && repair_Service_System){
          array= AdminItemsOnlyRepair
        }
      const data = await GetAllCategories();
      
      
      setCategoryList(data.data.data)
      let arr: any = {
        label: "الأقسام",
        key: "5",
        icon: <RxSection />,
        children: []
      }
      data.data.data.forEach((category: any) => {
        arr.children.push({
          label: <Link href={`/admin/category/${category.name}`} onClick={() => { handleClick(category) }}>{category.name}</Link>,
          key: category._id,
          icon: <TbJumpRope />,
          url: `/admin/category/${category.name}`,
        })
      })
      const insertIndex = Math.floor(array.length / 2);
      const firstHalf = array.slice(0, insertIndex);
      const secondHalf = array.slice(insertIndex);
      setUpdatedAdminItems([...firstHalf, arr, ...secondHalf])
      setIsLoading(false)
    
    }
     
    
      getCategories()
     
      
   
  }, [])

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    dispatch(CloseBurgerMenu());
  };

  return (
    <>
      {isLoading &&
        <div className="flex items-center justify-center">
           <Space size="large">
          <Spin size="large" />
        </Space></div>
      }
      <div className={`right-0 fixed z-50 top-0bg-white w-[320px] h-[100vh]`}>
        <div className="px-6 py-1">
          <Menu
            onClick={onClick}
            style={{ width: 286, fontSize: "18px", fontWeight: "500" }}
            defaultOpenKeys={['sub1']}
            selectedKeys={[current]}
            mode="inline"
            items={updatedAdminItems}
          />
        </div>
      </div>
    </>
  )
}


export default Sidebar