"use client";
import React, { useEffect, useState } from "react";
import { Space, Table, Modal, Button, notification, Pagination, } from "antd";
import type { ColumnsType, } from "antd/es/table";
import Loader from '@/app/[locale]/components/global/Loader/Loader';
import { GetTicketById, GetAllTicket } from "@/app/[locale]/api/ticket";
import { BiShow } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
import { useSelector } from "react-redux";

function Support() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [openFile, setOpenFile] = useState(false)
  const [file, setFile] = useState("")
  const { ticketMessage} = useSelector((state: any) => state.counter)

  // First Fetch
  useEffect(() => {

    const getData = async () => {
      const res = await GetAllTicket(1);
      setCurrentPage(res.data.pagination.current_page);
      setTotalItems(res.data.pagination.total)
      setPageSize(res.data.pagination.per_page)
    }
    setData(ticketMessage)
    // getData()
  }, [])

  const handlePageChange = async (page: any) => {

    setIsLoading(true)
    try {
      const res = await GetAllTicket(page);
      setData(res.data.customers)
      setCurrentPage(res.data.pagination.current_page);
      setIsLoading(false)

    }
    catch (err: any) {
      notification.error({
        message: err.response.data.message
      })
      setIsLoading(false)
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: "الموضوع",
      dataIndex: "subject",
      key: "subject",
      sorter: (a, b) => a.subject.localeCompare(b.subject),

    },
    {
      title: "الشرح",
      dataIndex: "description",
      key: "description",
      width: 300,
      render: (_, record) => (
        <Space size="middle">
          <div>
            <p className="limited-text">{record.description}</p>
            <Link href={`/admin/support/${record.id}`} className="block w-fit bg-[#006496] border-2 border-[#006496] hover:text-[#006496] hover:bg-white text-white mt-1 p-1 pb-2 transition-all duration-150  rounded-lg text-center ">عرض المزيد</Link>
          </div>
        </Space>
      ),
    },
    {
      title: "الملف",
      key: "file",
      dataIndex: "file",
      render: (_, record) => (
        <Space size="middle">
          <Image src={record.file} alt="as" width={100} height={100} className="hover:scale-110 transition-all duratiom-150" onClick={()=>{setOpenFile(true); setFile(record.file)}} />
        </Space>
      ),
    },
    {
      title: "الإجرائات",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href={`/admin/support/${record.id}`} className="hover:scale-110 transition-all duratiom-150 block mx-auto" ><BiShow /></a>
        </Space>
      ),
    },
  ];
  const dataToShow = ticketMessage?.map((item: any) => ({
    id: item.id,
    subject: item.subject,
    description: item.description,
    file: item.file,

  }));
  return (
    <div>
      {isLoading && <Loader />}
      <div className="mt-5 mb-8">
        <div className="">
          <Link href={`/admin/support/create`} >
            <Button className="flex items-center" onClick={() => { console.log(true) }}>
              <span className="">أنشئ دعم جديد</span> <CiCirclePlus className="mr-1" />
            </Button>
          </Link>
        </div>

      </div>
      <Table
        columns={columns}
        dataSource={dataToShow}
        scroll={{ x: 750 }}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalItems,
          onChange: handlePageChange,
        }}
      />
      <div className="">
      {openFile &&
          <Modal
            title=""
            centered
            open={openFile}
            onOk={() => setOpenFile(false)}
            okButtonProps={{ style: { display: 'none', backgroundColor: '#4096ff' } }}
            onCancel={() => setOpenFile(false)}
            width={1000}
          >
            <Image src={file} alt="s" width={300} height={300} className="" />
          </Modal>

        }
      </div>
    </div>
  )
}
export default Support;