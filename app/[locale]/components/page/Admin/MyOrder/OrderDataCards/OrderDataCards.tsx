"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
function OrderDataCards({ data }: any) {
    const [arrayOfObjects, setArrayOfObjects] = useState<any[]>([]);

    useEffect(() => {       
        if (data) {     
            console.log(data)       
            let parsedDetails;
            try {
                parsedDetails = JSON.parse(data?.order_details?.details);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                return;
            }
            let newArrayOfObjects: any[] = [];
            for (let key in parsedDetails) {
                if (parsedDetails.hasOwnProperty(key)) {
                    let newObject: any = { label: key, value: parsedDetails[key] };
                    newArrayOfObjects.push(newObject);
                }
            }

            setArrayOfObjects(newArrayOfObjects);
        }
    }, [data]);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.order_details.map((item: any, index: number) => (
                <div key={index}>
                    <div className='p-5 border-2 border-gray-200 rounded-lg my-3'>
                        <div className='grid grid-cols-[20%_79%] gap-4'>

                            {/* Start Image */}
                            <div>
                                <Image src={item?.products.length ? item?.products?.images[0] : "/"} alt={"data.id"} width={100} height={145} className='rounded-lg !w-[100px] !h-[100px] border-2 ' />
                            </div>
                            {/* End Image */}

                            {/* Start Details */}
                            <div className=''>
                                <h1 className='text-gray-600'>{item?.product_name}</h1>
                                {/* Start Details */}
                                <div className="flex items-center justify-between w-1/2 my-1">
                                    {arrayOfObjects.map((item) => {
                                        return (
                                            <div className="bg-white border-gray-300 border-2 rounded-md" key={item.id}>
                                                <span className=" p-2 px-5 text-lg lg:text-xl text-[#006496]">
                                                    {item.label}
                                                </span>
                                                <span className="p-2 text-base lg:text-lg">
                                                    {item.value}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                                {/* End Details */}
                                <p className='text-base text-[#555] my-1'>Quantity: {item?.quantity}</p>
                                <p className='text-[#006496] text-lg my-1'> {item?.price} tl</p>
                            </div>
                            {/* End Details */}


                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default OrderDataCards;