"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux"
import Loader from '@/app/[locale]/components/global/Loader/Loader';
import { DeleteCategory } from "@/app/[locale]/api/category";
import { Space, Table, Modal, Button, notification, Switch } from "antd";
import type { ColumnsType, } from "antd/es/table";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { setcategoryId } from "@/app/[locale]/lib/todosSlice";
import { useTranslation } from "@/app/i18n/client";
import dynamic from 'next/dynamic'

const EditCategory = dynamic(() => import('./EditCategory/page'), { ssr: false })
const CreateCategory = dynamic(() => import('./CreateCategory/CreateCategory'), { ssr: false })

type Props = {
    data: any,
    locale: LocaleProps | any
}
function PageContent({ data, locale }: Props) {
    const { t } = useTranslation(locale, "common");

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
            title: t("section_name"),
            dataIndex: "categoryName",
            key: "categoryName",
            render: (_, record) => (
                <Space size="middle">
                    <a href={`/admin/category/${record.categoryName}`} onClick={() => { handleSetCategoryId(record.id) }} >{record.categoryName}</a>
                </Space>
            ),
        },
        {
            title: "section_name_local",
            dataIndex: "arabicName",
            key: "arabicName",
            render: (_, record) => (
                <Space size="middle">
                    <a href={`/admin/category/${record.categoryName}`} onClick={() => { handleSetCategoryId(record.id) }}>{record.arabicname}</a>
                </Space>
            ),
        },
        {
            title: t("comparison"),
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
            title: t("actions"),
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
                        message: t("section_deleted_successfully")
                    });
                }
            })
            .catch((err) => {
                notification.error({
                    message: err.response.data.message

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
                        <span className="">{t("add_section")}</span> <CiCirclePlus className="mr-1" />
                    </Button>
                </div>

            </div>

            <Table columns={columns} dataSource={tableData} />

            <div>
                <Modal
                    title={t("add_section")}
                    open={openAddCategory}
                    onCancel={() => setOpenAddCategory(false)}

                    okButtonProps={{ style: { display: "none", backgroundColor: '#4096ff' } }}
                >
                    <CreateCategory locale={locale} />
                </Modal>
            </div>


            <Modal
                title={t("edit_section")}
                open={openEditeCategory}
                onCancel={() => setOpenEditeCategory(false)}
                okText={t('confirm')}
                cancelText={t('close')}
                okButtonProps={{ style: { display: "none", backgroundColor: '#4096ff' } }}
            >
                <EditCategory id={id} setOpenEditeCategory={setOpenEditeCategory} />
            </Modal>


            <div>
                <Modal
                    title={t("delete_section!!!")}
                    open={openDelete}
                    onOk={hideModalAndDeleteItem}
                    onCancel={() => setOpenDelete(false)}
                    okText={t('confirm')}
                    cancelText={t('close')}
                    okButtonProps={{ style: { backgroundColor: '#4096ff' } }}
                >
                    <p>{t("are_you_sure_you_want_to_delete_section")}</p>
                </Modal>
            </div>

        </div>

    )
}

export default PageContent