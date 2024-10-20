"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { DeleteProductById } from "@/app/[locale]/api/product";
import { GetProductsByCategory } from "@/app/[locale]/api/product";
import { Space, Table, Modal, Button, notification, Switch } from "antd";
import moment from "moment";
import { ColumnsType } from "antd/es/table";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { useTranslation } from "@/app/i18n/client";
import dynamic from 'next/dynamic'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";
import GlobalRating from "@/app/[locale]/components/global/GlobalRating/GlobalRating";
import Rating from "@/app/[locale]/components/page/Category/DynamicSection/Rating";
import Questions from "../../../../Category/DynamicSection/Questions";
import EditOffer from "../EditOffer/EditOffer";
import AddToOffer from "../AddToOffer/AddToOffer";
const ImagesSlider = dynamic(() => import('@/app/[locale]/components/global/ImagesSlider/ImagesSlider'), { ssr: false })
const SearchProducts = dynamic(() => import('@/app/[locale]/components/global/Search/SearchProducts/SearchProducts'), { ssr: false })

type Props = {
  path: string;
  locale: LocaleProps | string;
};

function ProductsList({ path, locale }: Props) {
  const { t } = useTranslation(locale, "common");
  const router = useRouter();
  const [openDelete, setOpenDelete] = useState(false);
  const [openImages, setOpenImages] = useState(false);
  const [product_id, setProduct_id] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [openReviews, setOpenReviews] = useState(false)
  const [product_average_rating, setProduct_Average_rating] = useState(0)
  const [product_reviews, setProduct_Reviews] = useState([])
  const [openQuestions, setOpenQuestions] = useState(false)
  const [product_questions, setProduct_questions] = useState([]);
  const [openVisits, setOpenVisits] = useState(false)
  const [product_Visits, setProduct_Visits] = useState("")
  const [itemForOffer, setItemForOffer] = useState<any>()
  const [openDeleteOffer, setOpenDeleteOffer] = useState(false);
  const [openEditOffer, setOpenEditOffer] = useState(false);
  const [openDates, setOpenDates] = useState(false);

  const [page, setPage] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [data, setData] = useState([]);
  const [categoryId, setCategoryId] = useState<any>();

  const handlePageChange = async (page: any) => {
    setPage(page + 1);
    setIsLoading(true);
    try {
      const res = await GetProductsByCategory(categoryId, page + 10);
      setData(res.data.data);
      setCurrentPage(page);
      setIsLoading(true);
    } catch (err: any) {
      notification.error({
        message: err.response.data.error.message,
      });
      setIsLoading(true);
    }
  };

  // First Fetch
  useEffect(() => {
    setCategoryId(localStorage.getItem("categoryId"));
    let id = localStorage.getItem("categoryId");
    const getData = async () => {
      const res = await GetProductsByCategory(id, 1);
      setTotalItems(res.data.length);
      setData(res.data.data);
    };
    getData();
  }, []);

  const hideModalAndDeleteItem = () => {
    setIsLoading(true);
    setOpenDelete(false);
    DeleteProductById(product_id)
      .then((res) => {
        if (res.status) {
          notification.success({
            message: t("product_has_been_successfully_deleted"),
          });
        }
        setOpenDelete(false);
        setIsLoading(false);
        router.refresh();
      })
      .catch((err) => {
        notification.error({
          message: err.response.data.error.message,
        });
      });
  };

  const columns: ColumnsType<any> = [
    {
      title: t("product_name"),
      dataIndex: "name",
      key: "name",
      width: 400,
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: t("product_image"),
      width: 250,
      dataIndex: "images",
      key: "images",
      render: (_, record) => (
        <Space size="middle">
          <span
            className="border-2 border-gray-400 rounded-xl p-1 hover:bg-gray-100 block text-xs lg:text-xl text-center !w-[150px] !h-[150px]"
            onClick={() => {
              setImages(record.images);
              setOpenImages(true);
            }}
          >
            <Image
              src={record?.images[0]}
              height={150}
              width={150}
              alt={"record.images[0]"}
              className="rounded-xl !w-[150px] !h-[130px]"
            />
          </span>
        </Space>
      ),
    },
    {
      title: t("is_in_offer"),
      dataIndex: "is_in_offer",
      key: "is_in_offer",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <Space size="middle">
          <Switch defaultValue={record.is_in_offer == "1" ? true : false} onChange={() => { record.is_in_offer == "1" ? setOpenDeleteOffer(true) : setOpenDates(true); setProduct_id(record.id) }} />
          <div className="p-1 border-2 border-gray-300 cursor-pointer rounded-lg ">
            <CiEdit className="hover:scale-125 transtion-all duration-150 text-xl" onClick={() => { setItemForOffer(record); setOpenEditOffer(true); console.log(record) }} />
          </div>
        </Space>
      )
    },
    {
      title: t("date_added"),
      width: 250,
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: t("actions"),
      width: 250,
      key: "action",
      render: (_, record) => (
        <Space size="middle" onClick={() => { setProduct_id(record.id); }}>

          <a href={`/admin/category/${path}/edit/${record.id}`}>
            <CiEdit />
          </a>

          <a>
            <RiDeleteBinLine
              onClick={() => {
                setOpenDelete(true);
              }}
            />
          </a>

          <a className="cursor-pointer p-1  border-gray-300 rounded-md " onClick={() => {
            setProduct_Average_rating(record.average_rating);
            setProduct_Reviews(record.reviews)
            setOpenReviews(true);
          }}>
            <Image src="/assets/fullStar.svg" alt="star" width={17} height={17} className="" />
          </a>

          <a className="cursor-pointer p-1  border-gray-300 rounded-md " onClick={() => { setProduct_questions(record.questions); setOpenQuestions(true) }}>
            <FaQuestion />
          </a>

          <a className="cursor-pointer p-1  border-gray-300 rounded-md " onClick={() => { setProduct_Visits(record.visits_count); setOpenVisits(true) }}>
            <MdOutlineRemoveRedEye className="text-xl" />
          </a>
        </Space>
      ),
    },
  ];

  const tableData = data?.map((item: any) => ({
    id: item._id,
    images: item.images,
    name: item.name,
    description: item.description,
    createdDate: moment(item.createdAt).locale("en").format("DD/MM/YYYY"),
    offer_start_date: moment(item.offer_start_date).locale("en").format("YYYY-MM-DD"),
    offer_expiry_date: moment(item.offer_expiry_date).locale("en").format("YYYY-MM-DD"),
    discount_price: +item.discount_price,
    average_rating: item.average_rating,
    reviews: item.reviews,
    questions: item.questions,
    visits_count: item.visits_count
  }));

  return (
    <div className="">
      {isLoading && <Loader />}

      <div className="grid grid-cols-[50%_50%] mb-2">
        <div className="flex items-center gap-2">
          <Button className="">
            <Link
              href={`/admin/category/${path}/create`}
              className="flex items-center justify-beetwen"
            >
              {t("add_product")} <CiCirclePlus className="mx-1" />
            </Link>
          </Button>
        </div>
        <div className="p-4">
          <SearchProducts locale={locale} path={path} />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={tableData}
        scroll={{ x: 1400 }}
      />

      <div>
        {/* Start Image Model */}
        <Modal
          title={t("images")}
          centered
          width={1000}
          open={openImages}
          onOk={() => setOpenImages(false)}
          onCancel={() => setOpenImages(false)}
          cancelText={t("close")}
          okButtonProps={{ style: { backgroundColor: "#4096ff" } }}
        >
          <Swiper navigation={true} modules={[Navigation]}>
            {images?.map((item: any) => (
              <SwiperSlide key={item.fileTitle} className="text-center">
                <ImagesSlider image={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Modal>
        {/* End Image Model */}

        {/* Start Add Product To Offer */}
        <Modal
          title={t("active_offer!!!")}
          open={openDates}
          onCancel={() => setOpenDates(false)}
          cancelText={t("close")}
          okButtonProps={{ style: { display: "none" } }}
        >
          <AddToOffer locale={locale} setOpenDates={setOpenDates} product_id={product_id} openDates={openDates} />
        </Modal>
        {/* End Add Product To Offer */}

        {/* Start Edit OFfer */}
        <Modal
          title={t("active_offer!!!")}
          open={openEditOffer}
          onCancel={() => setOpenEditOffer(false)}
          cancelText={t("close")}
          okButtonProps={{ style: { display: "none" } }}
        >
          <EditOffer locale={locale} data={itemForOffer} openEditOffer={openEditOffer} setOpenEditOffer={setOpenEditOffer} product_id={product_id} />
        </Modal>
        {/* End Edit OFfer */}


        {/* Start Delete Product Model */}
        <Modal
          title={t("delete_product!!!")}
          open={openDelete}
          onOk={hideModalAndDeleteItem}
          onCancel={() => setOpenDelete(false)}
          okText={t("confirm")}
          cancelText={t("close")}
          okButtonProps={{ style: { backgroundColor: "#4096ff" } }}
        >
          <p>{t("you_sure_want_delete_product")}</p>
        </Modal>
        {/* End Delete Product Model */}


        {/* Start Reviews Model */}
        <Modal
          title={t("the_rating")}
          open={openReviews}
          onCancel={() => setOpenReviews(false)}
          cancelText={t("close")}
          okButtonProps={{ style: { display: "none" } }}
        >
          {/* Start Rating */}
          <div className="mb-5">
            <GlobalRating average_rating={product_average_rating} />
          </div>
          {/* End Rating */}

          {/* Start Reviews */}
          <div className="max-h-[70wh] overflow-y-auto">
            <Rating locale={locale} product_id={product_id} reviews={product_reviews} store={false} />
          </div>
          {/* End Reviews */}

        </Modal>
        {/* End Reviews Model */}

        {/* Start Questions Model */}
        <Modal
          title={t("the_questions")}
          open={openQuestions}
          onCancel={() => setOpenQuestions(false)}
          cancelText={t("close")}
          okButtonProps={{ style: { display: "none" } }}
        >

          {/* Start questions */}
          <div className="max-h-[70wh] overflow-y-auto">
            <Questions locale={locale} product_id={product_id} questions={product_questions} store={false} />
          </div>
          {/* End questions */}
        </Modal>
        {/* End Questions Model */}

        {/* Start Visits Model */}
        <Modal
          title={t("product_visits")}
          open={openVisits}
          onCancel={() => setOpenVisits(false)}
          cancelText={t("close")}
          okButtonProps={{ style: { display: "none" } }}
        >
          <p className="p-2 border-2 border-gray-300 rounded-lg w-fit">{product_Visits}</p>
        </Modal>
        {/* End Visits Model */}

      </div>
    </div>
  );
}

export default ProductsList;
