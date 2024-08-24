"use client";
import React, { useState } from "react";
import MessageSection from "@/app/[locale]/components/page/Admin/Message/Chat/MessagesSection";
import UserSidbar from "@/app/[locale]/components/page/Admin/Message/Chat/UserSidbar";
import { Dropdown, Space, message, MenuProps } from "antd";
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { MdDelete } from "react-icons/md";
import { IoIosOptions } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { setTalker } from "@/app/[locale]/lib/todosSlice";
type Props = {
    _id: string;
    userName: string;
    phoneNumber: string;
    message: string;
    role: string;
    timestamp: string;
    unseen: number;
    createdAt: string;
}[];
function PageContent(users?:any) {

    const dispatch = useDispatch()
    const { talker } = useSelector((state: any) => state.counter)
    const [currentTab, setCurrentTab] = useState(true) 
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        message.info('Click on menu item.');
    };

    const items: MenuProps["items"] = [
        {
            label: <span className="flex items-center "> <MdDelete className="ml-1" />حذف المحادثة </span>,
            key: "1",
        },
    ];
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <div>
            {/* lg Screen */}
            <div className="hidden lg:grid grid-cols-[25%_74%] gap-2 h-[75vh]">
                <div className="overflow-y-scroll overflow-x-hidden h-[75vh]">
                    <UserSidbar users={users}/>
                </div>
                <div className="h-[75vh]">
                    <MessageSection />
                </div>
            </div>
            {/* Mobile Screen */}
            <div className="block lg:hidden w-screen !h-[94vh] overflow-hidden  ">
                <div className="flex itemsc-enter justify-end mb-2">
                    <div id="shares-slider-prev-arrow-button" className={`${currentTab && "bg-[#006496] text-white"} w-1/2 flex items-center justify-center py-3 text-[#006496] transition-all duration-200`}>
                        <p className="text-2xl "> المحادثات</p>
                    </div>
                    <div id="shares-slider-next-arrow-button" className={`${!currentTab && "bg-[#006496] text-white"} w-1/2 flex items-center justify-center py-3 text-[#006496] transition-all duration-200`}>
                        <p className="text-2xl "> الدردشة</p>
                    </div>
                </div>
                <Swiper
                    className="!overflow-hidden "
                    cssMode={true}
                    modules={[Navigation]}
                    navigation={{
                        nextEl: '#shares-slider-next-arrow-button',
                        prevEl: '#shares-slider-prev-arrow-button',
                        disabledClass: 'swiper-button-disabled',
                    }}
                    onSlideChange={() => { currentTab ? setCurrentTab(!currentTab) : setCurrentTab(!currentTab) }}
                >

                    <SwiperSlide key={"1"} className="">

                        <div className="bg-white min-h-[50vh] ">
                            <ul className="p-1 ">
                            {users?.users?.map((item: any) => (
                                    <li
                                        key={item._id}
                                        id="shares-slider-next-arrow-button"
                                        onClick={() => { dispatch(setTalker(item)) }}
                                        className={`grid grid-cols-[16%_70%_5%] gap-1 items-center p-1 border-2 border-gray-50 mb-1 rounded-lg transition-all ${talker._id == item._id && "bg-[#006496] text-white"}`}
                                    >
                                        <div>
                                            <FaUserCircle className="text-3xl" />
                                        </div>
                                        <div>
                                            <p className="text-sm">{item.userName}</p>
                                            <p className="text-sm">{item.phoneNumber}</p>
                                        </div>
                                        <div>
                                            <Space wrap>
                                                <Dropdown menu={menuProps}>
                                                    <IoIosOptions />
                                                </Dropdown>{" "}
                                            </Space>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </SwiperSlide>
                    <SwiperSlide key={"2"} className="">

                        <MessageSection />

                    </SwiperSlide>

                </Swiper>
            </div>
        </div>
    )
}

export default PageContent;