"use client";
import React, { useState, useEffect } from "react";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { notification } from "antd";
import { GetAllPlans, GetPaymentMethod, UpdatePlane } from "@/app/[locale]/api/plans";
import Slider from "react-slick";
import Image from "next/image";
import Popup from "./Popup/Popup";

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
    const { onClick } = props || {};
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

function Plans(props: any) {
    const [isMobile, setIsMobile] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [data, setData] = useState([]);
    const [payment_method_data, setPayment_method_data] = useState([]);
    const [plane, setPlane] = useState<any>({});
    const [endPlane, setEndPlane] = useState<any>({});
    const [selected, setSelected] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [noSelectedPaymentMethod, setNoSelectedPaymentMethod] = useState(false);
    const [copied, setCopied] = useState(false);
    const [copiedID, setCopiedID] = useState();
    const [copiedName, setCopiedName] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const [formValuesForUpdate, setFormValuesForUpdate] = useState<any>({
        plan_id: "",
        plan_price_id: "",
        payment_method_id: "",
        receipt: null,
        domain: "",
        password: "",
    });

    const handleChange = (e: any) => {
        const { name, type, files, value } = e.target;
        if (type === "file") {
            setFormValuesForUpdate((prevValues: any) => ({ ...prevValues, receipt: files[0] }));
        } else {
            setFormValuesForUpdate((prevValues: any) => ({ ...prevValues, [name]: value, }));
        }
    };

    const handleDetChange = (newDet: any) => {
        const updatedPlane = { ...plane, plan_prices: newDet[0] };
        setEndPlane(updatedPlane);
    };

    const copyToClipboard = (text: any) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const onFinish = async (e: any) => {
setIsLoading(true)
        e.preventDefault();
        const formData = new FormData();
        
        formData.append("plan_id", plane.id);
        formData.append("plan_price_id", selected);
        formData.append("payment_method_id", selectedPaymentMethod);
        formData.append("domain", formValuesForUpdate.domain);
        formData.append("password", formValuesForUpdate.password);
        if (formValuesForUpdate.receipt) {
            formData.append("receipt", formValuesForUpdate.receipt);
        }
      
        if (selected == "") {
            notification.error({ message: "الرجاء إختيار طريقة الدفع " });
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsLoading(false)
        } else {
            try {
                const res = await UpdatePlane(formData)
                setIsLoading(false)
                notification.success({
                    message: " تم تجديد إشتراككم و تفعيل  حسابكم بنجاح"
                });

                setOpenPopup(true);
            } catch (err: any) {
                console.log(err.response.data);
                setIsLoading(false)
                notification.error({
                    message: err.response.data.message
                });
            }

        }
    
    }



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    let sliderItems: JSX.Element[] = [];
    if (isMobile) {
        sliderItems = data?.map((item: any, index: number) => {
            return (
                <div key={index} className="py-12 px-3 lg:p-5">
                    <div
                        key={index}
                        // style={{ direction: `${locale == "ar" ? "rtl" : "ltr"}` }}
                        // 
                        className={` border-2 ${plane?.id == item.id ? " border-[#006496] " : "border-[#d5dfff]"} px-6 pt-10 pb-5 mx-1 flex-col gap-5 relative
                `}
                    >
                        {/* Start Popular */}
                        {item.feature && (
                            <div className="absolute -top-12 -left-[1px] w-[calc(100%+2px)] h-12 pb-1 rounded-t-lg bg-[#006496] text-white text-lg font-semibold flex items-center justify-center">
                                {("popular")}
                            </div>
                          )}
                        {/* End Popular */}

                        {/* Start Title */}
                        <div className="">
                            <h1 className="text-[#006496] font-semibold text-2xl lg:text-xl uppercase ">
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
                                <span className="mx-2 mt-1 px-2 pt-1 pb-2 font-semibold text-[#006496] bg-[#d5dfff99] text-center rounded-3xl">
                                    {item.discount}
                                </span>
                            </div>
                            {/* end discount */}

                            {/* Start price */}
                            <div className="flex items-end gap-1 my-5">
                                <span className="text-lg -mb-1">TRY</span>
                                <span className="text-[48px] text-[#006496] font-semibold leading-10">
                                    {item.discounted_price}
                                </span>
                                <span className="">/{item.duration}</span>
                            </div>
                            {/* End price */}

                            {/* Start Submit button   */}
                            <div className="my-10">
                                <button
                                    onClick={() => {
                                        setPlane(item)

                                        setSelected(item?.plan_prices[2].id);
                                        setTimeout(() => {
                                            window.scrollTo({ top: 1300, behavior: "smooth" });
                                        }, 200)
                                    }}
                                    className=" block p-3 font-semibold text-white bg-[#0f4e7a] rounded-lg w-full border-[1px] border-[#0f4e7a] hover:text-[#0f4e7a] hover:bg-white transition-all duration-300"
                                >
                                    إختيار الخطة
                                </button>
                            </div>
                            {/* End Submit button   */}

                            {/* Start Plan Deails */}
                            <div className=" border-t-2 border-gray-300 p-7">
                                <ul className="flex flex-col gap-4">
                                    <li className="flex items-center gap-2  w-fit cursor-pointer ">
                                        <Image
                                            src="/assets/correct.svg"
                                            alt="jش"
                                            height={10}
                                            width={10}
                                        />
                                        <span className="border-b-2 border-dotted border-gray-400 relative ">
                                            {("عدد الزبائن المسموح")} : {" "}
                                            {item.max_customer == "-1" ? ("open") : item.max_customer}
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2  w-fit cursor-pointer ">
                                        <Image
                                            src="/assets/correct.svg"
                                            alt="wش"
                                            height={10}
                                            width={10}
                                        />
                                        <span className="border-b-2 border-dotted border-gray-400 relative  ">
                                            {("عدد الصيانات المسموح")}  : {" "}
                                            {item.max_repair_service == "-1" ? ("open") : item.max_repair_service}
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2  w-fit cursor-pointer ">
                                        <Image
                                            src="/assets/correct.svg"
                                            alt="cش"
                                            height={10}
                                            width={10}
                                        />
                                        <span className="border-b-2 border-dotted border-gray-400 relative ">
                                            {("عدد المنتجات المسموح ")} : {" "}
                                            {item.max_products == "-1" ? ("open") : item.max_products}
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2  w-fit cursor-pointer ">
                                        <Image
                                            src="/assets/correct.svg"
                                            alt="caش"
                                            height={10}
                                            width={10}
                                        />
                                        <span className="border-b-2 border-dotted border-gray-400 relative ">
                                            {("عدد الموظفين ")} : {" "}
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
                setData(res?.data?.data)
            }
            catch (err: any) {
                console.log(err)
                notification.error({
                    message: err.response.data.message
                })
            }
        };
        const getPaymentMethod = async () => {
            try {
                const res = await GetPaymentMethod();
                setPayment_method_data(res?.data?.data)
            }
            catch (err: any) {
                console.log(err)
                notification.error({
                    message: err.response.data.message
                })
            }
        };

        getPaymentMethod();
        getData();


        if (window.innerWidth < 1023) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [])

    return (
        <div className="">
            {<Loader isLoading={isLoading} />}
            <div className={`${Object.keys(props).length == 0 && "mt-20 mx-10 lg:mt-24 lg:mx-32 "}`}>
                {Object.keys(props).length == 0 && <>

                    < div className="w-fit my-5 mx-auto flex items-center gap-3">
                        <Image
                            src="/assets/correct.svg"
                            alt="correct"
                            height={20}
                            width={25}
                            className=""
                        />
                        <p className="text-lg">ضمان استرداد الأموال خلال 30 يومًا</p>
                    </div>


                    <h1 className="mx-auto w-fit text-3xl mt-10 mb-0 lg:my-10"> تجديد الإشتراك</h1></>}
                <h2>
                    <button
                        type="button"
                        className={`${props.slidePlans ? "flex" : "hidden"} items-center justify-center p-3 my-10 rounded-lg  border-2 border-[#006496] bg-[#006496]  hover:bg-white font-semibold py-2 text-white  hover:text-[#006496]  hover:[&{sapn}]:text-[#006496] transition-all duration-150 ${props?.slidePlans ? " [&{sapn}]:!text-white  " : " "}  `}
                        onClick={() => {
                            setTimeout(() => {
                                window.scrollTo({ top: 1600, behavior: "smooth" });
                            }, 300); props?.setSlidePlans(!props?.slidePlans);
                        }}
                        aria-expanded={props?.slidePlans}
                        aria-controls="faqs-text-01"
                    >
                        <span className="" >عرض الخطط  </span>

                    </button>
                </h2>

                <div
                    id="faqs-text-01"
                    role="region"
                    aria-labelledby="faqs-title-01"
                    className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${Object.keys(props).length == 0 ? "grid-rows-[1fr] opacity-100" : props.slidePlans && "grid-rows-[0fr] opacity-0"} `}
                >
                    <div className="overflow-hidden">
                        <div className="">
                            <div>
                                {!isMobile ? (
                                    <div className="my-12 grid grid-cols-3 gap-5">
                                        {data?.map((item: any, index: number) => (
                                            <div
                                                key={index}
                                                //
                                                className={`hidden lg:block border-[3px]    ${plane?.id == item.id ? " border-[#006496] " : "border-[#d5dfff]"} px-6 pt-10 pb-5 flex-col gap-5 relative
                 `}
                                            >
                                                {/* Start Popular */}
                                                {item?.feature && (
                                                    <div className="absolute -top-12 -left-[1px] w-[calc(100%+2px)] h-12 pb-1 rounded-t-lg bg-[#006496] text-white text-lg font-semibold flex items-center justify-center">
                                                        {("popular")}
                                                    </div>
                                                )}
                                                {/* End Popular */}

                                                {/* Start Title */}
                                                <div className="">
                                                    <h1 className="text-[#006496] font-semibold text-xl uppercase ">
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
                                                        <span className="mx-2 mt-1 px-2 pt-1 pb-2 font-semibold text-[#006496] bg-[#d5dfff99] text-center rounded-3xl">
                                                            {item?.discount}
                                                        </span>
                                                    </div>
                                                    {/* end discount */}

                                                    {/* Start price */}
                                                    <div className="flex items-end gap-1 my-5">
                                                        <span className="text-lg -mb-1">TRY</span>
                                                        <span className="text-[48px] text-[#006496] font-semibold leading-10">
                                                            {item?.discounted_price}
                                                        </span>
                                                        <span className="">/{item?.duration}</span>
                                                    </div>
                                                    {/* End price */}

                                                    {/* Start Submit button   */}
                                                    <div className="my-10">
                                                        <button
                                                            onClick={() => {
                                                                setPlane(item)
                                                                setTimeout(() => {
                                                                    window.scrollTo({ top: 1300, behavior: "smooth" });
                                                                    setSelected(item?.plan_prices[2].id);
                                                                }, 200)
                                                            }}
                                                            className=" block p-3 font-semibold text-white bg-[#0f4e7a] rounded-lg w-full border-[1px] border-[#0f4e7a] hover:text-[#0f4e7a] hover:bg-white transition-all duration-300"
                                                        >
                                                            إختيار الخطة
                                                        </button>
                                                    </div>
                                                    {/* End Submit button   */}

                                                    {/* Start Plan Deails */}
                                                    <div className=" border-t-2 border-gray-300 p-7">
                                                        <ul className="flex flex-col gap-4">
                                                            <li className="flex items-center gap-2  w-fit cursor-pointer hover:scale-110 transition-all duration-150 ">
                                                                <Image
                                                                    src="/assets/correct.svg"
                                                                    alt="1ش"
                                                                    height={10}
                                                                    width={10}
                                                                />
                                                                <span className="border-b-2 border-dotted border-gray-400 relative text-lg ">
                                                                    {("عدد الزبائن المسموح")} : {" "}
                                                                    {item?.max_customer == "-1" ? ("open") : item?.max_customer}
                                                                </span>
                                                            </li>
                                                            <li className="flex items-center gap-2  w-fit cursor-pointer hover:scale-110 transition-all duration-150">
                                                                <Image
                                                                    src="/assets/correct.svg"
                                                                    alt="ش2"
                                                                    height={10}
                                                                    width={10}
                                                                />
                                                                <span className="border-b-2 border-dotted border-gray-400 relative text-lg">
                                                                    {("عدد الصيانات المسموح")} : {" "} {item?.max_repair_service == "-1" ? ("open") : item?.max_repair_service}
                                                                </span>
                                                            </li>
                                                            <li className="flex items-center gap-2  w-fit cursor-pointer hover:scale-110 transition-all duration-150">
                                                                <Image
                                                                    src="/assets/correct.svg"
                                                                    alt="4ش"
                                                                    height={10}
                                                                    width={10}
                                                                />
                                                                <span className="border-b-2 border-dotted border-gray-400 relative text-lg">
                                                                    {("عدد المنتجات المسموح ")} : {" "}
                                                                    {item?.max_products == "-1" ? ("open") : item?.max_products}
                                                                </span>
                                                            </li>
                                                            <li className="flex items-center gap-2  w-fit cursor-pointer hover:scale-110 transition-all duration-150 ">
                                                                <Image
                                                                    src="/assets/correct.svg"
                                                                    alt="3ش"
                                                                    height={10}
                                                                    width={10}
                                                                />
                                                                <span className="border-b-2 border-dotted border-gray-400 relative text-lg">
                                                                    {("عدد الموظفين ")} : {" "}
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

                {/* Start Prices Plane */}
                <div className="">
                    {plane.plan_prices && (
                        <>
                            <div className="">
                                <h1 className="text-2xl my-10">2. {("تحديد الخطة الزمنية")}</h1>
                            </div>
                            <div className="my-20    grid grid-cols-1 lg:grid-cols-4 lg:gap-7 ">
                                {plane.plan_prices?.map((item: any, index: number) => (
                                    <div
                                        key={index}
                                        className={`cursor-pointer bg-white ${selected == item.id
                                            ? "border-[#006496] border-2"
                                            : "border-gray-300 border-2"
                                            }  relative my-6 lg:my-0`}
                                        onClick={() => {
                                            setSelected(item.id);
                                            handleDetChange([item]);
                                        }}
                                    >
                                        <div className="p-4 pt-8 pb-0">
                                            {/* Start Sale Desc */}
                                            <div
                                                className={`${item.duration == selected
                                                    ? "bg-[#006496]"
                                                    : "bg-gray-200"
                                                    } rounded-2xl p-2  absolute -top-4 left-1/2 -translate-x-1/2 w-[140px] `}
                                            >
                                                <p
                                                    className={`${item.duration == selected
                                                        ? "text-white"
                                                        : "text-black"
                                                        } text-center text-xs `}
                                                >
                                                    {item.total_sale}
                                                </p>
                                            </div>
                                            {/* End Sale Desc */}
                                            <input
                                                type="radio"
                                                id={`plane-${index}`}
                                                name="duration"
                                                value={item.duration}
                                                className="absolute top-9 left-9"
                                                checked={selected === item.id} // Ensure radio reflects selection state
                                                onChange={(e) => {
                                                    setSelected(e.target.value);
                                                }}
                                            />

                                            {/* Start Duration */}
                                            <div className="w-fit mx-auto">
                                                <p className="">{item.duration}</p>
                                            </div>
                                            {/* End Duration */}

                                            {/* Start Price */}
                                            <div className="w-fit mx-auto mt-8 ">
                                                <p className=" text-gray-400 text-lg line-through font-semibold text-center">
                                                    {/* {item.currencyIcon}
                             */}
                                                    ₺{item.price}
                                                </p>
                                                <p className="font-bold text-[#006496] text-[50px] text-center">
                                                    {/* {item.currencyIcon} */}₺{item.discounted_price}
                                                </p>
                                                <p className="text-gray-500 text-center text-lg -mt-2 ">
                                                    TRY / {item.duration}
                                                </p>
                                            </div>
                                            {/* End Price */}

                                            {/* Start Desc */}
                                            <div className="!h-20">{item.description}</div>
                                            {/* End Desc */}
                                        </div>
                                        {/* Start Trial period */}
                                        <div
                                            className={`${selected == item.duration
                                                ? "bg-[#006496]"
                                                : "bg-gray-200"
                                                }  flex items-center justify-center p-3`}
                                        >
                                            <p
                                                className={`${selected == item.duration
                                                    ? "text-white"
                                                    : "textblack"
                                                    } `}
                                            >
                                                {("فترة تجريبية ل30 يوما")}
                                            </p>
                                        </div>
                                        {/* End Trial period */}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {Object.keys(plane).length > 0 && <>
                        <form className="mt-5" onSubmit={onFinish}>
                            <h1 className={`text-2xl font-semibold`}> البيانات الشخصية</h1>
                            {Object.keys(props).length == 0 &&
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 my-5">
                                        <input
                                            name="domain"
                                            type="text"
                                            required
                                            placeholder="أدخل إسم الدومين الخاص بك"
                                            value={formValuesForUpdate.domain}
                                            onChange={handleChange}
                                            className="cursor-pointer border-2 border-gray-300 outline-none p-4 rounded-xl"
                                        />
                                        <input
                                            name="password"
                                            type="password"
                                            required
                                            placeholder="أدخل كلمة السر الخاص بك"
                                            value={formValuesForUpdate.password}
                                            onChange={handleChange}
                                            className=" cursor-pointer border-2 border-gray-300 outline-none p-4 rounded-xl"
                                        />
                                    </div>
                                </div>
                            }
                                    <div className="">

                                        {/* Start Ibans */}
                                        <div className="grid lg:grid-cols-3 gap-5">
                                            {payment_method_data.map((item: any, index: any) => (
                                                <div
                                                    onClick={() => {
                                                        setNoSelectedPaymentMethod(false);
                                                        setSelectedPaymentMethod(item.id);
                                                    }}
                                                    key={item.id}
                                                    className={`border-2 ${noSelectedPaymentMethod ? "border-red-500" : "border-gray-300"
                                                        } rounded-lg p-2 mb-5 relative !h-36`}
                                                >
                                                    <input
                                                        type="radio"
                                                        id={`payment_type_${index}`}
                                                        name="duration"
                                                        value={item.id}
                                                        required
                                                        className="absolute top-4 left-4"
                                                        checked={selectedPaymentMethod === item.id} // Ensure radio reflects selection state
                                                        onChange={(e) => {
                                                            setSelectedPaymentMethod(e.target.value);
                                                        }}
                                                    />
                                                    <div>
                                                        <Image
                                                            src={item.image}
                                                            alt="item.image"
                                                            width={70}
                                                            height={70}
                                                            className="mt-2 mb-5"
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-between mb-4 mt-4">
                                                        <p className="">{item.iban}</p>
                                                        <button
                                                        type="button"   
                                                            onClick={() => {
                                                                copyToClipboard(item.iban);
                                                                setCopiedID(item.id);
                                                                setCopiedName(false);
                                                            }}
                                                            className={`${!copiedName &&
                                                                copiedID == item.id &&
                                                                copied &&
                                                                "bg-gray-400"
                                                                } hover:scale-110 transition-all duration-150 flex flex-col gap-1 justify-center items-center w-5 h-6 border-[2px] border-gray-300 rounded-md p-[2px]`}
                                                        >
                                                            <span
                                                                className={`${!copiedName && copiedID == item.id && copied
                                                                        ? "bg-white"
                                                                        : "bg-gray-400"
                                                                    } block h-[2px] rounded-md w-full  `}
                                                            ></span>
                                                            <span
                                                                className={`${!copiedName && copiedID == item.id && copied
                                                                        ? "bg-white"
                                                                        : "bg-gray-400"
                                                                    } block h-[2px] rounded-md w-full  `}
                                                            ></span>
                                                            <span
                                                                className={`${!copiedName && copiedID == item.id && copied
                                                                        ? "bg-white"
                                                                        : "bg-gray-400"
                                                                    } block h-[2px] rounded-md w-full  `}
                                                            ></span>
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <p className="">{item.name}</p>
                                                        <button
                                                        type="button"
                                                            onClick={() => {
                                                                copyToClipboard(item.name);
                                                                setCopiedID(item.id);
                                                                setCopiedName(true);
                                                            }}
                                                            className={`${copiedName &&
                                                                copiedID == item.id &&
                                                                copied &&
                                                                "bg-gray-400"
                                                                } hover:scale-110 transition-all duration-150 flex flex-col gap-1 justify-center items-center w-5 h-6 border-[2px] border-gray-300 rounded-md p-[2px]`}
                                                        >
                                                            <span
                                                                className={`${copiedName && copiedID == item.id && copied
                                                                        ? "bg-white"
                                                                        : "bg-gray-400"
                                                                    } block h-[2px] rounded-md w-full  `}
                                                            ></span>
                                                            <span
                                                                className={`${copiedName && copiedID == item.id && copied
                                                                        ? "bg-white"
                                                                        : "bg-gray-400"
                                                                    } block h-[2px] rounded-md w-full  `}
                                                            ></span>
                                                            <span
                                                                className={`${copiedName && copiedID == item.id && copied
                                                                        ? "bg-white"
                                                                        : "bg-gray-400"
                                                                    } block h-[2px] rounded-md w-full  `}
                                                            ></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {/* End Ibans */}

                                    </div>
                            <input
                                name="receipt"
                                type="file"
                                required
                                value={formValuesForUpdate.userName}
                                onChange={handleChange}
                                className="w-[99%] md:w-fit cursor-pointer border-2 border-gray-300 outline-none p-4 rounded-xl"
                            />
                            <label className="mx-3"> يمكنك تحميل الصور او ملف pdf</label>

                            <button
                                type="submit"
                                className=" bg-[#006496] hover:bg-white border-2 border-[#006496] rounded-lg hover:text-[#006496] transition-all duration-200 px-5 py-2 block text-xl my-5 text-white"
                            >
                                {("send")}
                            </button>
                        </form>
                    </>}
                </div>
                {/* End Prices Plane */}
            </div>
          {openPopup && <Popup  setOpenPopup={setOpenPopup} />}

        </div >
    )
}
export default Plans