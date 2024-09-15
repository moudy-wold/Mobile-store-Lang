import React from "react";
import { IoIosOptions } from "react-icons/io";
import { Dropdown, Space, message, } from "antd";
import { FaUserCircle } from "react-icons/fa";
import type { MenuProps } from "antd";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { setTalker } from "@/app/[locale]/lib/todosSlice";
import { GetUsers } from "@/app/[locale]/api/message";

type Props = {
    _id: string;
    userName: string;
    phoneNumber: string;
    message: string[];
    role: string;
    timestamp: string;
    unseen: number;
    createdAt: string;
};
 function UserSidbar(users?: any) {
    const dispatch = useDispatch()
    const { talker } = useSelector((state: any) => state.counter)
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
            <div className="bg-white min-h-[50vh] ">
                <ul className="p-1">
                    {users?.users?.users?.map((item: Props) => (
                        <li
                            key={item._id}                              
                            onClick={() => { dispatch(setTalker(item)) }}
                            className={`grid grid-cols-[16%_70%_5%] gap-1 items-center p-1 border-2 border-gray-50 mb-1 rounded-lg cursor-pointer transition-all hover:scale-105 ${talker._id == item._id && "bg-[#006496] text-white"}`}
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
        </div>
    )
}

export default UserSidbar;