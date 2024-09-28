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

function AllOrdersOfUser({ userId,locale }: any) {
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
                        message: "تم  تعديل الحالة بنجاح"
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
                message: "تم حذف الطلب بنجاح"
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
            title: "إسم الزبون",
            dataIndex: "customerName",
            key: "customerName",
            render:(_, record) => <a>{record.customerName}</a>,
        },
        {
            title: "الإسم المدخل",
            dataIndex: "userName",
            key: "userName",
            render:(_, record) => <a>{record.userName}</a>,
        },
        {
            title: "رقم الهاتف",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
        },
        {
            title: "العنوان",
            dataIndex: "address",
            key: "address",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "ملاحظات",
            dataIndex: "note",
            key: "note",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "حالة الطلب",
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
                                            {item.label}                                            
                                        </option> :
                                        <option value={item.value} key={index}>
                                            {item.label}                                            
                                            
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
            title: "الطلب",
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
                        عرض الطلب
                    </a>
                </Space>
            ),
        },
        {
            title: "الإجرائات",
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
                title="حذف الطلب!!!"
                open={openDelete}
                onOk={hideModalAndDeleteItem}
                onCancel={() => setOpenDelete(false)}
                okText="موافق"
                cancelText="إلغاء" okButtonProps={{ style: { backgroundColor: '#4096ff' } }}
            >
                <p>هل أنت متأكد من أنك تريد حذف الطلب ؟</p>
            </Modal>

            <Modal
                title="الطلب"
                centered
                width={1000}
                open={openOrder}
                onCancel={() => setOpenOrder(false)}
                cancelText="إغلاق"
                okButtonProps={{ style: { backgroundColor: '#4096ff', display: "none" } }}
            >
                <OrderCards data={data[index]} />
            </Modal>

            

        </div>
    </div>
    )
}
export default AllOrdersOfUser