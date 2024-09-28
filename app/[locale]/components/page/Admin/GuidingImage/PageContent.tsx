"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Space, Table, Modal, Button, notification } from "antd";
import type { ColumnsType, } from "antd/es/table";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { useRouter } from 'next/navigation';
import Loader from '@/app/[locale]/components/global/Loader/Loader';
import { DeleteEmployee } from "@/app/[locale]/api/guidingImage";

import { useDispatch } from "react-redux"
import EditGuidingImage from "./edit/EditGuidingImage";
import CreateGuidingImage from "./create/CreateGuidingImage";
import { useTranslation } from "@/app/i18n/client";
type Props = {
    data:{
        image: any,
        _id: number,
        description: string,
        title: string
    }[],
    locale: LocaleProps | string
}
function GuidingImage({data , locale} :any) {
  const { t } = useTranslation(locale, "common");
    const dispatch = useDispatch()
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [openAddGuidingImage, setOpenAddGuidingImage] = useState(false);
    const [openEditeGuidingImage, setOpenEditeGuidingImage] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState("");
    const [editedImage ,setEditedImage ] = useState({image:"",url:""})

    const columns: ColumnsType<any> = [
        {
            title: t("image"),
            dataIndex: "iamge",
            key: "iamge",
            render: (_, record) => (
                <Space size="middle">
                    <Image src={record.image} width={400} height={100} alt={record.title}  className="!w-[400px] !h-[200px] object-cover" />
                </Space>
            ),
        },
        {
            title: t("link"),
            dataIndex: "url",
            key: "url",
            render: (_, record) => (
                <Space size="middle">
                    <a>{record.url}</a>
                </Space>
            ),
        },
        
        {
            title: t("actions"),
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a><CiEdit onClick={() => { setOpenEditeGuidingImage(true); setEditedImage(prevState => ({...prevState,image: record.image , url:record.url })); setId(record.id) }} /></a>
                    <a><RiDeleteBinLine onClick={() => { setOpenDelete(true); setId(record.id) }} /></a>
                </Space>
            ),
        },
    ];

    const tableData = data?.data?.data?.map((guiding_image: any) => ({
        id: guiding_image.id,
        image: guiding_image.image,
        url: guiding_image.url,
        
    }));
    const hideModalAndDeleteItem = () => {
        setIsLoading(true)
        setOpenDelete(false)
        DeleteEmployee(id)
            .then((res) => {
                if (res.status == 200) {
                    notification.success({
                        message: t("deleted_guiding_image_successfully")
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
                    <Button className="flex items-center" onClick={() => { setOpenAddGuidingImage(true) }}>
                        <span className="">{t("add_guiding_image")}</span> <CiCirclePlus className="mr-1" />
                    </Button>
                </div>

            </div>

            <Table columns={columns} dataSource={tableData} />

            <div>
                <Modal
                    title={t("add_guiding_image")}
                    open={openAddGuidingImage}
                    onCancel={() => setOpenAddGuidingImage(false)}
                    okText={t("confirm")}
                    cancelText={t("close")}
                    okButtonProps={{ style: { display: "none", backgroundColor: '#4096ff' } }}
                >
                    <CreateGuidingImage locale={locale} />
                </Modal>
            </div>


            <Modal
                title={t("edit_guiding_image")}
                open={openEditeGuidingImage}
                onCancel={() => setOpenEditeGuidingImage(false)}
                okText={t("confirm")}
                cancelText={t("close")}
                okButtonProps={{ style: { display: "none", backgroundColor: '#4096ff' } }}
            >
                <EditGuidingImage locale={locale} id={id} setOpenEditeGuidingImage={setOpenEditeGuidingImage} data={editedImage} />
            </Modal>


            <div>
                <Modal
                    title={t("delete_guinding_image")}
                    open={openDelete}
                    onOk={hideModalAndDeleteItem}
                    onCancel={() => setOpenDelete(false)}
                    okText="موافق"
                    cancelText="إلغاء" okButtonProps={{ style: { backgroundColor: '#4096ff' } }}
                >
                    <p>{t("are_you_sure_you_want_delete_guiding_image")}</p>
                </Modal>
            </div>

        </div>

    )
}
 

export default GuidingImage
