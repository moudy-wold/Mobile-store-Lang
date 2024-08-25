"use client"
import React from 'react'
import { Table,Space } from 'antd'
import { ColumnsType } from 'antd/es/table';
import {  CiEdit } from "react-icons/ci";

function SubscriptionInformation( props: any) {


  const columns: ColumnsType<any> = [
    {
      title: "رقم الهاتف",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "إسم الموقع",
      dataIndex: "domain",
      key: "domain",
    },
    {
      title: "عدد الزبائن",
      dataIndex: "max_customer",
      key: "max_customer",
    },
    {
      title: "عدد الصيانات",
      dataIndex: "max_repair_service",
      key: "max_repair_service",
    },
    {
      title: "عدد المنتجات",
      dataIndex: "max_products",
      key: "max_products",
    },
    {
      title: "عدد الموظفين",
      dataIndex: "max_employee",
      key: "max_employee",
    },     
    {
      title: "تاريخ الإنتهاء",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "الإجرائات",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a className="border-2 border-[#006496] rounded-lg p-2 bg-[#006496] text-white hover:text-[#006496] hover:bg-white transition-all duration-150" onClick={()=>{ setTimeout(() => {window.scrollTo({ top: 1600, behavior: "smooth" });}, 200); props.setSlidePlans(true)}}  >تجديد الإشتراك </a>
        </Space>
      ),
    },


  ];

  const tableData = [{
    phoneNumber:  props?.data?.data?.createdBy?.phoneNumber,
    domain: props?.data?.data?.createdBy?.domain,
    max_customer: props?.data?.plan_detils_limit,
    max_repair_service:props?.data?.plan_detils_limit,
    max_products: props?.data?.plan_detils_limit,
    max_employee: props?.data?.plan_detils_limit,    
    endDate: "2025/3/2",
  }]





  return (
    <div>
      <Table  scroll={{ x: 750 }} columns={columns} dataSource={tableData} />
    </div>
  )
}

export default SubscriptionInformation
