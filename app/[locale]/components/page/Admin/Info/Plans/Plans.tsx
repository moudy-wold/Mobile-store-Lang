"use client";
import React, { useState, useEffect } from "react";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { notification } from "antd";
import { GetAllPlans } from "@/app/[locale]/api/plans";
import Slider from "react-slick";
import Image from "next/image";

function CustomPrevArrow({ props }: any) {
    const { onClick } = props || {};
    return (
        <div
            className={`hidden md:block   absolute -left-8 top-1/3 cursor-pointer z-50 bg-[#808080] rounded-full p-2 px-[10px]  `}        
            onClick={onClick}
        >
            <svg
                width="10"
                height="15"
                viewBox="0 0 17 31"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M16.3785 30.2247C16.9052 29.698 16.953 28.8738 16.5221 28.2931L16.3785 28.1267L3.58202 15.3295L16.3785 2.53241C16.9052 2.00573 16.953 1.18156 16.5221 0.60079L16.3785 0.434402C15.8518 -0.0922775 15.0276 -0.140158 14.4469 0.290762L14.2805 0.434402L0.434343 14.2805C-0.0923367 14.8072 -0.140217 15.6314 0.290703 16.2122L0.434343 16.3785L14.2805 30.2247C14.8598 30.804 15.7991 30.804 16.3785 30.2247Z"
                    fill="#fff"
                />
            </svg>
        </div>
    );
}


function CustomNextArrow({ props }: any) {
    const {    onClick } =  props || {};
    return (
        <div
            className={`!hidden md:!block   absolute top-1/3 -right-8 rotate-180  cursor-pointer bg-[#808080] rounded-full p-2 px-[10px] `}
             
            onClick={onClick}
        >
            <svg
                width="10"
                height="15"
                viewBox="0 0 17 31"
                fill="#FFF"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M16.3785 30.2247C16.9052 29.698 16.953 28.8738 16.5221 28.2931L16.3785 28.1267L3.58202 15.3295L16.3785 2.53241C16.9052 2.00573 16.953 1.18156 16.5221 0.60079L16.3785 0.434402C15.8518 -0.0922775 15.0276 -0.140158 14.4469 0.290762L14.2805 0.434402L0.434343 14.2805C-0.0923367 14.8072 -0.140217 15.6314 0.290703 16.2122L0.434343 16.3785L14.2805 30.2247C14.8598 30.804 15.7991 30.804 16.3785 30.2247Z"
                    fill="#fff"
                />
            </svg>
        </div>
    );
}

function Plans(props:any) {
    const [isMobile, setIsMobile] = useState(false);
    const [data, setData] = useState([]);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    let sliderItems: JSX.Element[] = [];
    if (isMobile) {
        sliderItems = data?.map((item:any, index:number) => {
            return (
                <div key={index} className="py-12 lg:p-5">
                    <div
                        key={index}
                        // style={{ direction: `${locale == "ar" ? "rtl" : "ltr"}` }}
                        // ${plane?.id == item.id ? " border-mainColor " : "border-[#d5dfff]"}
                        className={` border-2 px-6 pt-10 pb-5 mx-1 flex-col gap-5 relative
                `}
                    >
                        {/* Start Popular */}
                        {item.feature && (
                            <div className="absolute -top-12 -left-[1px] w-[calc(100%+2px)] h-12 pb-1 rounded-t-lg bg-mainColor text-white text-lg font-semibold flex items-center justify-center">
                                {("popular")}
                            </div>
                        )}
                        {/* End Popular */}

                        {/* Start Title */}
                        <div className="">
                            <h1 className="text-mainColor font-semibold text-2xl lg:text-xl uppercase ">
                                {item.name}
                            </h1>
                            <p className="mt-3 text-sm !h-10">{item.description}</p>
                        </div>
                        {/* End Title */}

                        {/* Start Mouny   */}
                        <div className="">
                            {/* Start discount */}
                            <div className="flex items-center mt-6">
                                <span className="text-gray-400 line-through text-lg">
                                    <span className="">TRY</span>
                                    {item.price}
                                </span>
                                <span className="mx-2 mt-1 px-2 pt-1 pb-2 font-semibold text-mainColor bg-[#d5dfff99] text-center rounded-3xl">
                                    {item.discount}
                                </span>
                            </div>
                            {/* end discount */}

                            {/* Start price */}
                            <div className="flex items-end gap-1 my-5">
                                <span className="text-lg -mb-1">TRY</span>
                                <span className="text-[48px] text-mainColor font-semibold leading-10">
                                    {item.discounted_price}
                                </span>
                                <span className="">/{item.duration}</span>
                            </div>
                            {/* End price */}

                            {/* Start Submit button   */}
                            <div className="my-10">
                                <button
                                    onClick={() => {
                                      console.log(item)
                                    }}
                                    className=" block p-3 font-semibold text-white bg-[#0f4e7a] rounded-lg w-full border-[1px] border-[#0f4e7a] hover:text-[#0f4e7a] hover:bg-white transition-all duration-300"
                                >
                                    {("choose_plan")}
                                </button>
                            </div>
                            {/* End Submit button   */}

                            {/* Start Plan Deails */}
                            <div className=" border-t-2 border-gray-300 p-7">
                                <ul className="flex flex-col gap-4">
                                    <li className="flex items-center gap-2  w-fit cursor-pointer ">
                                        <Image
                                            src="/assets/svg/correct.svg"
                                            alt="ش"
                                            height={10}
                                            width={10}
                                        />
                                        <span className="border-b-2 border-dotted border-gray-400 relative ">
                                            {("count_of_customer")} : {" "}
                                            {item.max_customer == "-1" ? ("open") : item.max_customer}
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2  w-fit cursor-pointer ">
                                        <Image
                                            src="/assets/svg/correct.svg"
                                            alt="ش"
                                            height={10}
                                            width={10}
                                        />
                                        <span className="border-b-2 border-dotted border-gray-400 relative ">
                                            {("max_repair_service")}  : {" "}
                                            {item.max_repair_service == "-1" ? ("open") : item.max_repair_service}
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2  w-fit cursor-pointer ">
                                        <Image
                                            src="/assets/svg/correct.svg"
                                            alt="ش"
                                            height={10}
                                            width={10}
                                        />
                                        <span className="border-b-2 border-dotted border-gray-400 relative ">
                                            {("max_products")} : {" "}
                                            {item.max_products == "-1" ? ("open") : item.max_products}
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2  w-fit cursor-pointer ">
                                        <Image
                                            src="/assets/svg/correct.svg"
                                            alt="ش"
                                            height={10}
                                            width={10}
                                        />
                                        <span className="border-b-2 border-dotted border-gray-400 relative ">
                                            {("number_of_administrator")} : {" "}
                                            {item.max_employee == "-1" ? ("open") : item.max_employee}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            {/* End Plan Deails */}
                        </div>
                        {/* End Mouny  */}
                    </div>
                </div>
            );
        });
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await GetAllPlans();
                console.log(res.data)
                setData(res?.data?.data)
            }
            catch (err: any) {
                console.log(err)
                notification.error({
                    message: err.response.data.message
                })
            }
        }
        getData();
        if (window.innerWidth < 1023) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [])

    return (
        <div className="">
            <div className="">
                <h2>
                    <button
                        type="button"
                        className={`flex items-center justify-center p-3 my-10 rounded-lg  border-2 border-[#006496] bg-[#006496]  hover:bg-white font-semibold py-2 text-white  hover:text-[#006496]  hover:[&{sapn}]:text-[#006496] transition-all duration-150 ${props.slidePlans ? " [&{sapn}]:!text-white  " : " "}  `}
                        onClick={() => { props.setSlidePlans(!props.slidePlans); }}
                        aria-expanded={props.slidePlans}
                        aria-controls="faqs-text-01"
                    >
                        <span className="" >عرض الخطط  </span>

                    </button>
                </h2>

                <div
                    id="faqs-text-01"
                    role="region"
                    aria-labelledby="faqs-title-01"
                    className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${props.slidePlans ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"} `}
                >
                    <div className="overflow-hidden">
                        <div className="">
                            <div>
                                {!isMobile ? (
                                    <div className="grid grid-cols-3 gap-5">
                                        {data?.map((item: any, index: number) => (
                                            <div
                                                key={index}
                                                //   ${plane?.id == item.id? " border-mainColor ": "border-[#d5dfff]" }
                                                className={`hidden lg:block border-[1px] px-6 pt-10 pb-5 flex-col gap-5 relative
                 `}
                                            >
                                                {/* Start Popular */}
                                                {item?.feature && (
                                                    <div className="absolute -top-12 -left-[1px] w-[calc(100%+2px)] h-12 pb-1 rounded-t-lg bg-mainColor text-white text-lg font-semibold flex items-center justify-center">
                                                        {("popular")}
                                                    </div>
                                                )}
                                                {/* End Popular */}

                                                {/* Start Title */}
                                                <div className="">
                                                    <h1 className="text-mainColor font-semibold text-xl uppercase ">
                                                        {item?.name}
                                                    </h1>
                                                    <p className="mt-3 text-sm !h-10">{item?.description}</p>
                                                </div>
                                                {/* End Title */}

                                                {/* Start Mouny   */}
                                                <div className="">
                                                    {/* Start discount */}
                                                    <div className="flex items-center mt-6">
                                                        <span className="text-gray-400 line-through text-lg">
                                                            <span className="">TRY </span>
                                                            {item?.price}
                                                        </span>
                                                        <span className="mx-2 mt-1 px-2 pt-1 pb-2 font-semibold text-mainColor bg-[#d5dfff99] text-center rounded-3xl">
                                                            {item?.discount}
                                                        </span>
                                                    </div>
                                                    {/* end discount */}

                                                    {/* Start price */}
                                                    <div className="flex items-end gap-1 my-5">
                                                        <span className="text-lg -mb-1">TRY</span>
                                                        <span className="text-[48px] text-mainColor font-semibold leading-10">
                                                            {item?.discounted_price}
                                                        </span>
                                                        <span className="">/{item?.duration}</span>
                                                    </div>
                                                    {/* End price */}

                                                    {/* Start Submit button   */}
                                                    <div className="my-10">
                                                        <button
                                                            onClick={() => {

                                                                console.log("asd")

                                                            }}
                                                            className=" block p-3 font-semibold text-white bg-[#0f4e7a] rounded-lg w-full border-[1px] border-[#0f4e7a] hover:text-[#0f4e7a] hover:bg-white transition-all duration-300"
                                                        >
                                                            {("choose_plan")}
                                                        </button>
                                                    </div>
                                                    {/* End Submit button   */}

                                                    {/* Start Plan Deails */}
                                                    <div className=" border-t-2 border-gray-300 p-7">
                                                        <ul className="flex flex-col gap-4">
                                                            <li className="flex items-center gap-2  w-fit cursor-pointer hover:scale-110 transition-all duration-150 ">
                                                                <Image
                                                                    src="/assets/svg/correct.svg"
                                                                    alt="ش"
                                                                    height={10}
                                                                    width={10}
                                                                />
                                                                <span className="border-b-2 border-dotted border-gray-400 relative ">
                                                                    {("count_of_customer")} : {" "}
                                                                    {item?.max_customer == "-1" ? ("open") : item?.max_customer}
                                                                </span>
                                                            </li>
                                                            <li className="flex items-center gap-2  w-fit cursor-pointer hover:scale-110 transition-all duration-150">
                                                                <Image
                                                                    src="/assets/svg/correct.svg"
                                                                    alt="ش"
                                                                    height={10}
                                                                    width={10}
                                                                />
                                                                <span className="border-b-2 border-dotted border-gray-400 relative ">
                                                                    {("max_repair_service")} : {" "} {item?.max_repair_service == "-1" ? ("open") : item?.max_repair_service}
                                                                </span>
                                                            </li>
                                                            <li className="flex items-center gap-2  w-fit cursor-pointer hover:scale-110 transition-all duration-150">
                                                                <Image
                                                                    src="/assets/svg/correct.svg"
                                                                    alt="ش"
                                                                    height={10}
                                                                    width={10}
                                                                />
                                                                <span className="border-b-2 border-dotted border-gray-400 relative ">
                                                                    {("max_products")} : {" "}
                                                                    {item?.max_products == "-1" ? ("open") : item?.max_products}
                                                                </span>
                                                            </li>
                                                            <li className="flex items-center gap-2  w-fit cursor-pointer hover:scale-110 transition-all duration-150 ">
                                                                <Image
                                                                    src="/assets/svg/correct.svg"
                                                                    alt="ش"
                                                                    height={10}
                                                                    width={10}
                                                                />
                                                                <span className="border-b-2 border-dotted border-gray-400 relative ">
                                                                    {("number_of_administrator")} : {" "}
                                                                    {item?.max_employee == "-1" ? ("open") : item?.max_employee}
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    {/* End Plan Deails */}
                                                </div>
                                                {/* End Mouny  */}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="plans block lg:hidden">
                                        <div className=" ">
                                            <Slider
                                                {...settings}
                                                prevArrow={<CustomPrevArrow />}
                                                nextArrow={<CustomNextArrow />}
                                            >
                                                {sliderItems}
                                            </Slider>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Plans