"use client";
import React from "react";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import { MdOutlineDoneOutline } from "react-icons/md";
import { useTranslation } from "@/app/i18n/client";
type Props = {
  data: any[];
};

function MySerivexs({ services, locale }: any) {
  const { t } = useTranslation(locale, "common");

  const serviceDataToShow = services?.map((item: any) => ({
    id: item._id,
    phoneType: item.phoneType,
    serviceType: item.serviceType,
    serviceCost: item.serviceCost,
    serviceStatus: item.serviceStatus,
    warantiDuration: item.warantiDuration,
    receivedDate: moment(item.createdAt).locale("en").format("DD/MM/YYYY"),
    deliveryDate: moment(item.updatedAt).locale("en").format("DD/MM/YYYY"),
  }));

  const serviceColumns: ColumnsType<any> = [
    {
      title: t("phone_type"),
      dataIndex: "phoneType",
      key: "phoneType",
    },
    {
      title: t("service_type"),
      dataIndex: "serviceType",
      key: "serviceType",
    },
    {
      title: t("service_cost"),
      dataIndex: "serviceCost",
      key: "serviceCost",
    },
    {
      title: t("service_status"),
      dataIndex: "serviceStatus",
      key: "serviceStatus",
      render: (_, record) => (
        <Space size="middle">
          {record.serviceStatus == "delivered" ? (
            <span className="flex items-center">
              {" "}
              {record.serviceStatus}{" "}
              <MdOutlineDoneOutline className=" mr-5 text-[#5cb85c]" />{" "}
            </span>
          ) : (
            <span>{record.serviceStatus}</span>
          )}
        </Space>
      ),
    },
    {
      title: t("waranti_duration"),
      key: "warantiDuration",
      dataIndex: "warantiDuration",
    },
    {
      title: t("received_date"),
      dataIndex: "receivedDate",
      key: "receivedDate",
    },
    {
      title: t("delivery_date"),
      dataIndex: "deliveryDate",
      key: "deliveryDate",
    },
  ];

  return (
    <div className="bg-white  p-5">
      <Table
        columns={serviceColumns}
        dataSource={serviceDataToShow}
        scroll={{ x: 500 }}
        className="border-1 border-red-300"
        style={{
          border: "2px",
          borderColor: "#e5e7eb",
          borderStyle: "solid",
          borderRadius: "8px",
        }}
      />
    </div>
  );
}
export default MySerivexs;
