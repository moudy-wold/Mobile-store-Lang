"use client"
import { UpdateQuantity } from '@/app/[locale]/api/order';
import Loader from '@/app/[locale]/components/global/Loader/Loader';
import { notification, Space, Spin } from 'antd';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { RiDeleteBin5Line } from "react-icons/ri";


function ProductCard({ data, deleteItem, setDeleteItem, refreshCounte, setRefreshCounte,setInc, Inc, setDec,Dec ,setCurrentProductPrice,setCurrentProductId}: any) {

    const [isLoadingInc, setIsLoadingInc] = useState(false)
    const [isLoadingDec, setIsLoadingDec] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [arrayOfObjects, setArrayOfObjects] = useState<any[]>([]);
    const [quntitFromData, setQuantityFromData] = useState(0)
    const [priceFormData, setPriceFormData] = useState(0)
    const [refreshInc, setRefreshInc] = useState(false)
    const [refreshDec, setRefreshDec] = useState(false)

    const handleIncrease = async (currentNum: number) => {
        setIsLoadingInc(true);
        let count = (+currentNum + 1).toString();
        UpdateQuantity(data?.id, count)
            .then((res: any) => {
                console.log(res)
                if (res.status) {
                    setIsLoadingInc(false);
                    setInc(!Inc)
                    setRefreshCounte(!refreshCounte)
                    setCurrentProductPrice(data.product.price)
                    setRefreshInc(!refreshInc)
                    notification.success({
                        message: "تمت زيادة العدد"
                    })
                }
            })
            .catch((err: any) => {
                setIsLoadingInc(false);
                console.log(err)
                notification.error({
                    message: err.response.data.message
                })
            })
    }

    const handleDecrease = async (currentNum: number) => {
        setIsLoadingDec(true);
        let count = (+currentNum - 1).toString();
        console.log(count);
        UpdateQuantity(data?.id, count)
            .then((res: any) => {
                if (res.status) {
                    setIsLoadingDec(false);
                    setDec(!Dec)
                    setRefreshCounte(!refreshCounte)
                    setCurrentProductPrice(data.product.price )
                    setRefreshDec(!refreshDec)
                    if (+count == 0) {
                        setCurrentProductId(data.id)
                        notification.success({
                            message: "تم حذف المتج من السلة"
                        })
                    } else {
                        notification.success({
                            message: "تمت تنقيص العدد"
                        })
                    }
                }
            })
            .catch((err: any) => {
                setIsLoadingDec(false);
                console.log(err)
                notification.error({
                    message: err.response.data.message
                })
            })
    }

    const handleDeleteItem = async () => {
        setIsLoading(true)
        UpdateQuantity(data?.id, "0")
            .then((res: any) => {
                console.log(res)
                if (res.status) {
                    setCurrentProductId(data.id)
                    setIsLoading(false)
                    notification.success({
                        message: "تمت حذف الممنج من السلة"
                    })
                    setDeleteItem(!deleteItem)
                }
            })
            .catch((err: any) => {
                console.log(err)
                setIsLoading(false)
                notification.error({
                    message: err.response.data.message
                })
            })
    }

    useEffect(() => {
        setQuantityFromData(quntitFromData - 1)
        setPriceFormData(priceFormData / 2)
    }, [refreshDec])

    useEffect(() => {
        setQuantityFromData(quntitFromData + 1)
        setPriceFormData(priceFormData * 2)
    }, [refreshInc])

    // useEffect(() => {
    //     if (data) {
    //         setQuantityFromData(+data?.quantity);
    //         setPriceFormData(data?.price)
    //         let parsedDetails;
    //         try {
    //             parsedDetails = JSON.parse(data.details);
    //         } catch (error) {
    //             console.error("Error parsing JSON:", error);
    //             return;
    //         }
    //         let newArrayOfObjects: any[] = [];
    //         for (let key in parsedDetails) {
    //             if (parsedDetails.hasOwnProperty(key)) {
    //                 let newObject: any = { label: key, value: parsedDetails[key] };
    //                 newArrayOfObjects.push(newObject);
    //             }
    //         }

    //         setArrayOfObjects(newArrayOfObjects);
    //     }
    // }, [data]);

    return (
        <div className='p-5 border-2 border-gray-200 rounded-lg my-3'>
            <Loader isLoading={isLoading} />
            <div className='grid grid-cols-[8%_84%_5%] gap-4'>

                {/* Start Image */}
                <div>
                    <Image src={data?.product?.images[0]} alt={"data.id"} width={100} height={110} className='rounded-lg !w-[100px] !h-[110px] border-2 ' />
                </div>
                {/* End Image */}

                {/* Start info */}
                <div className=''>
                    <h1 className='text-gray-600'>{data?.product?.name}</h1>
                    <p className='text-base text-[#555] my-1'>Quantity: {data.quantity}</p>

                    {/* Start Details */}
                    <div className="flex items-center justify-between w-1/2 my-1">
                        {arrayOfObjects.map((item) => {
                            return (
                                <div className="flex items-center bg-white border-gray-300 border-2 rounded-md mx-2" key={item.id}>
                                    <span className="p-2 text-base lg:text-lg ">
                                        {item.value}
                                    </span>
                                    <span className=" p-2 text-lg lg:text-xl text-[#006496]">
                                          {item.label}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                    {/* End Details */}
                    <p className='text-[#006496] text-lg my-1'> {priceFormData} tl</p>
                </div>
                {/* End info */}

                {/* Start Delete And Inc Dec */}
                <div>
                    <div className='border-2 border-400 rounded-xl relative'>

                        <button onClick={() => { handleIncrease(quntitFromData) }} className='block mx-auto text-center text-gray-500 cursor-pointer text-2xl font-semibold hover:scale-125 transition-all duration-150' >

                            {isLoadingInc ?
                                <div className="flex items-center justify-center">
                                    <Space size="large">
                                        <Spin size="large" />
                                    </Space></div> : "+"
                            }
                        </button>
                        <div className='text-center text-gray-500 mt-1'>{quntitFromData}</div>
                        <button onClick={() => { handleDecrease(quntitFromData) }} className='block mx-auto text-center text-gray-500 cursor-pointer text-2xl font-semibold hover:scale-125 transition-all duration-150' >
                            {isLoadingDec ?
                                <div className="flex items-center justify-center">
                                    <Space size="large">
                                        <Spin size="large" />
                                    </Space></div> : "-"
                            }
                        </button>
                    </div>
                    <div className='border-2 border-400 rounded-xl p-3 mt-1 flex items-center justify-center'>
                        <RiDeleteBin5Line onClick={() => { handleDeleteItem() }} className='text-gray-500 cursor-pointer hover:scale-125 transition-all duration-150' />

                    </div>
                </div>
                {/* End Delete And Inc Dec */}
            </div>
        </div>
    )
}

export default ProductCard
