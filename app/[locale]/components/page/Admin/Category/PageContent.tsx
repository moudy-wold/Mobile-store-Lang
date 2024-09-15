"use client"
import React, { useState, useEffect } from "react";
import { Space, Table, Modal, Button, notification, Switch } from "antd";
import type { ColumnsType, } from "antd/es/table";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { useRouter } from 'next/navigation';
import Loader from '@/app/[locale]/components/global/Loader/Loader';
import { DeleteCategory } from "@/app/[locale]/api/category";
import CreateCategory from "./CreateCategory/page";
import EditCategory from "./EditCategory/page";
import { setcategoryId } from "@/app/[locale]/lib/todosSlice";
import { useDispatch } from "react-redux"
type Props = {
    data: any
}
function PageContent({ data }: Props) {
 
    const dispatch = useDispatch()
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [openAddCategory, setOpenAddCategory] = useState(false);
    const [openEditeCategory, setOpenEditeCategory] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState("");
    const handleSetCategoryId = async (id: string) => {
        await dispatch(setcategoryId(id))
    }
    const columns: ColumnsType<any> = [
        {
            title: "إسم القسم",
            dataIndex: "categoryName",
            key: "categoryName",
            render: (_, record) => (
                <Space size="middle">
                    <a href={`/admin/category/${record.categoryName}`} onClick={() => { handleSetCategoryId(record.id) }} >{record.categoryName}</a>
                </Space>
            ),
        },
        {
            title: "إسم القسم بالعربي",
            dataIndex: "arabicName",
            key: "arabicName",
            render: (_, record) => (
                <Space size="middle">
                    <a href={`/admin/category/${record.categoryName}`} onClick={() => { handleSetCategoryId(record.id) }}>{record.arabicname}</a>
                </Space>
            ),
        },
        {
            title: "المقارنة",
            dataIndex: "comparison",
            key: "comparison",
            render: (_, record) => (
                <Space size="middle">
                    <Switch
                        defaultChecked={record.comparison == 1 ? true : false}
                        disabled
                        className="bg-gray-400" 
                        />
                </Space>
            ),
        },
        {
            title: "الإجرائات",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a><CiEdit onClick={() => { setOpenEditeCategory(true); setId(record.id) }} /></a>
                    <a><RiDeleteBinLine onClick={() => { setOpenDelete(true); setId(record.id) }} /></a>
                </Space>
            ),
        },
    ];

    const tableData = data?.map((category: any) => ({
        id: category._id,
        categoryName: category.name,
        arabicname: category?.title,
        comparison: category?.comparison,
    }));
    const hideModalAndDeleteItem = () => {
        setIsLoading(true)
        setOpenDelete(false)
        DeleteCategory(id)
            .then((res) => {
                if (res.data.success) {
                    notification.success({
                        message: "تم حذف القسم بنجاح"
                    });
                }
            })
            .catch((err) => {
                notification.error({
                    message: err.response.data.error.errors[0].msg

                });
            })
            .finally(() => {
                setIsLoading(false)
                setOpenDelete(false);
                router.refresh()
            })
    };
    return (
        <div className="">
            {isLoading && <Loader />}
            <div className="mt-5 mb-8">
                <div className="">
                    <Button className="flex items-center" onClick={() => { setOpenAddCategory(true) }}>
                        <span className="">أضف قسم</span> <CiCirclePlus className="mr-1" />
                    </Button>
                </div>

            </div>

            <Table columns={columns} dataSource={tableData} />

            <div>
                <Modal
                    title="إضافة قسم"
                    open={openAddCategory}
                    onCancel={() => setOpenAddCategory(false)}
                    okText="موافق"
                    cancelText="إلغاء"
                    okButtonProps={{ style: { display: "none", backgroundColor: '#4096ff' } }}
                >
                    <CreateCategory />
                </Modal>
            </div>


            <Modal
                title="تعديل قسم"
                open={openEditeCategory}
                onCancel={() => setOpenEditeCategory(false)}
                okText="موافق"
                cancelText="إلغاء"
                okButtonProps={{ style: { display: "none", backgroundColor: '#4096ff' } }}
            >
                <EditCategory id={id} setOpenEditeCategory={setOpenEditeCategory} />
            </Modal>


            <div>
                <Modal
                    title="حذف قسم !!!"
                    open={openDelete}
                    onOk={hideModalAndDeleteItem}
                    onCancel={() => setOpenDelete(false)}
                    okText="موافق"
                    cancelText="إلغاء" okButtonProps={{ style: { backgroundColor: '#4096ff' } }}
                >
                    <p>هل أنت متأكد من أنك تريد حذف القسم  ؟</p>
                </Modal>
            </div>

        </div>

    )
}

export default PageContent