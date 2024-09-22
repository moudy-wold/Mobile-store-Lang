"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Space, Table, Modal, Button, notification } from "antd";
import type { ColumnsType, } from "antd/es/table";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { useRouter } from 'next/navigation';
import Loader from '@/app/[locale]/components/global/Loader/Loader';
import { DeleteStatus } from "@/app/[locale]/api/status";

import { useDispatch } from "react-redux"
import EditStatus from "./edit/editStatus";
import CreateStatus from "./create/createStatus";
type Props = {
    data:{
        image: any,
        _id: number,
        description: string,
        title: string
    }[]
}
function PageContent(data : any) {
    const dispatch = useDispatch()
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [openAddStatus, setOpenAddStatus] = useState(false);
    const [openEditeStatus, setOpenEditeStatus] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState("");


    const columns: ColumnsType<any> = [
        {
            title: "العنوان",
            dataIndex: "title",
            key: "title",
            render: (_, record) => (
                <Space size="middle">
                    <a>{record.title}</a>
                </Space>
            ),
        },
        {
            title: "الصورة",
            dataIndex: "iamge",
            key: "iamge",
            render: (_, record) => (
                <Space size="middle">
                    <Image src={record.image} width={100} height={100} alt={record.title} />
                </Space>
            ),
        },
        {
            title: "الوصف",
            dataIndex: "description",
            key: "description",
            render: (_, record) => (
                <Space size="middle">
                    <a>{record.description}</a>
                </Space>
            ),
        },
        {
            title: "الإجرائات",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a><CiEdit onClick={() => { setOpenEditeStatus(true); setId(record.id) }} /></a>
                    <a><RiDeleteBinLine onClick={() => { setOpenDelete(true); setId(record.id) }} /></a>
                </Space>
            ),
        },
    ];

    const tableData = data?.data?.data?.map((status: any) => ({
        id: status._id,
        image: status.image,
        title: status.title,
        description: status.description,
    }));
    const hideModalAndDeleteItem = () => {
        setIsLoading(true)
        setOpenDelete(false)
        DeleteStatus(id)
            .then((res) => {
                if (res.status == 200) {
                    notification.success({
                        message: "تم حذف لحالة بنجاح"
                    });
                    router.refresh()
                }
            })
            .catch((err) => {
                notification.error({
                    message: err.response.data.error.message

                });
            })
            .finally(() => {
                setIsLoading(false)
                setOpenDelete(false);
            })
    };
    return (
        <div className="">
            {isLoading && <Loader />}
            <div className="my-5 mb-8">
                <div className="">
                    <Button className="flex items-center" onClick={() => { setOpenAddStatus(true) }}>
                        <span className="">أضف حالة</span> <CiCirclePlus className="mr-1" />
                    </Button>
                </div>

            </div>

            <Table columns={columns} dataSource={tableData} />

            <div>
                <Modal
                    title="إضافة حالة"
                    open={openAddStatus}
                    onCancel={() => setOpenAddStatus(false)}
                    okText="موافق"
                    cancelText="إلغاء"
                    okButtonProps={{ style: { display: "none", backgroundColor: '#4096ff' } }}
                >
                    <CreateStatus />
                </Modal>
            </div>


            <Modal
                title="تعديل الحالة"
                open={openEditeStatus}
                onCancel={() => setOpenEditeStatus(false)}
                okText="موافق"
                cancelText="إلغاء"
                okButtonProps={{ style: { display: "none", backgroundColor: '#4096ff' } }}
            >
                <EditStatus id={id} setOpenEditeStatus={setOpenEditeStatus} />
            </Modal>


            <div>
                <Modal
                    title="حذف الحالة !!!"
                    open={openDelete}
                    onOk={hideModalAndDeleteItem}
                    onCancel={() => setOpenDelete(false)}
                    okText="موافق"
                    cancelText="إلغاء" okButtonProps={{ style: { backgroundColor: '#4096ff' } }}
                >
                    <p>هل أنت متأكد من أنك تريد حذف الحالة  ؟</p>
                </Modal>
            </div>

        </div>

    )
}

export default PageContent