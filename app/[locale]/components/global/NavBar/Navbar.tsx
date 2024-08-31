"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchProducts from "../Search/SearchProducts/SearchProducts";
import UserIcons from "../../page/Header/UserIcons";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { openBurgerMenu } from '@/app/[locale]/lib/todosSlice'
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from '@/app/[locale]/lib/store';
import { GrUserAdmin } from "react-icons/gr";
import { usePathname } from "next/navigation"
import { IoMdClose } from "react-icons/io";
import ExChange from "../ExChange/ExChange";
import { getAllCategories } from "@/app/[locale]/lib/services/Categories";
import { getInfoRedux } from "@/app/[locale]/lib/services/Info";
import  AdminItems  from "../Items/Items";
 


function Navbar() {

  const path = usePathname()
  const adminPage = path.includes("admin")
  const employeePage = path.includes("employee")
  const [openSearch, setOpenSearch] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)
  const [isEmployee, setIsEmployee] = useState(false)
  const dispatch = useDispatch<AppDispatch>();
  const { infoData , card_System, repair_Service_System} = useSelector((state: any) => state.counter)

  
  useEffect(() => {
    
    if(!path.includes("notfound") && !path.includes("update-plane") ) {

      const user = localStorage.getItem("userRole")
      if (user != undefined) {
        if (JSON.parse(user) == "admin") {
          setIsAdmin(true)
        } else if (JSON.parse(user) == "employee") {
          setIsEmployee(true)
        }
      }
      dispatch(getAllCategories());
      dispatch(getInfoRedux());
    }
 
  }, [])

  return (
    <>
      <main className={`${!path.includes("notfound") && !path.includes("update-plane")  && "lg:container py-1 lg:py-6"}`}>
      
          {!path.includes("notfound") && !path.includes("update-plane") && <>
        {/* Start Burger Menu */}
        <div className={`lg:hidden grid grid-cols-[78%_20%]  items-center `}>
          <div className=" flex">
            <div className="mx-5">
              <GiHamburgerMenu
                className="text-3xl"
                onClick={() => { dispatch(openBurgerMenu()); }}
              />
            </div>
            <div className="mr-3 relative flex items-center  w-4/5 !z-50">
              {openSearch ? <>
                <IoMdClose className=" text-xl cursor-pointer "
                  onClick={() => setOpenSearch(!openSearch)}
                />
              </> : <>
                <CiSearch
                  className=" text-xl cursor-pointer "
                  onClick={() => setOpenSearch(!openSearch)}
                />
              </>}
              {openSearch && <div className={`${openSearch ? " right-0  " : " -right-[300px"} absolute !z-50 top-0  mr-5  transition-all duration-200 w-4/5`}> <SearchProducts /></div>}
              <div className="mx-auto">
                <ExChange />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            {isAdmin &&
              <>
                {!adminPage &&
                  <div className="">
                    <Link href="/admin">
                      <GrUserAdmin
                        className="text-3xl cursor-pointer "
                      />
                    </Link>
                  </div>
                }
              </>
            }
            {isEmployee &&
              <>
                {!employeePage &&
                  <div className="">
                    <Link href="/employee">
                      <GrUserAdmin
                        className="text-3xl cursor-pointer "
                      />
                    </Link>
                  </div>
                }
              </>
            }
            <div className="mr-4">
              <Link href="/">
                <Image src={infoData?.data?.logo != null ? infoData?.data?.logo : ""} height={100} width={137} alt="Logo" />
              </Link>
            </div>
          </div>

        </div>
        {/* End Burger Menu */}

        {/* Start Lg Screen */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Start Logo */}
          <div className="flex items-center ">
            <ExChange />
            <Link href="/" className="mr-2">
              <Image src={infoData?.data?.logo != null ? infoData?.data?.logo : ""} height={154} width={154} alt="Logo" />
            </Link>
          </div>
          {/* End Logo */}

          {/* Start Search */}
          <div className="w-96">
            <SearchProducts />
          </div>
          {/* End Search */}

          {/* Start User Icons */}
          <div className="w-fit">
            <UserIcons />
          </div>
          {/* End User Icons */}
        </div>
        {/* ENd Lg Screen */}
        </>}
      </main >

    </>
  );
}

export default Navbar;
