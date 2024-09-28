"use client"
import React, { useEffect,useState } from "react";
import { Space, Table, } from "antd";
import type { ColumnsType, } from "antd/es/table";
import { GetCustomerByIdForCustomer } from "@/app/[locale]/api/customer";
import moment from "moment";
import { MdOutlineDoneOutline } from "react-icons/md";
type Props = {
  data: any[]
}


function MySerivexs({ services,locale }: any) {
  
  const serviceDataToShow = services?.map((item: any) => ({
    id: item._id,
    phoneType: item.phoneType,
    serviceType: item.serviceType,
    serviceCost: item.serviceCost,
    serviceStatus: item.serviceStatus,
    warantiDuration: item.warantiDuration,
    receivedDate: moment(item.createdAt).locale('en').format('DD/MM/YYYY'),
    deliveryDate: moment(item.updatedAt).locale('en').format('DD/MM/YYYY'),
  }));


  const serviceColumns: ColumnsType<any> = [
    {
      title: "نوع الهاتف",
      dataIndex: "phoneType",
      key: "phoneType",
    },
    {
      title: "نوع الصيانة",
      dataIndex: "serviceType",
      key: "serviceType",
    },
    {
      title: "تكلفة الصيانة",
      dataIndex: "serviceCost",
      key: "serviceCost",
    },
    {
      title: "حالة الصيانة",
      dataIndex: "serviceStatus",
      key: "serviceStatus",
      render: (_, record) => (
        <Space size="middle">          
          {record.serviceStatus == "delivered" ? <span className="flex items-center"> {record.serviceStatus} <MdOutlineDoneOutline className=" mr-5 text-[#5cb85c]" /> </span> : <span>{record.serviceStatus}</span>}
        </Space>
      ),
    },
    {
      title: "مدة الكفالة",
      key: "warantiDuration",
      dataIndex: "warantiDuration",
    },
    {
      title: "تاريح الإستلام",
      dataIndex: "receivedDate",
      key: "receivedDate",

    },
    {
      title: "تاريخ التسليم",
      dataIndex: "deliveryDate",
      key: "deliveryDate",

    },
  ];

  return (

    <div className="bg-white  p-5">

      <Table columns={serviceColumns} dataSource={serviceDataToShow} scroll={{ x: 500 }} className="border-1 border-red-300" style={{ border: "2px", borderColor: "#e5e7eb", borderStyle: "solid", borderRadius: "8px" }} />
    </div>
  )
}
export default MySerivexs;