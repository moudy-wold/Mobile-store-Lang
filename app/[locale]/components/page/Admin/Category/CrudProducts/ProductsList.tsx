"use client"
import React, { useEffect, useState } from "react";
import { Space, Table, Modal, Button, notification } from "antd";
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link'
import Image from 'next/image'
import SearchProducts from "@/app/[locale]/components/global/Search/SearchProducts/SearchProducts"
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import moment from "moment";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { DeleteProductById } from "@/app/[locale]/api/product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import ImagesSlider from "@/app/[locale]/components/global/ImagesSlider/ImagesSlider";
import { GetProductsByCategory } from "@/app/[locale]/api/product";
type Props = {
    path: string
}


function ProductsList({ path }: Props) {
    const router = useRouter()
    const [openDelete, setOpenDelete] = useState(false);
    const [openImages, setOpenImages] = useState(false);
    const [id, setId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState([])
    const [page, setPage] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [data, setData] = useState([])
    const [categoryId, setCategoryId] = useState<any>();

    const handlePageChange = async (page: any) => {
        setPage(page + 1)
        setIsLoading(true)
        try {
            const res = await GetProductsByCategory(categoryId, page + 10,);
            setData(res.data.data)
            setCurrentPage(page);
            setIsLoading(true)
        }
        catch (err: any) {
            notification.error({
                message: err.response.data.error.message
            })
            setIsLoading(true)

        }
    };
    useEffect(() => {
        setCategoryId(localStorage.getItem("categoryId"))
        let id = localStorage.getItem("categoryId")
        const getData = async () => {
            const res = await GetProductsByCategory(id, 1);
            setTotalItems(res.data.length)
            setData(res.data.data)
        }
        getData()
    }, []);


    const hideModalAndDeleteItem = () => {
        setIsLoading(true);
        setOpenDelete(false)
        DeleteProductById(id)
            .then((res) => {
                if (res.status) {
                    notification.success({
                        message: "تم حذف المنتج بنجاح"
                    })
                }
                setOpenDelete(false)
                setIsLoading(false);
                router.refresh()
            })
            .catch((err) => {
                notification.error({
                    message: err.response.data.error.message
                })
            })

    };

    const columns: ColumnsType<any> = [
        {
            title: "إسم المنتج",
            dataIndex: "name",
            key: "name",
            width: 400,
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),

        },
        {
            title: "صور المنتج",
            width: 250,
            dataIndex: "images",
            key: "images",
            render: (_, record) => (
                <Space size="middle">
                    <span
                        className="border-2 border-gray-400 rounded-xl p-1 hover:bg-gray-100 block text-xs lg:text-xl text-center !w-[150px] !h-[150px]"
                        onClick={() => {
                            setImages(record.images)
                            setOpenImages(true);
                        }}
                    >
                        <Image src={record?.images[0]} height={150} width={150} alt={"record.images[0]"} className="rounded-xl !w-[150px] !h-[130px]" />
                    </span>
                </Space>
            ),
        },

        {
            title: "تاريح الإضافة",
            width: 250,
            dataIndex: "createdDate",
            key: "createdDate",
        },
        {
            title: "الإجرائات",
            width: 250,
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a href={`/admin/category/${path}/edit/${record.id}`}><CiEdit /></a>
                    <a><RiDeleteBinLine onClick={() => { setOpenDelete(true); setId(record.id) }} /></a>
                </Space>
            ),
        },
    ];

    const tableData = data?.map((item: any) => ({
        id: item._id,
        images: item.images,
        name: item.name,

        description: item.description,
        createdDate: moment(item.createdAt).locale('en').format('DD/MM/YYYY'),
    }));
    return (
        <div className="">
            {isLoading && <Loader />}

            <div className="grid grid-cols-[50%_50%] mb-2">
                <div className="flex items-center">
                    <Button className="">
                        <Link href={`/admin/category/${path}/create`} className="flex items-center justify-beetwen">أضف منتج <CiCirclePlus className="mr-1" /></Link>
                    </Button>
                </div>
                <div className="p-4">
                    <SearchProducts path={path} />
                </div>
            </div >

            <Table columns={columns} dataSource={tableData} scroll={{ x: 1400, }} />

            <div>
                <Modal
                    title="حذف المنتج!!!"
                    open={openDelete}
                    onOk={hideModalAndDeleteItem}
                    onCancel={() => setOpenDelete(false)}
                    okText="موافق"
                    cancelText="إلغاء" okButtonProps={{ style: { backgroundColor: '#4096ff' } }}
                >
                    <p>هل أنت متأكد من أنك تريد حذف المنتج ؟</p>
                </Modal>


                <Modal
                    title="الصور"
                    centered
                    width={1000}
                    open={openImages}
                    onOk={() => setOpenImages(false)}
                    onCancel={() => setOpenImages(false)}
                    cancelText="إغلاق"
                    okButtonProps={{ style: { backgroundColor: '#4096ff' } }}
                >
                    <Swiper
                        navigation={true}
                        modules={[Navigation]}
                    >
                        {images?.map((item: any) => (

                            <SwiperSlide key={item.fileTitle} className="text-center">
                                <ImagesSlider image={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Modal>
            </div>

        </div>
    )
}

export default ProductsList