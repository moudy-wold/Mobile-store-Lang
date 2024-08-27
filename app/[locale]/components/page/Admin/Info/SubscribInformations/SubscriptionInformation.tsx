"use client"
import React  from 'react'
import { Table,Space } from 'antd'
import { ColumnsType } from 'antd/es/table';
import {  CiEdit } from "react-icons/ci";

function SubscriptionInformation( props: any) {
  const columns: ColumnsType<any> = [
    {
      title: "رقم الهاتف",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align:"center",
    },
    {
      title: "إسم الموقع",
      dataIndex: "domain",
      key: "domain",
      align:"center",
    },
    {
      title: "عدد الزبائن المتبقية",
      dataIndex: "max_customer",
      key: "max_customer",
      align:"center",
    },
    {
      title: "عدد الصيانات المتبقية",
      dataIndex: "max_repair_service",
      key: "max_repair_service",
      align:"center",
    },
    {
      title: "عدد المنتجات المتبقية",
      dataIndex: "max_products",
      key: "max_products",
      align:"center",
    },
    {
      title: "عدد الموظفين المتبقي",
      dataIndex: "max_employee",
      key: "max_employee",
      align:"center",
    },     
    {
      title: "تاريخ الإنتهاء",
      dataIndex: "endDate",
      key: "endDate",
      width: 150,
      align:"center",
    },
    {
      title: "الإجرائات",
      key: "action",
      width: 100,
      align:"center",
      render: (_, record) => (
        <Space size="middle">
          <a className={`${props.day_14 ? "block":"hidden"} text-center  border-2 border-[#006496] rounded-lg p-1 bg-[#006496] text-white hover:text-[#006496] hover:bg-white transition-all duration-150`} onClick={()=>{ setTimeout(() => {window.scrollTo({ top: 1600, behavior: "smooth" });}, 200); props.setSlidePlans(true)}}  >{props?.day_14 && "تجديد الإشتراك"} </a>
        </Space>
      ),
    },


  ];

  const tableData = [{
    phoneNumber:  props?.data?.data?.createdBy?.phoneNumber,
    domain: props?.data?.data?.createdBy?.domain,
    max_customer: props?.data?.plan_detils_limit?.max_customer,
    max_repair_service:props?.data?.plan_detils_limit?.max_repair_service,
    max_products: props?.data?.plan_detils_limit?.max_products,
    max_employee: props?.data?.plan_detils_limit?.max_employee,
    endDate: props?.data?.data?.plan_expiration_date,
  }]





  return (
    <div>
      <Table  scroll={{ x: 950 }} columns={columns} dataSource={tableData} />
    </div>
  )
}

export default SubscriptionInformation
