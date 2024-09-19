"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {  Space, Spin, notification } from "antd";
import {
  GetAllCategories,
  GetAllCategoriesForCustomer
} from "@/app/[locale]/api/category";
import { SidebarMenuItemTypes } from "@/app/[locale]/api/adminpage";
import { LogOut } from "@/app/[locale]/api/auth";
import { GrStatusGoodSmall } from "react-icons/gr";
import { CloseBurgerMenu, setcategoryId } from "@/app/[locale]/lib/todosSlice";
import { CiMenuFries, CiLogin, CiCirclePlus } from "react-icons/ci";
import { IoMdCart, IoMdClose, IoIosSettings } from "react-icons/io";
import { FaInfoCircle, FaBorderNone } from "react-icons/fa";
import { BiCustomize, BiSupport } from "react-icons/bi";
import { AiTwotoneSliders } from "react-icons/ai";
import { TfiLayoutSlider, TfiLayoutSliderAlt } from "react-icons/tfi";
import { RiAdminFill } from "react-icons/ri";
import { BsArrowsExpandVertical } from "react-icons/bs";
import { RxSection } from "react-icons/rx";
import { MdFavorite } from "react-icons/md";
import { EmployeeItems } from "../../page/Employee/Sidebar/Sidebar";
import { GrPieChart } from "react-icons/gr";
import { FaFirstOrderAlt } from "react-icons/fa";
import MenuItems from "../MenuItems/MenuItems";
import { GetInfoForCustomer } from "@/app/[locale]/api/info";

type BurgerMenu = {
  label: string | React.ReactNode;
  key: string;
  icon: React.ReactNode;
  items?: BurgerMenu;
  url?: string;
}[];

function BurgerMenu() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { burgerMenu, card_System, repair_Service_System } = useSelector(
    (state: any) => state.counter
  );
  const path = usePathname();
  const [isLogend, setIsLogend] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<any>();
  const [categoryList, setCategoryList] = useState([]);
  const [updatedAdminItems, setUpdatedAdminItems] = useState<any[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]); // التحكم بالمفاتيح المفتوحة
  const handleClick = (section: any) => {
    localStorage.setItem("categoryId", section._id);
    dispatch(setcategoryId(section._id));
  };

  const Useritems: BurgerMenu = [
    {
      label: <Link href="/compare">المقارنة</Link>,
      key: "9",
      icon: <BsArrowsExpandVertical />
    },
    {
      label: <Link href="/wishList">المفضلة</Link>,
      key: "10",
      icon: <MdFavorite />
    },
    {
      label: <Link href="/cart">السلة</Link>,
      key: "11.1",
      icon: <IoMdCart />
    }
  ];

  const [current, setCurrent] = useState("0");
 

  const handleLogOut = () => {
    LogOut()
      .then((res) => {
        notification.success({
          message: "تم تسجيل الخروج"
        });
        localStorage.clear();
        setTimeout(() => {
          window.location.reload();
        }, 100);
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "لقد حدث خطأ"
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!path.includes("notfound") && !path.includes("update-plane")) {
      setIsLoading(true);

      const getCategoriesForAdmin = async () => {
        try{
          const res = await GetInfoForCustomer();
          let card_System = res?.data?.plan_detils_limit?.enable_cart;
          let repair_Service_System = res?.data?.plan_detils_limit?.enable_repair_service;        
  
          if (card_System && repair_Service_System) {
            setUpdatedAdminItems(AdminItems);
          } else if (card_System && !repair_Service_System) {
            setUpdatedAdminItems(AdminItemsOnlyCard);
          } else if (!card_System && repair_Service_System) {
            setUpdatedAdminItems(AdminItemsOnlyRepair);
          }
          const cate = await GetAllCategories();
          
          setCategoryList(cate?.data.data);          
          
          setIsLoading(false);
        }catch(err:any){
          console.log(err)
        }

      };

      const getCategoriesForCusomer = async () => {
        const cate = await GetAllCategoriesForCustomer();
        setCategoryList(cate?.data?.data);
     
        setIsLoading(false);
      };

      if (localStorage.getItem("userRole")) {
        setIsLogend(true);
        const userRole: any = localStorage.getItem("userRole");
        const pareUserRole = JSON.parse(userRole);

        if (pareUserRole == "admin") {
          setTimeout(() => {
            getCategoriesForAdmin();
          }, 100);
          setIsAdmin(true);
        } else if (pareUserRole == "employee") {
          setIsEmployee(true);
        } else if (pareUserRole == "customer") {
          getCategoriesForCusomer();
        }
      }

      if (localStorage.getItem("userId")) {
        const userid: any = localStorage.getItem("userId");
        const pareUserId = JSON.parse(userid);
        setUserId(pareUserId);
      }
    }
  }, [card_System, repair_Service_System]);

  let items;
  if (isAdmin) {
    items = [...updatedAdminItems];
  } else if (isEmployee) {
    items = EmployeeItems;
  } else {
    items = [...Useritems];
  }
  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center">
          <Space size="large">
            <Spin size="large" />
          </Space>
        </div>
      )}
      <div
        className={`${
          burgerMenu ? "right-0 " : "-right-[320px]"
        } fixed z-50 top-0   bg-white w-[320px] h-[100vh] transition-all duration-200`}
      >
        <div className="flex items-center justify-between p-5 bg-[#006496]">
          <div className="flex items-center justify-between  w-20">
            <CiMenuFries className="text-white text-xl mr-4 font-bold cursor-pointer" />
            <span className="text-white text-xl font-medium"> القائمة</span>
          </div>
          <div>
            <IoMdClose
              className="text-white text-xl mr-4 font-bold cursor-pointer"
              onClick={() => dispatch(CloseBurgerMenu())}
            />
          </div>
        </div>

        <div className="px-6 py-1">
          {isLogend ? (
            <div className="hover:bg-gray-100 rounded-2xl cursor-pointer px-5 py-1 flex items-center font-semibold">
              <CiLogin />
              <Link
                href={`/user-profile`}
                className="font-semibold  text-[18px]"
              >
                الملف الشخصي{" "}
              </Link>
            </div>
          ) : (
            <div className="hover:bg-gray-100 rounded-2xl cursor-pointer px-5 py-1 flex items-center font-semibold">
              <CiLogin />
              <Link
                href="/auth/login"
                className="font-semibold mx-1 text-[18px]"
              >
                {" "}
                تسجيل الدخول
              </Link>
            </div>
          )}
        

          <MenuItems
            setcategoryId={setcategoryId}
            setCurrent={setCurrent}
            setOpenKeys={setOpenKeys}
            current={current}
            updatedAdminItems={items}
            categoryList={categoryList}
          />

          {isLogend && (
            <div
              className="hover:bg-gray-100 rounded-2xl cursor-pointer px-5 py-1 flex items-center font-semibold"
              onClick={() => {
                handleLogOut();
              }}
            >
              <CiLogin className=" text-xl" />
              <span className="mr-2 font-semibold  text-[18px]">
                تسجيل الخروج
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BurgerMenu;

export const AdminItems: SidebarMenuItemTypes = [
  {
    label: "قسم الزبائن",
    key: "1",
    icon: <BiCustomize />,
    url: "/admin/customer",
    items: [
      {
        label: <Link href="/admin/customer/create">إضافة زبون</Link>,
        key: "1.1",
        icon: <CiCirclePlus />
      },
      {
        label: <Link href="/admin/customer">قائمة الزبائن</Link>,
        key: "1.2",
        icon: <BiCustomize />
      }
    ]
  },
  // {
  //   label: <Link href="/admin/message">رسائل الصفحة</Link>,
  //   key: "3",
  //   icon: <AiFillMessage />,
  //   url: "/admin/message",
  // },
  {
    label: <Link href="/admin/status">الحالات</Link>,
    key: "33",
    icon: <GrStatusGoodSmall />,
    url: "/admin/status"
  },
  {
    label: "قسم السلاديرات",
    key: "4",
    icon: <AiTwotoneSliders />,
    url: "/admin/main-slider",
    items: [
      {
        label: <Link href="/admin/main-slider">السلايدر الرئيسي</Link>,
        key: "44",
        icon: <TfiLayoutSlider />
      },
      {
        label: <Link href="/admin/branch-slider">السلايدر الفرعي</Link>,
        key: "444",
        icon: <TfiLayoutSliderAlt />
      }
    ]
  },
  {
    label: "الأقسام",
    key: "5.5",
    icon: <RxSection />,
    url: "/",
    items: [
      {
        label: <Link href="/admin/category">كل الأقسام</Link>,
        key: "88",
        icon: <RxSection />
      }
    ]
  },
  {
    label: <Link href="/admin/orders"> الطلبات</Link>,
    key: "3333",
    icon: <FaBorderNone />,
    url: "/admin/orders"
  },
  {
    label: "الإعدادات",
    key: "8",
    icon: <IoIosSettings />,
    url: "/admin/info",
    items: [
      {
        label: <Link href="/admin/employees"> الموظفين </Link>,
        key: "888",
        url: "/admin/employees",
        icon: <RiAdminFill />
      },
      {
        label: <Link href="/admin/info"> المعلومات العامة</Link>,
        key: "8888",
        url: "/admin/info",
        icon: <FaInfoCircle />
      }
    ]
  },
  {
    label: <Link href="/admin/support">الدعم</Link>,
    key: "9",
    icon: <BiSupport />,
    url: "/admin/support"
  },
  {
    label: <Link href="/admin/store">المتجر</Link>,
    key: "10",
    icon: <GrPieChart />,
    url: "/admin/store"
  },
  {
    label: <Link href="/admin/my-order">طلباتي</Link>,
    key: "11.11",
    icon: <FaFirstOrderAlt />,
    url: "/admin/my-order"
  }
];

export const AdminItemsOnlyRepair: SidebarMenuItemTypes = [
  {
    label: "قسم الزبائن",
    key: "1",
    icon: <BiCustomize />,
    url: "/admin/customer",
    items: [
      {
        label: <Link href="/admin/customer/create">إضافة زبون</Link>,
        key: "1.1",
        icon: <BiCustomize />
      },
      {
        label: <Link href="/admin/customer">قائمة الزبائن</Link>,
        key: "1.2",
        icon: <BiCustomize />
      }
    ]
  },

  {
    label: <Link href="/admin/status">الحالات</Link>,
    key: "33",
    icon: <GrStatusGoodSmall />,
    url: "/admin/status"
  },
  {
    label: "الأقسام",
    key: "5.55",
    icon: <RxSection />,
    url: "/",
    items: [
      {
        label: <Link href="/admin/category">كل الأقسام</Link>,
        key: "88",
        icon: <RxSection />
      }
    ]
  },
  {
    label: "قسم السلاديرات",
    key: "4",
    icon: <AiTwotoneSliders />,
    url: "/admin/main-slider",
    items: [
      {
        label: <Link href="/admin/main-slider">السلايدر الرئيسي</Link>,
        key: "44",
        icon: <TfiLayoutSlider />
      },
      {
        label: <Link href="/admin/branch-slider">السلايدر الفرعي</Link>,
        key: "444",
        icon: <TfiLayoutSliderAlt />
      }
    ]
  },
  {
    label: "الإعدادات",
    key: "8",
    icon: <IoIosSettings />,
    url: "/admin/info",
    items: [
      {
        label: <Link href="/admin/employees"> الموظفين </Link>,
        key: "888",
        url: "/admin/employees",
        icon: <RiAdminFill />
      },
      {
        label: <Link href="/admin/info"> المعلومات العامة</Link>,
        key: "8888",
        url: "/admin/info",
        icon: <FaInfoCircle />
      }
    ]
  },
  {
    label: <Link href="/admin/support">الدعم</Link>,
    key: "9",
    icon: <BiSupport />,
    url: "/admin/support"
  },
  {
    label: <Link href="/admin/store">المتجر</Link>,
    key: "10",
    icon: <GrPieChart />,
    url: "/admin/store"
  },
  {
    label: <Link href="/admin/my-order">طلباتي</Link>,
    key: "11.111",
    icon: <FaFirstOrderAlt />,
    url: "/admin/my-order"
  }
];

export const AdminItemsOnlyCard: SidebarMenuItemTypes = [
  {
    label: <Link href="/admin/status">الحالات</Link>,
    key: "33",
    icon: <GrStatusGoodSmall />,
    url: "/admin/status"
  },
  {
    label: "الأقسام",
    key: "5",
    icon: <RxSection />,
    url: "/",
    items: [
      {
        label: <Link href="/admin/category">كل الأقسام</Link>,
        key: "88",
        icon: <RxSection />
      }
    ]
  },
  {
    label: "قسم السلاديرات",
    key: "4",
    icon: <AiTwotoneSliders />,
    url: "/admin/main-slider",
    items: [
      {
        label: <Link href="/admin/main-slider">السلايدر الرئيسي</Link>,
        key: "44",
        icon: <TfiLayoutSlider />
      },
      {
        label: <Link href="/admin/branch-slider">السلايدر الفرعي</Link>,
        key: "444",
        icon: <TfiLayoutSliderAlt />
      }
    ]
  },
  {
    label: <Link href="/admin/orders">الطلبات</Link>,
    key: "3333",
    icon: <FaBorderNone />,
    url: "/admin/orders"
  },
  {
    label: "الإعدادات",
    key: "8",
    icon: <IoIosSettings />,
    url: "/admin/info",
    items: [
      {
        label: <Link href="/admin/employees"> الموظفين </Link>,
        key: "888",
        url: "/admin/employees",
        icon: <RiAdminFill />
      },
      {
        label: <Link href="/admin/info"> المعلومات العامة</Link>,
        key: "8888",
        url: "/admin/info",
        icon: <FaInfoCircle />
      }
    ]
  },
  {
    label: <Link href="/admin/support">الدعم</Link>,
    key: "9",
    icon: <BiSupport />,
    url: "/admin/support"
  },
  {
    label: <Link href="/admin/store">المتجر</Link>,
    key: "10",
    icon: <GrPieChart />,
    url: "/admin/store"
  },
  {
    label: <Link href="/admin/my-order">طلباتي</Link>,
    key: "11.111111",
    icon: <FaFirstOrderAlt />,
    url: "/admin/my-order"
  }
];
