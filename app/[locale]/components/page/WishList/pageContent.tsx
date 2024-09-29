"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import Image from "next/image";
import Link from "next/link";
import { AddDeleteToWishList } from "@/app/[locale]/api/wishlist";
import { notification } from "antd";
import { setChangeWishListStatus } from "@/app/[locale]/lib/todosSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "@/app/i18n/client";

function WishListPage({ data, locale }: any) {
  const { t } = useTranslation(locale, "common");
  const dispatch = useDispatch();
  const [idDetails, setIdDetails] = useState();
  const [details, setDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [arr, setArr] = useState<any>([]);
  const [inWishListProducts, setInWishListProducts] = useState<any>();

  const { changeWishListStatus } = useSelector((state: any) => state.counter);
  const handleHover = (id: any) => {
    setDetails(true);
    setIdDetails(id);
  };
  const handleAddOrDeleteTowishList = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await AddDeleteToWishList(id);
      setIsLoading(false);
      if (response.data.delete) {
        notification.success({
          message: t("product_removed_from_wishlist"),
        });
        const user_WishList = localStorage.getItem("userWishList");
        let idsArray = user_WishList ? JSON.parse(user_WishList) : [];
        idsArray = idsArray.filter((idd: any) => idd !== id);
        localStorage.setItem("userWishList", JSON.stringify(idsArray));
        setArr(idsArray);
      } else {
        notification.success({
          message: t("product_has_been_added_to_favourites"),
        });

        const user_WishList = localStorage.getItem("userWishList");
        let idsArray = user_WishList ? JSON.parse(user_WishList) : [];

        if (!idsArray.includes(id)) {
          idsArray.push(id);
          localStorage.setItem("userWishList", JSON.stringify(idsArray));
          setArr(idsArray);
        }
      }
      dispatch(setChangeWishListStatus());
      const updatedItems = inWishListProducts.filter((item: any) => {
        return item._id !== id;
      });

      setInWishListProducts(updatedItems);
    } catch (err: any) {
      setIsLoading(false);
      notification.error({
        message: err.response.data.error,
      });
    }
  };
  useEffect(() => {
    const user_WishList: any = localStorage.getItem("userWishList");
    setArr(user_WishList != undefined ? JSON.parse(user_WishList) : []);
  }, [changeWishListStatus]);

  useEffect(() => {
    setInWishListProducts(data);
  }, []);
  return (
    <div className="container pt-12">
      {isLoading && <Loader />}
      {inWishListProducts?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {inWishListProducts?.map((item: any) => {
            const isFavorite = arr.includes(item._id);
            return (
              <div
                key={item._id}
                className="border-2 border-gray pb-2 relative "
              >
                <div
                  className="flex justify-center relative"
                  onMouseEnter={() => handleHover(item._id)}
                  onMouseLeave={() => setDetails(false)}
                >
                  <Image
                    src={item.images[0]}
                    width={230}
                    height={230}
                    alt={item.name}
                    className=""
                  />
                  <div
                    className={`absolute opacity-0 z-50 bg-[#eeeeee8c] transition-all flex items-center  w-full h-full top-0 left-0 ${details && idDetails == item._id
                        ? "opacity-100"
                        : "opacity-0"
                      } `}
                  >
                    <div className="flex items-center justify-between p-1 w-fit mx-auto">
                      <div className="bg-[#f1f1f1] p-3  rounded-full  cursor-pointer hover:bg-[#004169!important]  hover:text-[#fff] ml-2">
                        {isFavorite ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20px"
                            height="20px"
                            viewBox="0 -5.37 77.646 77.646"
                            onClick={() => {
                              handleAddOrDeleteTowishList(item._id);
                            }}
                          >
                            <defs>
                              <linearGradient
                                id="linear-gradient"
                                x1="1.044"
                                y1="0.005"
                                x2="0.413"
                                y2="0.749"
                                gradientUnits="objectBoundingBox"
                              >
                                <stop offset="0" stop-color="#ff7471" />
                                <stop offset="1" stop-color="#ff5245" />
                              </linearGradient>
                            </defs>
                            <g
                              id="heart_red"
                              data-name="heart red"
                              transform="translate(-263.982 -435.283)"
                            >
                              <g id="Group_25" data-name="Group 25">
                                <path
                                  id="Path_69"
                                  data-name="Path 69"
                                  d="M302.81,446.03c-.059-.106-.128-.2-.187-.307.059.1.128.2.187.307Z"
                                  fill="none"
                                />
                                <path
                                  id="Path_70"
                                  data-name="Path 70"
                                  d="M341.628,456.395l-.025-.006c.006-.142.025-.279.025-.431a20.662,20.662,0,0,0-37.039-12.611.171.171,0,0,0-.024-.007,2.169,2.169,0,0,1-3.54-.046l-.035.008a20.657,20.657,0,0,0-37,12.656c0,.147.018.282.018.424l-.029.013s0,.5.1,1.413a20.552,20.552,0,0,0,.6,3.364c1.608,6.945,6.938,20.286,24.659,32.122,10.242,6.879,12.73,8.743,13.383,8.867.031.006.048.033.083.033s.058-.033.094-.043c.7-.162,3.265-2.071,13.359-8.857,16.931-11.313,22.555-24,24.428-31.163a20.743,20.743,0,0,0,.854-4.546C341.623,456.824,341.628,456.395,341.628,456.395ZM302.81,446.03h0c-.059-.1-.128-.2-.187-.307C302.682,445.825,302.751,445.924,302.81,446.03Z"
                                  fill="#ff5245"
                                />
                              </g>
                              <path
                                id="Path_71"
                                data-name="Path 71"
                                d="M295.337,474.437c-5.407-20.228,1.411-28.894,5-31.889a20.747,20.747,0,0,0-6.426-5.077c-6.5-1.416-15.583.295-21.458,16.921-1,3.4-1.458,11.938-.492,22.426a65.334,65.334,0,0,0,17.38,16.476c10.242,6.879,12.73,8.743,13.383,8.867.031.006.048.033.083.033s.058-.033.094-.043a2.946,2.946,0,0,0,.76-.373C301.6,496.005,298.749,487.182,295.337,474.437Z"
                                fill="url(#linear-gradient)"
                              />
                            </g>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000000"
                            height="25px"
                            width="25px"
                            version="1.1"
                            id="Capa_1"
                            viewBox="0 0 471.701 471.701"
                            onClick={() => {
                              handleAddOrDeleteTowishList(item._id);
                            }}
                          >
                            <g>
                              <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1   c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3   l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4   C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3   s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4   c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3   C444.801,187.101,434.001,213.101,414.401,232.701z" />
                            </g>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <Link href={`/wishList/${item._id}`}>
                  <div className="flex flex-col items-center p-4">
                    <p className="text-[#a9a9a9] text-center text-xl">
                      {item.name}
                    </p>
                    <p className="text-[#004169] mt-2 text-lg">{item.price}</p>
                  </div>
                </Link>
                {/* <div className="rounded-lg text-center text-[#8c8c8c] bg-[#f1f1f1] w-[90%] block mx-auto hover:text-[#fff] hover:bg-[#004169] cursor-pointer text-lg font-semibold py-1 transition-all">
                <Link href={`https://wa.me/+905374561068?text=https://mobilestore-moudy-wold.vercel.app/wishList/${item.id}\nأريد%20تفاصيل%20هذا%20المنتج`} >
                  <p className=" text-sm lg:text-lg flex  items-center justify-center">
                    <FaWhatsapp className="ml-1" />
                    {t("buy_it_now")}
                  </p>
                </Link>
              </div> */}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mx-auto mt-20">
          <p className="border-2 border-gray-300 rounded-xl p-10 text-center block mx-auto text-xl font-semibold">
            {t("there_are_no_items_in_favorites_yet")}
          </p>
        </div>
      )}
    </div>
  );
}

export default WishListPage;
