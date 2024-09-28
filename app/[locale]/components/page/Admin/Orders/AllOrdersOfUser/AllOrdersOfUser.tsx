"use client";
import { DeleteOrder, EditOrderStatus, GetAllOrdersForUserByUserId } from "@/app/[locale]/api/order";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { orderStatuss } from "@/app/[locale]/utils/constant";
import { notification, Space,Modal } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { MdOutlineDoneOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import OrderCards from "../OrderCards/OrderCards";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

function AllOrdersOfUser({ userId,locale }: any) {
    const { t } = useTranslation(locale,"common")
    const [isLoading, setIsLoading] = useState(false);
    const [openOrder, setOpenOrder] = useState(false);
    const [index, setIndex] = useState(0);
    const [openDelete, setOpenDelete] = useState(false);
    const [OrderId, setOrderId] = useState("");
    const router = useRouter();
    const [data, setData] = useState([])

    useEffect(() => {
        console.log(userId)
        const getData = async () => {
            GetAllOrdersForUserByUserId(userId)
                .then((res: any) => {
                    if (res.status) {
                        setData(res.data.data)
                    }
                })
                .catch((err: any) => {
                    console.log(err.response)
                })
        }
        getData();
    }, [])
    const handleChangeStatus = (id: string, value: string) => {
        setIsLoading(true)
        EditOrderStatus(id, value)
            .then((res: any) => {
                if (res.status) {
                    setIsLoading(false)
                    notification.success({
                        message: t("customer_info_edited_successfully")
                    })
                }
            })
            .catch((err: any) => {
                console.log(err.response.data)
                setIsLoading(false)
                notification.error({
                    message: err.response.data.message
                })
            })
    }
    const hideModalAndDeleteItem = () => {
        setIsLoading(true)
        setOpenDelete(false)
        DeleteOrder(OrderId)
          .then((res) => {
            if (res.status) {
              notification.success({
                message: t("request_has_been_successfully_deleted")
              });
            }
          })
          .catch((err) => {
            console.log(err.response)
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
    const columns: ColumnsType<any> = [
        {
            title: t("customer_name"),
            dataIndex: "customerName",
            key: "customerName",
            render:(_, record) => <a>{record.customerName}</a>,
        },
        {
            title: t("input_name"),
            dataIndex: "userName",
            key: "userName",
            render:(_, record) => <a>{record.userName}</a>,
        },
        {
            title: t("phoneNumber"),
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
        },
        {
            title: t("address"),
            dataIndex: "address",
            key: "address",
            render: (text) => <a>{text}</a>,
        },
        {
            title: t("note"),
            dataIndex: "note",
            key: "note",
            render: (text) => <a>{text}</a>,
        },
        {
            title: t("order_status"),
            dataIndex: "status",
            key: "status",           
            render: (_, record) => (
                <Space size="middle">
                    <select
                        onChange={(e) => { handleChangeStatus(record.id, e.target.value); }}
                        style={{ width: "100%" }}
                        className="w-full border-2 border-gray-200 rounded-lg h-12"
                    >
                        {orderStatuss.map((item: any, index: number) => {
                            return (
                                <>
                                    {item.value == record.status ?
                                        <option value={item.value} key={item.id} selected>
                                            {t(item.label)}                                            
                                        </option> :
                                        <option value={item.value} key={index}>
                                            {t(item.label)}                                            
                                            
                                        </option>}
                                </>
                            )
                        })}
                    </select>
                    {record.status == "done" && <MdOutlineDoneOutline className="text-[#5cb85c]" />}
                </Space>
            ),
        },
        {
            title: t("order"),
            key: "order",
            render: (_, record) => (
                <Space size="middle">
                    <a
                        className="border-2 border-gray-400 rounded-xl p-2 hover:bg-gray-100 block text-xs lg:text-xl text-center"
                        onClick={() => {
                            setOpenOrder(true);
                            setIndex(record.index)
                            // handleFetchService(record.id);
                        }}
                    >                        
                        {t("view_order")}
                    </a>
                </Space>
            ),
        },
        {
            title: t("actions"),
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a><RiDeleteBinLine onClick={() => { setOpenDelete(true); setOrderId(record.id)  }} /></a>
                </Space>
            ),
        },
    ];

    const tableData = data?.map((order: any, index: number) => ({
        index: index,
        id: order.id,
        userId: order.user_customer._id,
        customerName: order.user_customer.userName,
        userName: order.user_name,
        phoneNumber: order.phone,
        address: order.address,
        note: order.note,
        status: order.status,
    }));

    return (
        <div className="">
        <Loader isLoading={isLoading} />
        <div className="">
            <Table columns={columns} dataSource={tableData} />
        </div>
        <div>
            <Modal
                title={t("delete_order!!!")}
                open={openDelete}
                onOk={hideModalAndDeleteItem}
                onCancel={() => setOpenDelete(false)}
                okText={t("confirm")}
                cancelText={t("close")}
                okButtonProps={{ style: { backgroundColor: '#4096ff' } }}
            >
                <p>{t("are_you_sure_you_want_to_delete_order")}</p>
            </Modal>

            <Modal
                title={t("order")}
                centered
                width={1000}
                open={openOrder}
                onCancel={() => setOpenOrder(false)}                
                cancelText={t("close")}
                okButtonProps={{ style: { backgroundColor: '#4096ff', display: "none" } }}
            >
                <OrderCards data={data[index]} locale={locale} />
            </Modal>

            

        </div>
    </div>
    )
}
export default AllOrdersOfUser