"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loader from "../Loader/Loader";
import Hero from "@/app/[locale]/components/global/Hero/Hero";
import { Pagination, Select, notification, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetProductsByCategoryForCustomer } from "@/app/[locale]/api/product";
import { AddDeleteToWishList } from "@/app/[locale]/api/wishlist";
import { setChangeWishListStatus } from "@/app/[locale]/lib/todosSlice";
import { BsArrowsExpandVertical } from "react-icons/bs";
import { LuShoppingCart } from "react-icons/lu";
import { useTranslation } from "@/app/i18n/client";
import OfferTimer from "./OfferTimer";
import ProductDetails from "@/app/[locale]/components/global/ProductDetailsModal/ProductDetailsModal"
import { AddToCard_Talab } from "@/app/[locale]/api/talab";

type Props = {
  data?: any;
  title?: string;
  url?: string;
  id?: string;
  store?: boolean;
  locale: LocaleProps | string;
};
function ProductsPage({ id, title, store, locale }: Props) {
  const { t } = useTranslation(locale, "common");

  const options = [
    { value: "fromCheap", label: t("price_One_the_most_expensive") },
    { value: "fromExpensive", label: t("price_Cheapest") },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { changeWishListStatus, } = useSelector(
    (state: any) => state.counter
  );

  const [compare, setCompare] = useState<any>("0");
  const [products, setProducts] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [idDetails, setIdDetails] = useState();
  const [details, setDetails] = useState(false);
  const [arr, setArr] = useState<any>([]);
  const [openProductDetails, setOpenProductDetails] = useState(false);
  const [sortedProductsFromCHeap, setSortedProductsFromCHeap] = useState<any[]>(
    []
  );
  const [sortedProductsFromExpensive, setSortedProductsFromExpensive] =
    useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState<any>(0);
  const [currentProducts, setCurrentProducts] = useState<any>([]);

  const handlePageChange = async (page: any) => {
    if (id) {
      setIsLoading(true);
      setPage(page + 1);
      setIsLoading(true);
      try {
        const res = await GetProductsByCategoryForCustomer(id, page);
        setProducts((prevProducts) => [...prevProducts, ...res.data.data]);
        setCurrentPage(res.data.pagination.current_page);
        setIsLoading(false);
      } catch (err: any) {
        notification.error({
          message: err.response.data.error.message,
        });
        setIsLoading(false);
      }
    }
  };

  // Get All Products in First Time
  useEffect(() => {
    setIsLoading(true);
    if (id) {
      const getData = async () => {
        const res: any = await GetProductsByCategoryForCustomer(id, 1);
        setTotalItems(res.data.pagination.total);
        setPageSize(res.data.pagination.per_page);
        setProducts(res.data.data);
        setCurrentProducts(res.data.data);
        setIsLoading(false);
      };
      getData();
    }
  }, []);

  // Handle Pagination
  useEffect(() => {
    const handlesort = products.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
    setCurrentProducts(handlesort);
  }, [products]);

  const handleChange = (value: string | string[]) => {
    if (value == "fromCheap") {
      const sorteeMethod = [...products].sort((a, b) => b.price - a.price);
      setProducts(sorteeMethod);
    } else {
      const sorteeMethod = [...products].sort((a, b) => a.price - b.price);
      setProducts(sorteeMethod);
    }
  };

  const handleHover = (id: any) => {
    setDetails(true);
    setIdDetails(id);
  };
  // Handle Compare
  const [localKeys, setLocalKeys] = useState(["product0", "product1"]);
  const [num, setNum] = useState(0);
  const hanldeCompare = (item: any) => {
    let inLocal = false;

    localKeys.forEach((element: any, index) => {
      let localItem: any = localStorage.getItem(localKeys[index]);
      if (localItem) {
        localItem = JSON.parse(localItem);
        if (localItem._id === item._id) {
          inLocal = true;
        }
      }
    });
    if (!inLocal) {
      if (num < 4) {
        localStorage.setItem(`product${num}`, JSON.stringify(item));
        setNum(num + 1);
      } else {
        if (num == 4) {
          setNum(1);
          localStorage.setItem(`product0`, JSON.stringify(item));
        }
      }
      notification.success({
        message: t("item_added_for_comparison"),
      });
    } else {
      notification.error({
        message: t("item_already_in_comparison"),
      });
    }
  };

  const handleAddOrDeleteTowishList = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await AddDeleteToWishList(id);
      setIsLoading(false);
      if (response.data.delete) {
        notification.success({
          message: t("product_has_been_removed_from_favourites"),
        });
        const user_WishList = localStorage.getItem("userWishList");
        let idsArray = user_WishList ? JSON.parse(user_WishList) : [];
        idsArray = idsArray.filter((idd: any) => idd !== id);
        localStorage.setItem("userWishList", JSON.stringify(idsArray));
        setArr(idsArray);
      } else {
        notification.success({
          message: t("product_has_been_added_to_favourites"),
        });

        const user_WishList = localStorage.getItem("userWishList");
        let idsArray = user_WishList ? JSON.parse(user_WishList) : [];

        if (!idsArray.includes(id)) {
          idsArray.push(id);
          localStorage.setItem("userWishList", JSON.stringify(idsArray));
          setArr(idsArray);
        }
      }

      dispatch(setChangeWishListStatus());
    } catch (err: any) {
      setIsLoading(false);
      notification.error({
        message: err.response.data.error,
      });
    }
  };
  const AddProductToCard = async (id: string) => {
    const datas = {
      product_id: id,
      quantity: 1,
      details: JSON.stringify(details),
    };
    AddToCard_Talab(datas)
      .then((res: any) => {
        if (res.status) {
          notification.success({
            message: t("added_product_to_cart"),
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
        notification.error({
          message: err.response.data.message,
        });
      });
  };
  const breadcrumbData = [
    { title: products[0]?.categoryName, url: "/category/phone", id: 1 },
  ];



  useEffect(() => {
    const user: any = localStorage.getItem("userRole");
    if (user != undefined) {
      if (JSON.parse(user) == "admin") {
        setIsAdmin(true);
      } else if (JSON.parse(user) == "employee") {
        setIsEmployee(true);
      }
    }

    const user_WishList: any = localStorage.getItem("userWishList");
    let wishList = [];

    if (user_WishList && user_WishList != undefined) {
      try {
        wishList = JSON.parse(user_WishList);

        if (!Array.isArray(wishList)) {
          console.warn(
            "Parsed data is not an array, resetting to empty array."
          );
          wishList = [];
        }
      } catch (e) {
        console.error("Error parsing JSON from localStorage:", e);
      }
    }
    setArr(wishList);
  }, [changeWishListStatus]);

  return (
    <div className={`container ${!store && "pt-12"}`}>
      <div className=" container">
        {!store && (
          <Hero locale={locale} title={t("home")} breadcrumb={breadcrumbData} />
        )}
      </div>
      {isLoading && <Loader />}
      <div className="flex items-center justify-between my-5  ">
        <div className="">
          <div className=" flex items-center">
            <p className="text-sm lg:text-xl text-[#8c8c8c] ml-1">
              {t("sort_by")}
            </p>
            <Select
              size={"middle"}
              defaultValue={t("sort")}
              onChange={handleChange}
              className="text-[#8c8c8c] text-[10px] lg:text-lg w-[160px] lg:w-[200px]"
              options={options}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {currentProducts.map((item: any) => {
          const isFavorite = arr.includes(item._id);
          return (
            <div key={item._id} className="border-2 border-gray pb-2 relative p-1 rounded-md">

              <div
                className="flex justify-center relative"
                onMouseEnter={() => handleHover(item._id)}
                onMouseLeave={() => setDetails(false)}
              >

                {/* Start Image */}
                <div>
                  <Image
                    src={item.images[0]}
                    width={230}
                    height={230}
                    alt={item.name ? "item.name" : "asdqqq"}
                    className={`!w-[230px] !h-[230px] `}
                  />
                </div>
                {/* End Image */}

                {/* Start WishList && Copmrition */}
                <div
                  className={`absolute opacity-0 z-50 bg-[#eeeeee8c] transition-all flex items-center  w-full h-full top-0 left-0 ${details && idDetails == item._id
                    ? "opacity-100"
                    : "opacity-0"
                    } `}
                >

                  {/* Start WishList Icon */}
                  <div className="flex items-center justify-between p-1 w-fit mx-auto">
                    {store && !isEmployee && (
                      <div className="bg-[#f1f1f1] p-3  rounded-full  cursor-pointer hover:bg-[#004169!important] ml-2 [&:hover>svg]:text-white ">
                        {isFavorite ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20px"
                            height="20px"
                            viewBox="0 -5.37 77.646 77.646"
                            onClick={() => {
                              handleAddOrDeleteTowishList(item._id);
                            }}
                          >
                            <defs>
                              <linearGradient
                                id="linear-gradient"
                                x1="1.044"
                                y1="0.005"
                                x2="0.413"
                                y2="0.749"
                                gradientUnits="objectBoundingBox"
                              >
                                <stop offset="0" stop-color="#ff7471" />
                                <stop offset="1" stop-color="#ff5245" />
                              </linearGradient>
                            </defs>
                            <g
                              id="heart_red"
                              data-name="heart red"
                              transform="translate(-263.982 -435.283)"
                            >
                              <g id="Group_25" data-name="Group 25">
                                <path
                                  id="Path_69"
                                  data-name="Path 69"
                                  d="M302.81,446.03c-.059-.106-.128-.2-.187-.307.059.1.128.2.187.307Z"
                                  fill="none"
                                />
                                <path
                                  id="Path_70"
                                  data-name="Path 70"
                                  d="M341.628,456.395l-.025-.006c.006-.142.025-.279.025-.431a20.662,20.662,0,0,0-37.039-12.611.171.171,0,0,0-.024-.007,2.169,2.169,0,0,1-3.54-.046l-.035.008a20.657,20.657,0,0,0-37,12.656c0,.147.018.282.018.424l-.029.013s0,.5.1,1.413a20.552,20.552,0,0,0,.6,3.364c1.608,6.945,6.938,20.286,24.659,32.122,10.242,6.879,12.73,8.743,13.383,8.867.031.006.048.033.083.033s.058-.033.094-.043c.7-.162,3.265-2.071,13.359-8.857,16.931-11.313,22.555-24,24.428-31.163a20.743,20.743,0,0,0,.854-4.546C341.623,456.824,341.628,456.395,341.628,456.395ZM302.81,446.03h0c-.059-.1-.128-.2-.187-.307C302.682,445.825,302.751,445.924,302.81,446.03Z"
                                  fill="#ff5245"
                                />
                              </g>
                              <path
                                id="Path_71"
                                data-name="Path 71"
                                d="M295.337,474.437c-5.407-20.228,1.411-28.894,5-31.889a20.747,20.747,0,0,0-6.426-5.077c-6.5-1.416-15.583.295-21.458,16.921-1,3.4-1.458,11.938-.492,22.426a65.334,65.334,0,0,0,17.38,16.476c10.242,6.879,12.73,8.743,13.383,8.867.031.006.048.033.083.033s.058-.033.094-.043a2.946,2.946,0,0,0,.76-.373C301.6,496.005,298.749,487.182,295.337,474.437Z"
                                fill="url(#linear-gradient)"
                              />
                            </g>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000000"
                            height="25px"
                            width="25px"
                            version="1.1"
                            id="Capa_1"
                            viewBox="0 0 471.701 471.701"
                            onClick={() => {
                              handleAddOrDeleteTowishList(item._id);
                            }}
                          >
                            <g>
                              <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1   c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3   l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4   C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3   s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4   c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3   C444.801,187.101,434.001,213.101,414.401,232.701z" />
                            </g>
                          </svg>
                        )}
                      </div>
                    )}
                    {/* End WishList Icon */}

                    {/* Start Comparison Icon */}
                    {!store && item.categoryComparison == "1" && (
                      <div
                        className="bg-[#f1f1f1] p-3  rounded-full cursor-pointer hover:bg-[#004169!important]  hover:text-[#fff] "
                        onClick={() => {
                          hanldeCompare(item);
                        }}
                      >
                        <BsArrowsExpandVertical />
                      </div>
                    )}{" "}
                    {/* End Comparison Icon */}
                  </div>
                </div>
                {/* End WishList && Copmrition */}

              </div>

              {/* Start Go To Product Page */}
              <Link href={`/category/${title}/${item._id}`}>
                <div className="flex flex-col items-center px-4 pt-1">
                  <p className="text-[#a9a9a9] text-center text-lg flex  justify-center h-20 ">
                    {item.name}
                  </p>
                  <div className={`flex items-center justify-between gap-3`}>
                    <p
                      className={`${0 > 0
                        ? "line-through  text-black mt-2 text-xs "
                        : " text-[#004169] mt-2 text-lg"
                        } `}
                    >
                      {item.price}
                    </p>
                    {0 > 0 && (
                      <p className={`text-[#004169] mt-2 text-lg`}>
                        {item.price}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
              {/* End Go To Product Page */}

              {/* <div className="rounded-lg text-center text-[#8c8c8c] bg-[#f1f1f1] w-[90%] block mx-auto hover:text-[#fff] hover:bg-[#004169] cursor-pointer text-lg font-semibold py-1 transition-all">
              <Link href={`https://wa.me/+905374561068?text=https://mobilestore-moudy-wold.vercel.app/${title}/${item.id}\nأريد%20تفاصيل%20هذا%20المنتج`} >
                <p className=" text-sm lg:text-lg flex  items-center justify-center">
                  <FaWhatsapp className="ml-1" />
                  {t("buy_it_now")}
                </p>
              </Link>
            </div> */}
              {store && (
                <>
                  <div className="mt-4 border-2 border-[#006496] rounded-lg text-center text-white bg-[#006496] w-[90%] block mx-auto hover:text-[#006496] hover:bg-white cursor-pointer text-lg font-semibold py-1 transition-all">
                    <button onClick={() => {
                      const hasSeparator = item.details.some((detail: any) =>
                        Object.values(detail).some(value => typeof value === 'string' && value.includes("|"))
                      );

                      if (hasSeparator) {
                        setSelectedProduct(item);
                        setOpenProductDetails(true);
                      } else {
                        AddProductToCard(item._id);
                      }
                    }}>
                      <p className="text-sm lg:text-lg flex items-center justify-center gap-3">
                        <LuShoppingCart />
                        {t("add_to_cart")}
                      </p>
                    </button>
                  </div>

                  <div className="">
                    {item.offer_expiry_date && <OfferTimer targetDate={item?.offer_expiry_date} />}
                  </div>
                </>
              )}

              {/* Start Modal */}
              <div>
                <Modal
                  title={t("product_detils")}
                  open={openProductDetails}
                  onCancel={() => setOpenProductDetails(false)}
                  okButtonProps={{ style: { display: "none" } }}
                  cancelButtonProps={{ style: { display: "none" } }}
                  // styles={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} 
                  className="custom-modal"
                >
                  <ProductDetails locale={locale} data={selectedProduct} openProductDetails={openProductDetails} setOpenProductDetails={setOpenProductDetails} />
                </Modal>
              </div>
              {/* End Modal */}

            </div>

          );
        })}
      </div>

      {/* Start Pagination */}
      <div className="m-4">
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
      {/* End Pagination */}
    </div>
  );
}

export default ProductsPage;
