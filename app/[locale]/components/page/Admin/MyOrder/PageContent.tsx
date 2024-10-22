"use client";
import React, { useEffect, useState } from "react";
import { Space, Table, Modal, notification, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { GetAllOrders_Talab } from "@/app/[locale]/api/talab";
import { MdOutlineDoneOutline } from "react-icons/md";
import { useTranslation } from "@/app/i18n/client";
import dynamic from 'next/dynamic';
import { GiMoebiusTrefoil } from "react-icons/gi";
import CancellationReq from "./CancellationReq/CancellationReq"
import { OrderStatus_Talab } from "@/app/[locale]/utils/constant";
const OrderDataCards = dynamic(() => import("./OrderDataCards/OrderDataCards"), { ssr: false })

function MyOrder({ locale }: LocaleProps) {
  const { t } = useTranslation(locale, "common");
  const [isLoading, setIsLoading] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [openCancellation, setOpenCancellation] = useState(false)
  const [openCancellation_question, setOpenCancellation_question] = useState(false)
  const [cantCancellation ,setCantCancellation] = useState(false);
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState<any>(0);
  const [order_id , setOrder_id] = useState("")

  const handlePageChange = async (page: any) => {
    setIsLoading(true);
    setPage(page + 1);
    setIsLoading(true);

    try {
      const res = await GetAllOrders_Talab(page);
      setCurrentPage(res.data.pagination.current_page);
      setIsLoading(false);
    } catch (err: any) {
      notification.error({
        message: err.response.data.error.message,
      });
      setIsLoading(false);
    }
  };

  const orderStatusTranslations: any = {
    pending: t("pending_request"),
    preparing: t("preparing"),
    in_shipping: t("in_shipping"),
    done: t("done"),
  };
  
  const getOrderStatusLabel = (status:any) => {
    const statusObj = OrderStatus_Talab.find(item => item.value === status);
    return statusObj ? statusObj.label : "حالة غير معروفة";
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      try {
        const res = await GetAllOrders_Talab(1)
        setTotalItems(res.data.pagination.total);
        setPageSize(res.data.pagination.per_page);
        setIsLoading(false)
        setData(res?.data?.data)
      } catch (err: any) {
        setIsLoading(false)
        notification.error({
          message: err.response.data.message
        })
      }
    }
    getData()
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
        <span>{getOrderStatusLabel(record.status)}</span>
        {record.status === "done" && <MdOutlineDoneOutline className="text-[#5cb85c]" />}
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
    {
      title: t("actions"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
           <GiMoebiusTrefoil className={`cursor-pointer hover:scale-110 transition-all duration-150 text-xl`} onClick={() => {if(record.status == "pending" || record.status == "preparing"){setOpenCancellation_question(true); setOrder_id(record.id);console.log(record)}else{setCantCancellation(true)}}} />
        </Space>
      ),
    },
  ];

  const tableData = data?.map((order: any, index: number) => ({
    index: index,
    id: order.id,
    total: order.total,
    note: order.note,
    status: order.status,
  }));

  return (
    <div className="bg-white  p-5 px-20">
        <Table
        columns={columns}
        dataSource={tableData}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalItems,
          onChange: handlePageChange,
        }} />

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

      <Modal
        title={t("cancellation_request")}
        centered
        width={500}
        open={cantCancellation}
        onCancel={() => setCantCancellation(false)}        
        cancelText={t("close")}
        okButtonProps={{ style: { display:"none" } }}
      >
        <p className="text-lg">{t("cancellation_request_cannot_be_submitted_because_request__advanced_stage")}</p>
      </Modal>

      <Modal
        title={t("confirm_cancellation")}
        centered
        width={500}
        open={openCancellation_question}
        onCancel={() => setOpenCancellation_question(false)}
        onOk={() => { setOpenCancellation(true);setOpenCancellation_question(false) }}
        okText={t("confirm")}
        cancelText={t("close")}
        okButtonProps={{ style: { backgroundColor: "#4096ff" } }}
      >
        <p className="my-6 text-lg">{t("are_you_sure_you_want_to_submit_cancellation_request_for_order")}</p>
      </Modal>


      <Modal
        title={t("cancellation_request")}
        centered
        width={800}
        open={openCancellation}
        onCancel={() => setOpenCancellation(false)}
        cancelText={t("close")}
        okButtonProps={{ style: { backgroundColor: "#4096ff", display: "none" }, }}
      >
        <CancellationReq order_id={order_id} locale={locale} setOpenCancellation={setOpenCancellation} />
      </Modal>
    </div>
  );
}

export default MyOrder;
