"use client";
import React, { useState, useEffect } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa6";
import { BsArrowsExpandVertical } from "react-icons/bs";
import { notification, Radio } from "antd";
import { AddToCard } from "@/app/[locale]/api/order";
import { AddDeleteToWishList } from "@/app/[locale]/api/wishlist";
import { useDispatch, useSelector } from "react-redux";
import { setChangeWishListStatus } from "@/app/[locale]/lib/todosSlice";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
import { CiStar } from "react-icons/ci";
import Image from "next/image";
import { AddToCard_Talab } from "@/app/[locale]/api/talab";
import Rating from "./Rating";
import GlobalRating from "../../../global/GlobalRating/GlobalRating";

type Props = {
  data: any;
  locale: LocaleProps | string;
  store?: boolean
};
function MiddleSection({ data, locale, store }: Props) {
  const { t } = useTranslation(locale, "common");
  const dispatch = useDispatch();
  const [num, setNum] = useState(0);
  const [userRole, setUserRole] = useState("");
  const [localKeys, setLocalKeys] = useState(["product0", "product1"]);
  const [details, setDetails] = useState<any>({});
  const [categoryComparison, setCategoryComparison] = useState<any>(false);
  const [arrayOfObjects, setArrayOfObjects] = useState<any[]>([]);
  const [arr, setArr] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // average_rating
  }, [data])

  const { infoData, changeWishListStatus } = useSelector(
    (state: any) => state.counter
  );

  const hanldeCompare = (item: any) => {
    let inLocal = false;

    localKeys.forEach((element: any, index) => {
      let localItem: any = localStorage.getItem(localKeys[index]);
      if (localItem) {
        localItem = JSON.parse(localItem);
        if (localItem._id === item._id) {
          inLocal = true;
        }
      }
    });

    if (!inLocal) {
      if (num < 4) {
        localStorage.setItem(`product${num}`, JSON.stringify(item));
        setNum(num + 1);
      } else {
        if (num == 4) {
          setNum(1);
          localStorage.setItem(`product0`, JSON.stringify(item));
        }
      }
      notification.success({
        message: t("item_added_for_comparison"),
      });
    } else {
      notification.error({
        message: t("item_already_in_comparison"),
      });
    }
  };

  const handleClick = (label: string, value: string) => {
    setDetails((prevState: any) => ({ ...prevState, [label]: value }));
  };

  const handleAddToCard = async (id: string) => {
    setIsLoading(true)
    const datas = {
      product_id: id,
      quantity: 1,
      details: JSON.stringify(details),
    };
    let res: any;

    try {
      if (store == true) {
        res = await AddToCard_Talab(datas.product_id, 1, datas.details);
      } else {
        console.log("asd");
        res = await AddToCard(datas);
      }
      notification.success({
        message: t("added_product_to_cart"),
      });
    }
    catch (err: any) {
      console.log(err);
      notification.error({
        message: err.response.data.message,
      });
    }
    finally{
      setIsLoading(false)
    }


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
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
      notification.error({
        message: err.response.data.error,
      });
    }
  };

  useEffect(() => {
    const user: any = localStorage.getItem("userRole");
    if (user != undefined) {
      setUserRole(JSON.parse(user));
    }

    if (data) {
      setCategoryComparison(data.categoryComparison == "1" ? true : false);
      let newArrayOfObjects: any[] = [];
      let newDetails: any = {};
      // for (const property in data.details) {
      data.details.map((item: any) => {
        let newObject: any = { label: item.title, value: item.content };
        newArrayOfObjects.push(newObject);

        const values = newObject?.value?.includes("|")
          ? newObject.value?.split("|")
          : [newObject.value];
        const defaultVal = values.find((val: any) => !val.includes("!")).trim();
        newDetails[newObject.label] = defaultVal;
      });

      setArrayOfObjects(newArrayOfObjects);
      setDetails(newDetails);
    }
    
    // Rating
   
  }, [data]);

  return (
    <div className="mt-2 flex flex-col justify-between  h-full">
      <div className="flex justify-between">
        <div>
          <p className="text-base lg:text-xl">{data?.name}</p>
          {/* Start Rating */}
          <div className="mt-2">
            <GlobalRating average_rating={data?.average_rating} />
          </div>
          {/* End Rating */}
          <p className="text-[#555] mt-4">
            <span className="text-[#8c8c8c] text-base lg:text-xl">
              {" "}
              {t("brand_name")} :{" "}
            </span>
            <span className="text-xl">{data?.brand}</span>
          </p>
        </div>
        <div>
          <button
            className={`
              ${store ? "hidden" : "block"}            
              ${userRole !== "customer" && "cursor-not-allowed "}
             bg-[#006496] text-white w-24 px-3 py-2 flex items-center rounded-md hover:bg-[#004169] transition-all duration-200`}
             disabled={userRole !== "customer"}
             onClick={() => {
              handleAddOrDeleteTowishList(data._id);
            }}
          >
            <span className="w-11 flex items-center gap-2">
              <FaRegHeart className="text-xl" />
            </span>
            <span className=" text-base lg:text-lg ">
              {t("wishlist")}
            </span>
          </button>

          <button
            className={`${categoryComparison ? "flex" : "hidden"
              } bg-[#006496] text-white w-24 px-3 py-2 flex items-center rounded-md hover:bg-[#004169] mt-2 transition-all duration-200 `}
            onClick={() => {
              hanldeCompare(data);
            }}
          >
            <span className="w-10">
              <BsArrowsExpandVertical className="text-xl" />
            </span>
            <span className="mr-1 text-base lg:text-lg flex items-center justify-center">
              {t("comparison")}
            </span>
          </button>

        </div>
      </div>

      <div className="">
        {arrayOfObjects.map((item: any) => {
          const values = item?.value?.includes("|")
            ? item?.value?.split("|")
            : [item.value];
          const defaultVal = values
            .find((value: any) => !value.includes("!"))
            .trim();
          return (
            <div className="bg-white " key={item.label}>
              {item?.value?.includes("|") && (
                <>
                  <span className="text-lg lg:text-xl text-[#006496]">
                    {item.label} :
                  </span>
                  <span className="text-base lg:text-lg m-1 ">
                    <Radio.Group defaultValue={defaultVal}>
                      {values.map((value: any, index: number) => (
                        <Radio.Button
                          key={index}
                          value={value.trim()}
                          className={`${value.trim().includes("!") &&
                            "pointer-events-none line-through opacity-80 "
                            } m-1`}
                          onClick={() => handleClick(item.label, value)}
                        >
                          {value?.trim()}
                        </Radio.Button>
                      ))}
                    </Radio.Group>
                  </span>
                </>
              )}
            </div>
          );
        })}

        <div className="">
          <div className="text-[#8c8c8c] text-xl ">
            {+data.quantity > 0 ? (
              <span> {t("available")}</span>
            ) : (
              <span> {t("currently_unavailable")}</span>
            )}
          </div>
          <div className="text-[#004169] text-xl mt-5">
         
            <div className={`flex items-center gap-5`}>
              <p
                className={`${+data.discount_price > 0
                  ? "line-through  text-black mt-2 text-xs "
                  : " text-[#004169] mt-2 text-xl"
                  } `}
              >
                 {t("price")} :  {data.price}
              </p>
              {+data.discount_price > 0 && (
                <p className={`text-[#004169] mt-2 text-lg`}>{t("price")} : {+data.discount_price}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="">
        {infoData?.plan_detils_limit?.enable_cart == "1" && !store && (
          <div className="">
            <p className=" text-[#555]">
              {t("approximately_delivered_shipping_within1_2business_days")}
            </p>
          </div>
        )}

        {infoData?.plan_detils_limit?.enable_cart == "1" ? (
          <button
            onClick={() => handleAddToCard(data._id)}
            className={`${userRole == "admin" && !store && "cursor-not-allowed" } w-full flex items-center justify-center p-4 text-white text-xl lg:text-xl bg-[#006496] hover:bg-[#004169]  rounded-md my-3 lg:my-0 lg:mb-2  mx-auto`}
            disabled={userRole == "admin" && !store}
          >
            {t("add_to_cart")}
          </button>
        ) : (
          <Link
            href={`https://wa.me/+905374561068?text=${encodeURIComponent(
              "https://mobilestore-moudy-wold.vercel.app/title}/${item.id}"
            )}\nأريد%20تفاصيل%20هذا%20المنتج`}
            className="w-full flex items-center justify-center p-4 text-white text-xl lg:text-xl bg-[#006496] hover:bg-[#004169] rounded-md my-3 lg:my-0 lg:mb-2  mx-auto"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("order_now")}
          </Link>
        )}
      </div>
    </div>
  );
}

export default MiddleSection;
