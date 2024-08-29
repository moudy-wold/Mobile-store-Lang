"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BsArrowsExpandVertical } from "react-icons/bs";
import { notification } from "antd";
import { Slide } from "react-awesome-reveal";
import { AddDeleteToWishList } from "@/app/[locale]/api/wishlist";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from 'react-redux'
import { setChangeWishListStatus } from "@/app/[locale]/lib/todosSlice";
import { AddToCard } from "@/app/[locale]/api/order";
type Props = {
  data: {
    _id: string,
    name: string,
    description: string,
    quantity: number,
    price: number,
    currency: string,
    has_coupon: boolean,
    category: string,
    recommended: boolean,
    details: Object,
    createdAt: string,
    updatedAt: string,
    __v: 0
  }[],
  title: string;
  url: string;
  id: string;
  compare?: any
};

function SliderCart({ data, title, url, id, compare }: Props) {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [idDetails, setIdDetails] = useState();
  const { changeWishListStatus } = useSelector((state: any) => state.counter);

  const handleHover = (_id: any) => {

    setDetails(true)
    setIdDetails(_id)
  }

  const [localKeys, setLocalKeys] = useState(["product0", "product1",  ])
  const [num, setNum] = useState(0)
  const [arr, setArr] = useState<any>([]);
  const hanldeCompare = (item: any) => {
    let inLocal = false;

    localKeys.forEach((element: any, index) => {
      let localItem: any = localStorage.getItem(localKeys[index]);
      if (localItem) {
        localItem = JSON.parse(localItem);
        if (localItem._id === item._id) {
          inLocal = true
        }
      }
    })
    if (!inLocal) {
      if (num < 2) {
        localStorage.setItem(`product${num}`, JSON.stringify(item))
        setNum(num + 1);
      } else {
        if (num == 2) {
          setNum(1)
          localStorage.setItem(`product0`, JSON.stringify(item))
        }
      }
      notification.success({
        message: "تمت إضافة العنصر للمقارنة"
      })
    } else {
      notification.error({
        message: "هذا العنصر موجود مسبقا في المقارنة"
      })
    }
  }

  const handleAddOrDeleteTowishList = async (id: string) => {
    setIsLoading(true)
    try {
      const response = await AddDeleteToWishList(id);
      setIsLoading(false)
      if (response.data.delete) {
        notification.success({
          message: "تمت حذف المنتج من المفضلة"
        })
        const user_WishList = localStorage.getItem('userWishList');
        let idsArray = user_WishList ? JSON.parse(user_WishList) : [];
        idsArray = idsArray.filter((idd: any) => idd !== id);
        localStorage.setItem('userWishList', JSON.stringify(idsArray));
        setArr(idsArray)
      } else {

        notification.success({
          message: "تمت إضافة المنتج للمفضلة"
        })

        const user_WishList = localStorage.getItem('userWishList');
        let idsArray = user_WishList ? JSON.parse(user_WishList) : [];

        if (!idsArray.includes(id)) {
          idsArray.push(id);
          localStorage.setItem('userWishList', JSON.stringify(idsArray));
          setArr(idsArray)
        }
      }


      dispatch(setChangeWishListStatus())
    } catch (err: any) {
      setIsLoading(false)
      notification.error({
        message: err.response.data.error
      })
    }
  }

  const handleAddToCard = async (id: string) => {
    const datas = {
      product_id: id,
      quantity: 1,
      details: JSON.stringify({})
    }
    AddToCard(datas)
      .then((res: any) => {
        console.log(res)
        if (res.status) {
          notification.success({
            message: "تمت إضافة المنتج إلى السلة"
          })
        }
      })
      .catch((err: any) => {
        console.log(err)
        notification.error({
          message: err.response.data.message
        })
      })
  }

  useEffect(() => {
    const user: any = localStorage.getItem("userRole")
    if (user != undefined) {
      if (JSON.parse(user) == "admin") {
        setIsAdmin(true)
      }
      else if (JSON.parse(user) == "employee") {
        setIsEmployee(true)
      }

    }

    const user_WishList: any = localStorage.getItem('userWishList');
    let wishList = [];

    // if (user_WishList) {
    if (user_WishList != undefined) {
      try {
        wishList = JSON.parse(user_WishList);

        if (!Array.isArray(wishList)) {
          console.warn("Parsed data is not an array, resetting to empty array.");
          wishList = [];
        }
      } catch (e) {
        console.error("Error parsing JSON from localStorage:", e);
      }
    }
    setArr(wishList);
  }, [changeWishListStatus])

  return (
    <main className="container relative mb-5 overflow-hidden">
      {isLoading && <Loader />}
      <div className="flex items-center justify-between my-4">
        <h2 className="text-3xl font-extrabold text-[#006496]">
          <Link href={`/category/${url}`} onClick={() => { localStorage.setItem("categoryId", id) }} className="text-base lg:text-2xl">
            {title}
          </Link>
        </h2>
        <Link href={`/category/${url}`} onClick={() => { localStorage.setItem("categoryId", id) }} className="text-md lg:text-lg text-[#006496]">
          عرض الكل
        </Link>
      </div>
      <div className=" hidden sm:block absolute right-5 top-1/2 translate-x-1/2 translate-y-1/2 text-xl md:text-4xl z-10 ">
        <button id="shares-slider-prev-arrow-button" className='bg-white rounded-full w-10 h-10 flex items-center justify-center'>
          <IoIosArrowForward className="text-[#d0d0d0] text-xl" />
        </button>
      </div>
      <Slide duration={500} delay={0} cascade className="relative">
        <Swiper
          cssMode={true}
          modules={[Navigation]}
          navigation={{
            nextEl: '#shares-slider-next-arrow-button',
            prevEl: '#shares-slider-prev-arrow-button',
            disabledClass: 'swiper-button-disabled',
          }}
          spaceBetween={8}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1220: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }}
        >

          {data.map((item: any) => {
            const isFavorite = arr.includes(item._id);
            return (
              <SwiperSlide key={item._id}>
                <div className=" bg-white rounded-md pb-2">
                  <div className="flex justify-center relative"
                    onMouseEnter={() => handleHover(item._id)}
                    onMouseLeave={() => setDetails(false)}
                  >
                    <>
                      <Image
                        src={item.images ? item?.images[0] : ""}
                        alt={item.title}
                        width={187}
                        height={187}
                        className="!h-[187px]"
                      />
                    </>
                   
                      <div className={`absolute opacity-0 z-50 bg-[#eeeeee8c] transition-all flex items-center  w-full h-full top-0 left-0 ${details && idDetails == item._id ? "opacity-100" : "opacity-0"} `}>
                        <div className="flex items-center justify-between p-1 w-fit mx-auto">
                          {!isAdmin && !isEmployee &&
                            <div className="bg-[#f1f1f1] p-3  rounded-full  cursor-pointer hover:bg-[#004169!important] ml-2 [&:hover>svg]:text-white ">

                              {isFavorite ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 -5.37 77.646 77.646" onClick={() => { handleAddOrDeleteTowishList(item._id) }}>
                                  <defs>
                                    <linearGradient id="linear-gradient" x1="1.044" y1="0.005" x2="0.413" y2="0.749" gradientUnits="objectBoundingBox">
                                      <stop offset="0" stop-color="#ff7471" />
                                      <stop offset="1" stop-color="#ff5245" />
                                    </linearGradient>
                                  </defs>
                                  <g id="heart_red" data-name="heart red" transform="translate(-263.982 -435.283)">
                                    <g id="Group_25" data-name="Group 25">
                                      <path id="Path_69" data-name="Path 69" d="M302.81,446.03c-.059-.106-.128-.2-.187-.307.059.1.128.2.187.307Z" fill="none" />
                                      <path id="Path_70" data-name="Path 70" d="M341.628,456.395l-.025-.006c.006-.142.025-.279.025-.431a20.662,20.662,0,0,0-37.039-12.611.171.171,0,0,0-.024-.007,2.169,2.169,0,0,1-3.54-.046l-.035.008a20.657,20.657,0,0,0-37,12.656c0,.147.018.282.018.424l-.029.013s0,.5.1,1.413a20.552,20.552,0,0,0,.6,3.364c1.608,6.945,6.938,20.286,24.659,32.122,10.242,6.879,12.73,8.743,13.383,8.867.031.006.048.033.083.033s.058-.033.094-.043c.7-.162,3.265-2.071,13.359-8.857,16.931-11.313,22.555-24,24.428-31.163a20.743,20.743,0,0,0,.854-4.546C341.623,456.824,341.628,456.395,341.628,456.395ZM302.81,446.03h0c-.059-.1-.128-.2-.187-.307C302.682,445.825,302.751,445.924,302.81,446.03Z" fill="#ff5245" />
                                    </g>
                                    <path id="Path_71" data-name="Path 71" d="M295.337,474.437c-5.407-20.228,1.411-28.894,5-31.889a20.747,20.747,0,0,0-6.426-5.077c-6.5-1.416-15.583.295-21.458,16.921-1,3.4-1.458,11.938-.492,22.426a65.334,65.334,0,0,0,17.38,16.476c10.242,6.879,12.73,8.743,13.383,8.867.031.006.048.033.083.033s.058-.033.094-.043a2.946,2.946,0,0,0,.76-.373C301.6,496.005,298.749,487.182,295.337,474.437Z" fill="url(#linear-gradient)" />
                                  </g>
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="25px" width="25px" version="1.1" id="Capa_1" viewBox="0 0 471.701 471.701" onClick={() => { handleAddOrDeleteTowishList(item._id) }}>
                                  <g>
                                    <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1   c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3   l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4   C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3   s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4   c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3   C444.801,187.101,434.001,213.101,414.401,232.701z" />
                                  </g>
                                </svg>}
                            </div>}
                          {compare == "1" &&
                            <div className="bg-[#f1f1f1] p-3  rounded-full cursor-pointer hover:bg-[#004169!important]  hover:text-[#fff] " onClick={() => { hanldeCompare(item) }}>
                              <BsArrowsExpandVertical />
                            </div>
                          }
                        </div>
                      </div>
                   
                  </div>
                  <Link href={`/category/${url}/${item._id}`}>
                    <p className="my-2 w-[90%] !h-16 text-center text-sm md:text-base lg:text-lg pr-2 text-[#8c8c8c] flex items-center justify-center">
                      {item.name}
                    </p>
                    <p className="w-[90%] text-center text-[#004169] font-semibold mb-2 ">
                      {item.price}
                    </p>
                  </Link>
                  {/* <button
                    className="text-center text-[#8c8c8c] bg-[#f1f1f1] w-[90%] block mx-auto mt-2 hover:text-[#fff] hover:bg-[#004169] cursor-pointer text-lg font-semibold py-2"
                    onClick={() => handleAddToCard(item._id)}
                  > */}
                  {/* <Link href={`https://wa.me/+905374561068?text=https://mobilestore-moudy-wold.vercel.app/phone/${item._id}\nأريد%20تفاصيل%20هذا%20المنتج\n`} >
                      <p className=" text-sm lg:text-lg flex  items-center justify-center">
                        <FaWhatsapp className="ml-1" />
                        إشتر الأن
                      </p>
                    </Link> */}

                  {/* <p className=" text-sm lg:text-lg flex  items-center justify-center">
                      <IoMdCart className="ml-1" />
                      أضف إلى السلة
                    </p> */}

                  {/* </button> */}

                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Slide>
      <div className=" hidden sm:block absolute left-5 top-1/2 -translate-x-1/2 translate-y-1/2 text-xl md:text-4xl text-primary">
        <button id="shares-slider-next-arrow-button" className='bg-white rounded-full w-11 h-11 flex items-center justify-center'>
          <IoIosArrowBack className="text-[#d0d0d0] text-xl" />
        </button>
      </div>
    </main>
  );
}

export default SliderCart;
