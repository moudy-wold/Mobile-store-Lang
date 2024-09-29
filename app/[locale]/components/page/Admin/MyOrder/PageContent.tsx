"use client";
import React, { useEffect, useState } from "react";
import { Space, Table, Modal, notification } from "antd";
import { ColumnsType } from "antd/es/table";
import { GetAllOrders, GetAllOrderForCustomer } from "@/app/[locale]/api/order";
import { MdOutlineDoneOutline } from "react-icons/md";
import { useTranslation } from "@/app/i18n/client";
import dynamic from 'next/dynamic';
const OrderDataCards = dynamic(() => import("./OrderDataCards/OrderDataCards"), { ssr: false })

function MyOrder({ locale }: LocaleProps) {
  const { t } = useTranslation(locale, "common");
  const [isLoading, setIsLoading] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  const orderStatusTranslations: any = {
    pending: t("pending_request"),
    preparing: t("preparing"),
    in_shipping: t("in_shipping"),
    done: t("done"),
  };

  function translateOrderStatus(status: any) {
    return orderStatusTranslations[status] || status;
  }
  useEffect(() => {
    //   const getData = async ()=>{
    //     setIsLoading(true)
    //     try{
    //       const res = await GetAllOrderForCustomer()
    //       setIsLoading(false)
    //       setData(res?.data?.data)
    //     } catch(err:any){
    //       setIsLoading(false)
    //       notification.error({
    //         message:err.response.data.message
    //       })
    //     }
    //   }
    //   getData()
  }, []);
  const columns: ColumnsType<any> = [
    {
      title: t("total_price"),
      dataIndex: "total",
      key: "total",
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
          <a>{translateOrderStatus(record.status)}</a>
          {record.status == "done" && (
            <MdOutlineDoneOutline className="text-[#5cb85c]" />
          )}
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
              setIndex(record.index);
            }}
          >
            {t("view_order")}
          </a>
        </Space>
      ),
    },
  ];

  const tableData = data?.map((order: any, index: number) => ({
    index: index,
    id: order._id,
    total: order.total,
    note: order.note,
    status: order.status,
  }));
  return (
    <div className="bg-white  p-5 px-20">
      <Table columns={columns} dataSource={tableData} />
      <Modal
        title={t("order")}
        centered
        width={1000}
        open={openOrder}
        onCancel={() => setOpenOrder(false)}
        cancelText={t("close")}
        okButtonProps={{
          style: { backgroundColor: "#4096ff", display: "none" },
        }}
      >
        <OrderDataCards data={data[index]} locale={locale} />
      </Modal>
    </div>
  );
}

export default MyOrder;
