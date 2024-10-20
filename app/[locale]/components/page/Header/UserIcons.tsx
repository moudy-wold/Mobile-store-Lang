import React, { useEffect, useState } from "react";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "@/app/[locale]/api/auth";
import { GetAllNotifications } from "@/app/[locale]/api/notifications";
import { setIsLogend } from "@/app//[locale]/lib/todosSlice";
import { ConfigProvider, Modal, notification, Pagination, Space, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "@/app/i18n/client";
import { FaUserAlt } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { BsArrowsExpandVertical } from "react-icons/bs";
import { IoIosNotificationsOff, IoMdCart } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { SetNotoficationAsReadById, SetAllNotoficationAsRead } from "@/app/[locale]/api/notifications"
function UserIcons({ locale }: LocaleProps) {
  const { t } = useTranslation(locale, "common");
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForPagination, setIsLoadingForPagination] = useState(false)
  const [isLoadingOnNotificationAsRead, setIsLoadingOnNotificationAsRead] = useState(false)
  const [isLoadingOnAllNotificationAsRead, setIsLoadingOnAllNotificationAsRead] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [id, setId] = useState("");
  const [openLogOut, setOpenLogOut] = useState(false);
  const [isLoggend, setIsLoggend] = useState<any>();
  const [wishListLength, setWishListLength] = useState<any>();
  const [notificationsLength, setNotificationsLength] = useState<any>(0);
  const {
    infoData,
    changeWishListStatus,
    islogendRedux,
    thereIsCopmare,
  } = useSelector((state: any) => state.counter);

  // Fetch Data In First 
  const getNotificationData = async () => {
    try {
      const res = await GetAllNotifications(1);
      console.log(res.data)
      setTotalItems(res.data.pagination.total);
      setPageSize(res.data.pagination.per_page);
      setNotificatioItems(res?.data?.data)
      setNotificationsLength(res.data.data[0].unread_count)
    } catch (err: any) {
      console.log(err)
    }
  }

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
      getNotificationData();
    }

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


  const handleLogOut = async () => {
    setIsLoading(true);
    try {

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
    catch (err: any) {
      console.log(err)
      notification.error({
        message: err.response.data.message,
      });
    }
    finally {
      setIsLoading(false);
      setOpenLogOut(false)
    };
  };

  const profile_items = [
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

  const [isHoveredOnProfileIcon, setIssHoveredOnProfileIcon] = useState(false);
  const [isHoveredOnNotificationIcon, setIssHoveredOnNotificationIcon] = useState(false);
  const [notificatioItems, setNotificatioItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState<any>(0);

  const handleMouseEnterOnProfileIcon = () => {
    setIssHoveredOnProfileIcon(true);
  };

  const handleMouseLeaveOnProfileIcon = () => {
    setIssHoveredOnProfileIcon(false);
  };

  const handleMouseEnterOnNotificationsIcon = () => {
    setIssHoveredOnNotificationIcon(true);

  };

  const handleMouseLeaveOnNotificationsIcon = () => {
    setIssHoveredOnNotificationIcon(false);
  };

  const handlePageChange = async (page: any) => {
    setIsLoadingForPagination(true);
    try {
      const res = await GetAllNotifications(page);
      setTotalItems(res.data.pagination.total);
      setPageSize(res.data.pagination.per_page);
      setCurrentPage(page)
      setNotificatioItems(res?.data?.data)
      setNotificationsLength(res.data.data[0].unread_count)
    } catch (err: any) {
      notification.error({
        message: err.response.data.message,
      });
    } finally {
      setIsLoadingForPagination(false);
    }

  };

  const SetNotificationAsRead = async (id: string) => {
    setIsLoadingOnNotificationAsRead(true);
    try {
      const res = await SetNotoficationAsReadById(id);
      console.log(res.data)
      notification.success({
        message: t("set_notification_as_readed")
      })
      router.refresh()
    } catch (err: any) {
      console.log(err.response)
      notification.error({
        message: err.response.data.message
      })
    } finally {
      setIsLoadingOnNotificationAsRead(false);
    }
  }

  const SetNotificationAsReadOnClic = async (id: string) => {
    try {
      const res = await SetNotoficationAsReadById(id);
      // setNotificationsLength(notificationsLength-1)
      router.refresh();

    } catch (err: any) {
      console.log(err.response)

    }
  }


  const SetAllNotificationAsRed = async () => {
    setIsLoadingOnAllNotificationAsRead(true);
    try {
      const res = await SetAllNotoficationAsRead()
      console.log(res)
      setNotificationsLength(0)
      notification.success({
        message: t("set_all_notification_as_readed")
      })
      router.refresh()
    }
    catch (err: any) {
      console.log(err)
    } finally {
      setIsLoadingOnAllNotificationAsRead(false);

    }
  }

  return (
    <main className="">
      {isLoading && <Loader />}
      <div className="flex items-center justify-between gap-5">

        {/* Start Profile Icon */}
        <div className=" felx flex-col justify-center items-center relative  !z-[99999999] hover:scale-110 transition-all duration-200 ">
          {isLoggend ? (
            <div
              className="flex items-center flex-col relative cursor-pointer mt-[2px]"
              onMouseEnter={handleMouseEnterOnProfileIcon}
              onMouseLeave={handleMouseLeaveOnProfileIcon}
            >
              <FaUserAlt className=" text-xl text-[#8c8c8c]" />
              <span className=" hidden lg:block text-sm mt-[2px] text-center">
                {t("profile")}
              </span>

              <ul
                className={`absolute !z-[99999999] top-[70px] -left-[46px] w-36 p-2 px-4 bg-gray-50 rounded-md  transition-all duration-300  before:block before:absolute before:border-8 before:border-t-transparent before:border-r-transparent before:border-b-[#f1f1f1] before:border-l-transparent before:-top-[15px] before:right-[46%] ${isHoveredOnProfileIcon ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
              >
                {profile_items.map((item) => (
                  <li
                    key={item.key}
                    className=" border-b-[1px] border-[#006496] py-3 px-1 cursor-pointer transition-all duration-200 hover:scale-105 "
                  >
                    {item.url ? (
                      <Link
                        href={`${item.url}`}
                        className=" flex items-center justify-center gap-1"
                      >
                        {item.icon}
                        <span className="mr-2 text-xs text-[#8c8c8c]">
                          {item.label}
                        </span>
                      </Link>
                    ) : (
                      <div
                        className=" flex items-center justify-center gap-1"
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
        {/* End Profile Icon */}

        {/* Start Notificatiom Icon */}
        <div
          className={`flex !flex-col justify-center items-center  relative !z-[99999999] hover:scale-110 transition-all duration-200`}
          onMouseEnter={handleMouseEnterOnNotificationsIcon}
          onMouseLeave={handleMouseLeaveOnNotificationsIcon}
        >
          <span className={`${notificationsLength > 0 ? "flex" : "hidden"} absolute -top-[5px] left-[16%] cursor-pointer bg-[#006496] text-[9px] text-center text-white rounded-lg p-[2px] px-[6px] pr-[7px]`}>
            {notificationsLength}
          </span>
          <IoNotificationsOutline className="text-xl cursor-pointer  text-[#8c8c8c]" />
          <p className="hidden lg:block mt-1 text-sm text-center cursor-pointer  ">
            {t("notifications")}
          </p>
          <div className={`absolute !z-[99999999] top-[70px] -left-[136px] w-[320px] p-2 bg-gray-50 rounded-md transition-all duration-300  before:block before:absolute before:border-8 before:border-t-transparent before:border-r-transparent before:border-b-[#f1f1f1] before:border-l-transparent before:-top-[15px] before:right-[46%] ${isHoveredOnNotificationIcon ? "opacity-100 visible" : "opacity-0 invisible"} `}>
            <ul className={`max-h-[402px] overflow-auto`}>
              <li className={`${notificationsLength > 0 ? "block" : "hidden"} mb-3 px-3`}>
                <div >
                  <button onClick={() => { SetAllNotificationAsRed() }}  className=" border-0 border-b-[1px] border-b-[#006496] text-[#006496] text-xs ">
                    {t("set_all_as_readed")}
                  {isLoadingOnAllNotificationAsRead && 
                    <Space size="small" className="mx-1">
                  <Spin size="small" />
                </Space>}
                    </button>
                </div>
              </li>
              {notificatioItems.length ? (notificatioItems?.map((item: any, index: number) => (
                <li key={item.id} className="bg-white rounded-md my-3 py-1 px-3">
                  <Link onClick={() => { SetNotificationAsReadOnClic(item.id) }} href={`${item.data.title == "product" ? `/category/${item.data.data.category_name}/${item.data.data.id}` : ""}`} className="relative">
                    <span className={`${item.read_at != "" ? "hidden" : "block"} w-2 h-2 bg-red-600 rounded-full absolute top-1 right-1 `}></span>
                    <p className="mr-2 text-sm  transition-all duration-200 hover:scale-105">
                      {item.data.message} {t("from")} {item.data.title == "product" && item.data.data.customer_name}
                    </p>
                  </Link>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs text-[#8c8c8c] ">{item.created_at}</span>
                    <button onClick={() => { SetNotificationAsRead(item.id) }} className={`${item.read_at != "" ? "hidden" : "block"} text-xs text-[#8c8c8c] border-[1px] border-[#8c8c8c] p-[2px] rounded-md hover:text-[#006496] hover:border-[#006496] transition-all duration-150`}>
                      {t("set_as_readed")}
                      {isLoadingOnNotificationAsRead && 
                    <Space size="small" className="mx-1">
                  <Spin size="small" />
                </Space>}
                    </button>
                  </div>
                </li>
              ))) : (
                <li className="m-2 p-3  rounded-lg ">
                  <IoIosNotificationsOff className="mx-auto text-2xl text-[#8c8c8c]" />
                  <p className="w-fit mx-auto text-[#8c8c8c]">{t("there_ara_no_notification_yet")}</p>
                </li>)}
            </ul>
            {isLoadingForPagination &&
              <div className="flex items-center justify-center">
                <Space size="large" >
                  <Spin size="large" />
                </Space>
              </div>
            }
            {/* Start Pagination */}
            <div className="mt-5 [&>ul]:flex [&>ul]:items-center [&>ul>li]:border-[1px] [&>ul>li]:!pb-[3px] [&>ul>li]:border-[#006496] [&>ul]:w-full notification-pagination">
              <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={pageSize}
                onChange={handlePageChange}
                simple
              />

            </div>
            {/* End Pagination */}
          </div>
        </div>
        {/* End Notification Icon */}

        {/* Start wishList Icon */}
        {!isAdmin && !isEmployee && (
          <div className="w-16 flex items-center justify-center flex-col relative hover:scale-110 transition-all duration-200 ">
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
        {/* End WishList Icon */}

        {/* Start Cart Icon */}
        {!isAdmin && !isEmployee && infoData?.plan_detils_limit?.enable_cart == "1" && (
          <div className=" hover:scale-110 transition-all duration-200 ">
            <Link
              href={`/cart`}
              className="flex !flex-col justify-center items-center "
            >
              <IoMdCart className="text-xl cursor-pointer text-[#8c8c8c]" />
              <p className="hidden lg:block mt-1 text-center text-sm">{t("cart")}</p>
            </Link>
          </div>
        )}
        {/* End WishList Icon */}

        {/* Start talab Cart Icon */}
        {isAdmin && !isEmployee && (
          <div className="  hover:scale-110 transition-all duration-200 ">
            <Link
              href={`/admin/cart`}
              className="flex !flex-col justify-center items-center "
            >
              <IoMdCart className="text-xl cursor-pointer text-[#8c8c8c]" />
              <p className="hidden lg:block mt-1 text-center text-sm">{t("cart")}</p>
            </Link>
          </div>
        )}
        {/* End talab Cart Icon */}

        {/* Start DashBoard Icon */}
        {isAdmin || isEmployee ?
          (<div className=" hover:scale-110 transition-all duration-200 ">
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
          ) : ("")}
        {/* End Dashboard Icon */}

        {/* Start Compiration Icon */}
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
        {/* End Compiration Icon */}

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
        onOk={() => { handleLogOut() }}
        okButtonProps={{ style: { backgroundColor: '#4096ff' } }}
        onCancel={() => { setOpenLogOut(false); }}
        width={400}
      />

    </main>
  );
}

export default UserIcons;
