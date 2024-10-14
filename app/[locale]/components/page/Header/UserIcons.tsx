import React, { useEffect, useState } from "react";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { usePathname, useRouter } from "next/navigation";
import { BsArrowsExpandVertical } from "react-icons/bs";
import { IoMdCart } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { LogOut } from "@/app/[locale]/api/auth";
import { Modal, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "@/app/i18n/client";
import { setIsLogend} from "@/app//[locale]/lib/todosSlice";
function UserIcons({ locale }: LocaleProps) {
  const { t } = useTranslation(locale, "common");
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [id, setId] = useState("");
  const [openLogOut ,setOpenLogOut] = useState(false);
  const [isLoggend, setIsLoggend] = useState<any>();
  const [wishListLength, setWishListLength] = useState<any>();
  const {
    infoData,
    changeWishListStatus,
    islogendRedux,
    thereIsCopmare,
  } = useSelector((state: any) => state.counter);

  useEffect(() => {
    const user: any = localStorage.getItem("userRole");
    const idd: any = localStorage.getItem("userId");
    if (user != undefined) {
      if (JSON.parse(user) == "admin") {
        setIsAdmin(true);
      } else if (JSON.parse(user) == "employee") {
        setIsEmployee(true);
      }
      setIsLoggend(true);
    }

    if (idd != undefined) {
      setId(JSON.parse(idd));
    }

    // const user_WishList = localStorage.getItem('userWishList');
    //  setWishListLength( user_WishList ? JSON.parse(user_WishList).length : 0)
    const user_WishList = localStorage.getItem("userWishList");
    let wishListLength = 0;

    if (user_WishList) {
      try {
        const parsedWishList = JSON.parse(user_WishList);
        if (Array.isArray(parsedWishList)) {
          wishListLength = parsedWishList.length;
        }
      } catch (e) {
        // console.error("Error parsing JSON from localStorage:", e);
      }
    }

    setWishListLength(wishListLength);
  }, [changeWishListStatus, islogendRedux]);

  const handleLogOut = async() => {
    setIsLoading(true);
    try{
      
       const res = await LogOut();
        notification.success({
          message: t("logout_success"),
        });
        
        dispatch(setIsLogend());
        localStorage.clear();
        setTimeout(() => {
          window.location.reload();
        }, 100);
        router.push("/");
         
    }     
      catch(err:any)  {
        console.log(err)
        notification.error({
          message: err.response.data.message,
        });
      }
      finally{
        setIsLoading(false);
        setOpenLogOut(false)
      };
  };
  const items = [
    {
      label: t("profile"),
      key: "1",
      icon: <FaUserAlt className=" text-sm text-[#8c8c8c]" />,
      url: `/user-profile`,
    },
    {
      label: t("logout"),
      key: "2",
      icon: <CiLogin className=" text-xl text-[#8c8c8c]" />,
    },
  ];
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <main className="w-[320px]">
      {isLoading && <Loader />}
      <div className="flex items-center justify-between">
        <div className="w-16 felx flex-col justify-center items-center relative  !z-[99999999] hover:scale-110 transition-all duration-200 ">
          {isLoggend ? (
            <>
              <div
                className="flex items-center flex-col relative cursor-pointer mt-[2px]"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <FaUserAlt className=" text-xl text-[#8c8c8c]" />
                <span className=" hidden lg:block text-sm mt-[2px] text-center">
                  {t("profile")}
                </span>

                <ul
                  className={`absolute  !z-[99999999] top-[70px] -left-[39px] w-36 p-2 px-4 bg-gray-200 rounded-md  transition-all duration-300  before:block before:absolute before:border-8 before:border-t-transparent before:border-r-transparent before:border-b-[#f1f1f1] before:border-l-transparent before:-top-[15px] before:right-[46%] ${
                    isHovered ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  {items.map((item) => (
                    <li
                      key={item.key}
                      className=" border-b-2 border-[#006496]  py-3 px-1 cursor-pointer transition-all duration-200 hover:scale-105 "
                    >
                      {item.url ? (
                        <Link
                          href={`${item.url}`}
                          className=" flex items-center justify-center"
                        >
                          {item.icon}
                          <span className="mr-2 text-xs text-[#8c8c8c]">
                            {item.label}
                          </span>
                        </Link>
                      ) : (
                        <div
                          className=" flex items-center justify-center"
                          onClick={() => {
                            setOpenLogOut(true);
                          }}
                        >
                          {item.icon}
                          <span className="mr-2 text-xs text-[#8c8c8c]">
                            {item.label}
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="ml-1">
              <Link href="/auth/login" className="flex flex-col items-center">
                <FaUserAlt className=" text-xl text-[#8c8c8c]" />
                <span className=" hidden lg:block mt-[4px] text-center text-sm">
                  {t("login")}
                </span>
              </Link>
            </div>
          )}
        </div>
        {!isAdmin && !isEmployee && (
          <div className="w-16 flex items-center justify-center flex-col relative mr-2  hover:scale-110 transition-all duration-200 ">
            <span className="text-[11px] absolute -top-[2px] left-[20%] bg-[#006496] text-white rounded-lg p-[2px] px-[6px]">
              {wishListLength}
            </span>
            <Link
              href="/wishList"
              className="cursor-pointer flex flex-col items-center justify-center "
            >
              <MdFavorite className="w-7 h-7 text-[#8c8c8c]" />
              <p className="hidden lg:block text-sm text-center">
                {t("wishlist_items")}
              </p>
            </Link>
          </div>
        )}
        {!isAdmin && !isEmployee &&infoData?.plan_detils_limit?.enable_cart == "1" && (
          <div className="mr-2 hover:scale-110 transition-all duration-200 ">
            <Link
              href={`/cart`}
              className="flex !flex-col justify-center items-center "
            >
              <IoMdCart className="text-xl cursor-pointer text-[#8c8c8c]" />
              <p className="hidden lg:block mt-1 text-center text-sm">{t("cart")}</p>
            </Link>
          </div>
        )}
        {isAdmin && !isEmployee && (
          <div className="mr-2 hover:scale-110 transition-all duration-200 ">
            <Link
              href={`/admin/cart`}
              className="flex !flex-col justify-center items-center "
            >
              <IoMdCart className="text-xl cursor-pointer text-[#8c8c8c]" />
              <p className="hidden lg:block mt-1 text-center text-sm">{t("cart")}</p>
            </Link>
          </div>
        )}

        {isAdmin || isEmployee ? (
          <div className="mr-2 hover:scale-110 transition-all duration-200 ">
            <Link
              href={`${isAdmin ? "/admin" : "/employee"}`}
              className="flex !flex-col justify-center items-center "
            >
              <GrUserAdmin className="text-xl cursor-pointer text-[#8c8c8c]" />
              <p className="hidden lg:block mt-1 text-sm text-center">
                {t("dash_board")}
              </p>
            </Link>
          </div>
        ) : (
          ""
        )}
        {thereIsCopmare && (
          <div className="mr-2 hover:scale-110 transition-all duration-200 ">
            <Link
              href="/compare"
              className="flex !flex-col justify-center items-center "
            >
              <BsArrowsExpandVertical className="text-xl cursor-pointer text-[#8c8c8c]" />
              <p className="hidden lg:block mt-1 text-center text-sm">
                {t("comparison")}
              </p>
            </Link>
          </div>
        )}
        {/* <div className="mr-2 hover:scale-110 transition-all duration-200 ">
          <Link href="/imeiCheck" className="flex !flex-col justify-center items-center ">
            <SlMagnifier
              className="text-xl cursor-pointer text-[#8c8c8c]"
            />
            <p className="hidden lg:block mt-1 text-center text-sm">فحص الإيمي</p>
          </Link>
        </div> */}

        
      </div>
      <Modal
        title={t("do_you_want_log_out")}
        centered
        open={openLogOut}
        onOk={() => {handleLogOut()}}
        okButtonProps={{ style: { backgroundColor: '#4096ff' } }}
        onCancel={() => { setOpenLogOut(false); }}
        width={400}
      />
    </main>
  );
}

export default UserIcons;
