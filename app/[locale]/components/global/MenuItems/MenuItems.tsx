"use client";
import React, { Fragment } from 'react'
import { Space, Spin, Menu, MenuProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CloseBurgerMenu, setcategoryId } from "@/app/[locale]/lib/todosSlice";
import { RxSection } from 'react-icons/rx';
import { TbJumpRope } from 'react-icons/tb';
import Link from 'next/link';

function MenuItems(props: any) {

  const dispatch = useDispatch();
  const { unReadMeessage, unReadORder } = useSelector(
    (state: any) => state.counter
  );
    const handleClick = (category: any) => {
      console.log(category)
        localStorage.setItem("categoryId", category._id);
        dispatch(setcategoryId(category._id));
      };
      
  const onClick: MenuProps["onClick"] = (e) => {    
    props?.setCurrent(e.key);
    dispatch(CloseBurgerMenu());
  };

  const onOpenChange = (keys: string[]) => {
    // تصفية المفاتيح غير المعرفة
    const filteredKeys = keys.filter((key) => key !== undefined);

    // props?.setOpenKeys(filteredKeys); // تحديث المفاتيح المفتوحة بعد التصفية
  };
  return (
    <div>
       <Menu onOpenChange={onOpenChange}  mode="inline">
            {props?.updatedAdminItems?.map((item: any, index: number) => (
              <Fragment key={index}>
                {item?.items?.length > 0 ? (
                  <Menu.SubMenu
                    key={item.key}
                    title={
                      <div className="flex items-center">
                        <span className="ml-3 text-sm lg:text-xl">
                          {item.label}
                        </span>
                        <span className="text-xl">
                          <RxSection />
                        </span>
                      </div>
                    }
                  >
                    {item.items &&
                      item.items.map((child: any) => (
                        <Menu.Item key={child.key}>
                          <div
                            className={`flex  w-full items-center hover:text-[#036499!important] ${
                              props?.current == child.key
                                ? "text-[#036499]"
                                : "[&{sapn}]: text-[#000] "
                            }`}
                          >
                            <span className="ml-3 text-sm lg:text-xl ">
                              {child.label}
                            </span>
                            <span className="text-xl ">{child.icon}</span>
                          </div>
                        </Menu.Item>
                      ))}
                    {item.label == "الأقسام" && (
                      <>
                        {props?.categoryList &&
                          props?.categoryList.map((child: any) => (
                            <Menu.Item key={child._id}>
                              <Link href={`/admin/category/${child.name}`}
                                onClick={() => {
                                  handleClick(child);
                                  onClick(child)
                                }}
                                className={`flex  w-full items-center hover:text-[#036499!important] ${
                                  props?.current == child.key
                                    ? "text-[#036499]"
                                    : "[&{sapn}]: text-[#000] "
                                }`}
                              >
                                <span className="ml-3 text-sm lg:text-xl ">
                                  {child.title}
                                </span>
                                <span className="text-xl "><TbJumpRope /></span>
                              </Link>
                            </Menu.Item>
                          ))}
                      </>
                    )}
                  </Menu.SubMenu>
                ) : (
                  <div className="flex items-center " key={item.key}>
                    {item?.url?.includes("support") ||
                    item?.url?.includes("orders") ? (
                      <Menu.Item
                        onClick={() => onClick(item)}
                        className={`w-full flex ${
                          props?.current == item.key ? "text-[#e6f4ff]" : "!bg-white "
                        } `}
                      >
                        <div
                          className={`flex w-full items-center justify-between hover:text-[#036499!important] ${
                            props?.current == item.key
                              ? "text-[#036499]"
                              : "[&{sapn}]: text-[#000] "
                          }`}
                        >
                          <div className="flex items-center ">
                            <span className="ml-3 text-sm lg:text-xl ">
                              {item.label}
                            </span>
                            <span className="text-xl ">{item.icon}</span>
                          </div>
                          <div
                            className={`flex items-center justify-center  rounded-lg mx-4 h-8 px-2 border-2 border-red-500 
                              ${
                                item?.url?.includes("support") &&
                                (props?.unReadMeessage == 0
                                  ? " text-red-500 bg-white"
                                  : "text-white bg-red-500")
                              } 
                            ${
                              item?.url?.includes("orders") &&
                              (props?.unReadORder == 0
                                ? "text-red-500 bg-white"
                                : "text-white bg-red-500")
                            } `}
                          >
                            {item?.url?.includes("support") && unReadMeessage}
                            {item?.url?.includes("orders") && unReadORder}
                          </div>
                        </div>
                      </Menu.Item>
                    ) : (
                      <Menu.Item
                        onClick={() => onClick(item)}
                        className={`w-full flex ${
                            props?.current == item.key ? "text-[#e6f4ff]" : "!bg-white "
                        } `}
                      >
                        <div
                          className={`flex  w-full items-center hover:text-[#036499!important] ${
                            props?.current == item.key
                              ? "text-[#036499]"
                              : "[&{sapn}]: text-[#000] "
                          }`}
                        >
                          <span className="ml-3 text-sm lg:text-xl ">
                            {item.label}
                          </span>
                          <span className="text-xl ">{item.icon}</span>
                        </div>
                      </Menu.Item>
                    )}
                  </div>
                )}
              </Fragment>
            ))}
          </Menu>
    </div>
  )
}

export default MenuItems
