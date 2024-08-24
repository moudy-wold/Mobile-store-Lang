"use client"
import React, { useState, useEffect } from "react";
import { Space, Spin, Menu, MenuProps } from 'antd';
import Link from "next/link"
import { useDispatch, useSelector } from 'react-redux'
import { CloseBurgerMenu, setcategoryId } from "@/app/[locale]/lib/todosSlice";
import { usePathname } from "next/navigation";
import { AdminItems } from "@/app/[locale]/components/global/BurgerMenu/BurgerMenu";
import { GetAllCategories } from "@/app/[locale]/api/category";
import { RxSection } from "react-icons/rx";
import { TbJumpRope } from "react-icons/tb";
import Loader from "@/app/[locale]/components/global/Loader/Loader"
type BurgerMenu = {
  label: string | React.ReactNode,
  key: string,
  icon: React.ReactNode,
  children?: BurgerMenu,
  url?: string
}[]
function Sidebar() {

  const dispatch = useDispatch()
  const burgerMenu = useSelector((state: any) => state.counter.burgerMenu)
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
      const data = await GetAllCategories()
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
      const insertIndex = Math.floor(AdminItems.length / 2);
      const firstHalf = AdminItems.slice(0, insertIndex);
      const secondHalf = AdminItems.slice(insertIndex);
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