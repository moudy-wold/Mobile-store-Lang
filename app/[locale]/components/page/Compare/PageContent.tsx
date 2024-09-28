"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { notification } from "antd";
import Hero from "@/app/[locale]/components/global/Hero/Hero";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiBroom } from "react-icons/gi";
import { useTranslation } from "@/app/i18n/client";

function PageContent({ locale }: LocaleProps) {
  const { t } = useTranslation(locale, "common");
  const [products, setProducts] = useState<any[]>([]);
  const [details, setDetails] = useState<any[]>([]);
  const [done, setDone] = useState(false);

  const [table, setTable] = useState<any>([
    {
      label: t("clear_list"),
      icon: (
        <GiBroom
          onClick={() => {
            localStorage.clear();
            notification.error({
              message: t("items_removed"),
            });
            location.reload();
          }}
        />
      ),
    },
    { label: t("name") },
    { label: t("price") },
    { label: t("brand_name") },
  ]);
  const [localKeys, setLocalKeys] = useState(["product0", "product1"]);

  useEffect(() => {
    const retrieveProduct = (key: string) => {
      const productString = localStorage.getItem(key);
      if (productString) {
        const parsedProduct = JSON.parse(productString);
        const parsedProductDetails = JSON.parse(productString)?.details;
        setProducts((prevProducts) => [...prevProducts, parsedProduct]);
        parsedProductDetails.map((item: any) => {
          if (item.title !== "") {
            setDetails((prevDetails) => [...prevDetails, item.title]);
          }
        });
      }
    };

    retrieveProduct("product0");
    retrieveProduct("product1");
    // retrieveProduct("product2");

    setDone(true);
  }, []);

  useEffect(() => {
    const uniqueArray: any = [...new Set(details)];
    const newTableData = uniqueArray.map((item: any, index: number) => ({
      label: item !== "" && item,
      id: index,
    }));

    setTable((prevState: any) => [...prevState, ...newTableData]);
  }, [done]);

  const filteredProducts = products.filter(
    (product, index, array) =>
      array.findIndex((item) => item._id === product._id) === index
  );
  const handleDeleteItem = (item: any) => {
    for (let i = 0; i < localKeys.length; i++) {
      let localItem: any = localStorage.getItem(localKeys[i]);
      let key = localKeys[i];
      if (localItem) {
        localItem = JSON.parse(localItem);

        if (localItem._id === item._id) {
          localStorage.removeItem(key);
          notification.error({
            message: t("deleted_iten"),
          });
          location.reload();
        }
      }
    }
  };

  const breadcrumbData = [{ title: t("comparison"), url: "/compare", id: 1 }];
  return (
    <>
      <div className=" container">
        <Hero locale={locale} title={t("home")} breadcrumb={breadcrumbData} />
      </div>
      <div className=" p-4 !w-[390px] sm:!w-[640px] md:!w-[768px] lg:!w-full overflow-auto ">
        <div className="min-w-[1200px] flex">
          <div className="w-[15%] border-2 border-gray-150">
            {table?.map((item: any, index: number) => {
              return (
                <div className="bg-[#f6f6f6]" key={index}>
                  <div
                    className={`${
                      item.icon && " !h-[385px] cursor-pointer "
                    } text-[#8c8c8c]  h-28 text-xl border-b-2 border-b-gray-150 p-2`}
                  >
                    <div
                      className={`${
                        item.icon &&
                        "hover:scale-x-110 transition-all duration-200 flex text-center justify-center"
                      }`}
                    >
                      {" "}
                      <span className="mt-1 ml-1">
                        {item.icon && item.icon}
                      </span>{" "}
                      {item.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex w-full">
            {!filteredProducts.length && (
              <div className="text-xl p-4 mr-[300px] border-2 border-gray-200 rounded-xl h-fit">
                {t("you_have_not_added_any_items_to_compare_yet...!")}
              </div>
            )}

            {filteredProducts.length ? (
              <>
                <div className="w-full border-2 border-gray-150 relative">
                  <div
                    className="absolute top-3 left-2 bg-[#f1f1f1] w-10 h-10 flex items-center justify-center rounded-md cursor-pointer hover:scale-110 hover:bg-red-400 hover:!text-white transition-all duration-200"
                    onClick={() => {
                      handleDeleteItem(filteredProducts[0]);
                    }}
                  >
                    <RiDeleteBin6Line className="text-[#8c8c8c] text-xl" />
                  </div>
                  <div
                    className={`text-[#8c8c8c] h-96 text-xl text-center flex items-center justify-center border-b-2 border-b-gray-150 p-2 `}
                  >
                    <Image
                      src={filteredProducts[0].images[0]}
                      width={250}
                      height={250}
                      alt="item"
                      className=""
                    />
                  </div>
                  <div
                    className={`text-[#8c8c8c] h-28 text-xl  border-b-2 border-b-gray-150 p-4`}
                  >
                    {filteredProducts[0].name}
                  </div>
                  <div
                    className={`text-[#8c8c8c] h-28 text-xl  border-b-2 border-b-gray-150 p-4`}
                  >
                    {filteredProducts[0].price}
                  </div>
                  <div
                    className={`text-[#8c8c8c] h-28 text-xl  border-b-2 border-b-gray-150 p-4`}
                  >
                    {filteredProducts[0].brand}
                  </div>
                  <>
                    {table.slice(4).map((item: any, index: number) => {
                      let foundDetail: any = filteredProducts[0].details.find(
                        (detail: any) => detail.title === item.label
                      );

                      return (
                        <div
                          key={index}
                          className={`text-[#8c8c8c] h-28 text-xl  border-b-2 border-b-gray-150 p-4`}
                        >
                          {foundDetail ? foundDetail?.content : "no"}
                        </div>
                      );
                    })}
                  </>
                </div>
                {filteredProducts.length == 2 && (
                  <div className="w-full border-2 border-gray-150 relative">
                    <div
                      className="absolute top-3 left-2 bg-[#f1f1f1] w-10 h-10 flex items-center justify-center rounded-md cursor-pointer hover:scale-110 hover:bg-red-400 hover:!text-white transition-all duration-200"
                      onClick={() => {
                        handleDeleteItem(filteredProducts[1]);
                      }}
                    >
                      <RiDeleteBin6Line className="text-[#8c8c8c] text-xl" />
                    </div>
                    <div
                      className={`text-[#8c8c8c] h-96 text-xl text-center flex items-center justify-center border-b-2 border-b-gray-150 p-2 `}
                    >
                      <Image
                        src={filteredProducts[1].images[0]}
                        width={250}
                        height={250}
                        alt="item"
                        className=""
                      />
                    </div>
                    <div
                      className={`text-[#8c8c8c] h-28 text-xl  border-b-2 border-b-gray-150 p-4`}
                    >
                      {filteredProducts[1].name}
                    </div>
                    <div
                      className={`text-[#8c8c8c] h-28 text-xl  border-b-2 border-b-gray-150 p-4`}
                    >
                      {filteredProducts[1].price}
                    </div>
                    <div
                      className={`text-[#8c8c8c] h-28 text-xl  border-b-2 border-b-gray-150 p-4`}
                    >
                      {filteredProducts[1].brand}
                    </div>
                    <>
                      {table.slice(4).map((item: any, index: number) => {
                        let foundDetail: any = filteredProducts[1].details.find(
                          (detail: any) => detail.title === item.label
                        );

                        return (
                          <div
                            key={index}
                            className={`text-[#8c8c8c] h-28 text-xl  border-b-2 border-b-gray-150 p-4`}
                          >
                            {foundDetail ? foundDetail?.content : "---"}
                          </div>
                        );
                      })}
                    </>
                  </div>
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PageContent;
