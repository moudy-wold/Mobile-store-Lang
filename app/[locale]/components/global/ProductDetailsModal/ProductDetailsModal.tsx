"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/app/i18n/client";
import { notification, Radio } from "antd";
import { LuShoppingCart } from "react-icons/lu";
import { AddToCard_Talab } from "@/app/[locale]/api/talab";

type Props = {
    locale: LocaleProps | string;
    data: any,
    openProductDetails: any,
    setOpenProductDetails: any
}
function ProductDetailsModal(props:any) {
    const { t } = useTranslation(props.locale, "common");
    const [details, setDetails] = useState<any>({});
    const [arrayOfObjects, setArrayOfObjects] = useState<any[]>([]);

    const handleClick = (label: string, value: string) => {
        setDetails((prevState: any) => ({ ...prevState, [label]: value }));
    };

    const AddProductToCard = async (id: string) => {
        const datas = {
          product_id: id,
          quantity: 1,
          details: JSON.stringify(details),
        };
        console.log(props.data)
        AddToCard_Talab(datas)
          .then((res: any) => {
            if (res.status) {
              notification.success({
                message: t("added_product_to_cart"),
              });
            }
            props.setOpenProductDetails(false)
          })
          .catch((err: any) => {
            console.log(err);
            notification.error({
              message: err.response.data.message,
            });
          });
      };
      

    useEffect(() => {
        if (props.data) {
            let newArrayOfObjects: any[] = [];
            let newDetails: any = {};
            props.data.details.map((item: any) => {
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
    }, [props.data]);

    return (
        <div className="px-8 pt-8">
            {/* Start Image && Name */}
            <div className="flex items-center gap-4 mb-4">
                {/* Start Image */}
                <div className="">
                    <Image
                        src={props.data.images[0]}
                        width={70}
                        height={70}
                        alt={props.data.name ? "item.name" : "asdqqq"}
                        className={`!w-[70px] !h-[70px] border-2 border-gray-300 rounded-lg p-2 `}
                    />
                </div>
                {/* End Image */}
                {/* Start Name */}
                <div className="">
                    <p className="text-lg">{props.data.name}</p>
                    <p className="text-[#006496]">{props.data.brand}</p>
                </div>
                {/* End Name */}
            </div>
            {/* End Image && Name */}

            {/* Start details */}
            <div className="py-5 border-t-2 border-b-2 border-gray-300 ">
                {arrayOfObjects?.map((item: any) => {
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
            </div>
            {/* End details */}

            {/* Start Button */}
            <div className="mt-5">
                <button
                onClick={()=>{AddProductToCard(props.data._id)}}
                 className="w-full flex items-center justify-center gap-2 text-lg py-2 rounded-xl bg-[#006496] text-white hover:text-[#006496] hover:bg-white transition-all duration-150 border-2 border-[#006496] ">
                    <LuShoppingCart />
                    {t("add_to_cart")}
                </button>
            </div>
            {/* End Button */}
        </div>
    )
}
export default ProductDetailsModal