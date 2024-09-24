"use client";
import React, { useState, useEffect } from 'react'
import { FaRegHeart } from "react-icons/fa6";
import { BsArrowsExpandVertical } from "react-icons/bs";
import { notification, Flex, Radio } from 'antd';
import { AddToCard } from '@/app/[locale]/api/order';
import { AddDeleteToWishList } from "@/app/[locale]/api/wishlist";
import { useDispatch, useSelector } from 'react-redux'
import { setChangeWishListStatus } from "@/app/[locale]/lib/todosSlice";
import Link from "next/link";

type Props = {
  data: any
}
function MiddleSection({ data }: Props) {
  const dispatch = useDispatch()
  const [num, setNum] = useState(0)
  const [userRole, setUserRole] = useState("")
  const [localKeys, setLocalKeys] = useState(["product0", "product1",])
  const [details, setDetails] = useState<any>({});
  const [categoryComparison, setCategoryComparison] = useState<any>(false);
  const [arrayOfObjects, setArrayOfObjects] = useState<any[]>([]);
  const [arr, setArr] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { infoData, changeWishListStatus } = useSelector((state: any) => state.counter);


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

      if (num < 4) {
        localStorage.setItem(`product${num}`, JSON.stringify(item))
        setNum(num + 1);
      } else {
        if (num == 4) {
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
  const handleClick = (label: string, value: string) => {

    setDetails((prevState: any) => ({ ...prevState, [label]: value }))
  };
  const handleAddToCard = async (id: string) => {
    const datas = {
      product_id: id,
      quantity: 1,
      details: JSON.stringify(details)
    }
    AddToCard(datas)
      .then((res: any) => {
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
      console.log(err)
      setIsLoading(false)
      notification.error({
        message: err.response.data.error
      })
    }
  }

  useEffect(() => {
    const user: any = localStorage.getItem("userRole")
    if (user != undefined) {
      setUserRole(JSON.parse(user))
    }
    if (data) {
      setCategoryComparison(data.categoryComparison == "1" ? true : false)
      let newArrayOfObjects: any[] = [];
      let newDetails: any = {};
      // for (const property in data.details) {
      data.details.map((item: any) => {

        let newObject: any = { label: item.title, value: item.content };
        newArrayOfObjects.push(newObject);

        const values = newObject?.value?.includes('|') ? newObject.value?.split('|') : [newObject.value]
        const defaultVal = values.find((val: any) => !val.includes('!')).trim();
        newDetails[newObject.label] = defaultVal;
      })

      setArrayOfObjects(newArrayOfObjects);
      setDetails(newDetails);
    }
  }, [data]);


  return (
    <div className="mt-2 flex flex-col justify-between  h-full">

      <div className="flex justify-between">
        <div>
          <p className="text-base lg:text-xl">{data?.name}</p>
          <p className="text-[#555] mt-4">
            <span className="text-[#8c8c8c] text-base lg:text-xl"> الشركة المصنعة: </span>
            <span className="text-xl">
              {data?.brand}
            </span>
          </p>
        </div>
        <div>

          <button className={`${userRole !== "customer" && "pointer-events-none"} bg-[#006496] text-white w-24 px-3 py-2 flex items-center rounded-md hover:bg-[#004169] transition-all duration-200`} onClick={() => { handleAddOrDeleteTowishList(data._id) }} >
            <span className='w-10'>
              <FaRegHeart className=" text-xl" />
            </span>
            <span className="mr-1 text-base lg:text-lg flex items-center justify-center">مفضلة</span>
          </button>

          <button className={`${categoryComparison ? "flex" : "hidden"} bg-[#006496] text-white w-24 px-3 py-2 flex items-center rounded-md hover:bg-[#004169] mt-2 transition-all duration-200 `} onClick={() => { hanldeCompare(data) }}>
            <span className='w-10'>
              <BsArrowsExpandVertical className="text-xl" />
            </span>
            <span className="mr-1 text-base lg:text-lg flex items-center justify-center" >
              مقارنة
            </span>
          </button>

        </div>
      </div>

      <div className="">
        {arrayOfObjects.map((item: any) => {
          const values = item?.value?.includes('|') ? item?.value?.split('|') : [item.value];
          const defaultVal = values.find((value: any) => !value.includes('!')).trim();
          return (
            <div className="bg-white " key={item.label}>
              {item?.value?.includes('|') && <>
                <span className="text-lg lg:text-xl text-[#006496]">
                  {item.label} :
                </span>
                <span className="text-base lg:text-lg m-1 ">
                  <Radio.Group defaultValue={defaultVal}>
                    {values.map((value: any, index: number) => (
                      <Radio.Button
                        key={index}
                        value={value.trim()}
                        className={`${value.trim().includes("!") && "pointer-events-none line-through opacity-80 "} m-1`}
                        onClick={() => handleClick(item.label, value)}
                      >
                        {value?.trim()}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </span>
              </>}
            </div>
          );
        })}

        <div className="">
          <div className="text-[#8c8c8c] text-xl ">
            {+data.quantity > 0 ? <span> متوفر</span> : <span> غير متوفر حاليا</span>}
          </div>
          <div className="text-[#004169] text-xl mt-5">
                  السعر:


          <div className={`flex items-center gap-5`} >
                  <p className={`${0 > 0 ?  "line-through  text-black mt-2 text-xs " : " text-[#004169] mt-2 text-xl" } `}>{data.price}</p>
                  {0 > 0 && 
                    <p className={`text-[#004169] mt-2 text-lg`}>{data.price}</p>
                  }</div>

                  
            
          </div>
        </div>

      </div>

      <div className="">

        {infoData?.plan_detils_limit?.enable_cart == "1" &&
          <div className="">
            <p className=" text-[#555]">
              بشكل تقريبي: سيتم تسليمه للشحن ضمن 3-4 أيام عمل
            </p>
          </div>
        }
       
          {infoData?.plan_detils_limit?.enable_cart == "1" ?
            <button onClick={() => handleAddToCard(data._id)} className="w-full flex items-center justify-center p-4 text-white text-xl lg:text-xl bg-[#006496] hover:bg-[#004169]  rounded-md my-3 lg:my-0 lg:mb-2  mx-auto">
              أضف إلى السلة
            </button>
            : <Link
              href={`https://wa.me/+905374561068?text=${encodeURIComponent('https://mobilestore-moudy-wold.vercel.app/title}/${item.id}')}\nأريد%20تفاصيل%20هذا%20المنتج`}
              // href={`https://wa.me/905374561068?text=${encodeURIComponent('https: //www.facebook.com')}%20أريد%20تفاصيل%20عن%20هذا%20المنتج`}
              className="w-full flex items-center justify-center p-4 text-white text-xl lg:text-xl bg-[#006496] hover:bg-[#004169] rounded-md my-3 lg:my-0 lg:mb-2  mx-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              إطلبه الآن
            </Link>}
       
      </div>
    </div>
  )
}

export default MiddleSection
