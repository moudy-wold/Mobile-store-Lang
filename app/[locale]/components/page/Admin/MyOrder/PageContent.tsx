"use client"
import React, { useEffect, useState } from 'react'
import { Space, Table, Modal, notification } from "antd";
import { ColumnsType } from "antd/es/table";
import { GetAllOrders, GetAllOrderForCustomer } from '@/app/[locale]/api/order';
import OrderDataCards from './OrderDataCards/OrderDataCards';
import { MdOutlineDoneOutline } from 'react-icons/md';


function MyOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const orderStatusTranslations  :any = {
    pending: "جاري مراجع الطلب",
    preparing: "جاري التجهيز",
    in_shipping: "في الشحن",
    done: "تم التسليم"
  };
  function translateOrderStatus(status:any) {
    return orderStatusTranslations[status] || status;
  }
useEffect(()=>{
//   const getData = async ()=>{
//     setIsLoading(true)
//     try{
//       const res = await GetAllOrderForCustomer()
//       setIsLoading(false)      
//       console.log(res.data.data)
//       setData(res?.data?.data)
//     } catch(err:any){
//       setIsLoading(false)      
//       notification.error({
//         message:err.response.data.message
//       })
//     }
//   }
//   getData()

},[])
  const columns: ColumnsType<any> = [     
    {
      title: " السعر الإجمالي",
      dataIndex: "total",
      key: "total",
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
        <a>{translateOrderStatus(record.status)}</a>
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
            }}
          >
            عرض الطلب
          </a>
        </Space>
      ),
    },

  ];

  const tableData = data?.map((order: any,index:number) => ({
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
                    title="الطلب"
                    centered
                    width={1000}
                    open={openOrder}                    
                    onCancel={() => setOpenOrder(false)}
                    cancelText="إغلاق"
                    okButtonProps={{ style: { backgroundColor: '#4096ff',display:"none" } }}
                >
                    <OrderDataCards data={data[index]} />
                </Modal>
    </div>
  )
}

export default MyOrder
