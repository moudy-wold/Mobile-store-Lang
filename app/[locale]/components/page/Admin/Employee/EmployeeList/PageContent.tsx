"use client"
import React, { useState } from "react";
import { Space, Table, Modal, Button, notification } from "antd";
import type { ColumnsType, } from "antd/es/table";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import Link from "next/link";
import Search from "@/app/[locale]/components/global/Search/SearchUser/SearchUser"
import { DeleteEmployee } from "@/app/[locale]/api/employees";
import { useRouter } from 'next/navigation';
import Loader from '@/app/[locale]/components/global/Loader/Loader';

function PageContent({ data }: any) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");


  const hideModalAndDeleteItem = () => {
    setIsLoading(true)
    setOpenDelete(false)
    DeleteEmployee(id)
      .then((res) => {
        if (res.data.status) {
          notification.success({
            message: "تم حذف الموظف بنجاح"
          });
        }
      })
      .catch((err) => {
        notification.error({
           message: err.response.data.error.errors[0].msg

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
      title: "إسم الموظف",
      dataIndex: "userName",
      key: "userName",       
      render: (text) => <a>{text}</a>,
    },
    {
      title: "رقم الهاتف",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
    },
    {
      title: "الإجرائات",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/admin/employees/edit/${record.id}`}><CiEdit /> </Link>
          <a><RiDeleteBinLine onClick={() => { setOpenDelete(true); setId(record.id) }} /></a>
        </Space>
      ),
    },
  ];

  const tableData = data?.map((user: any) => ({
    id: user._id,
    userName: user.userName,
    phoneNumber: user.phoneNumber,
  }));
 

  return (

    <div className="">
      {isLoading && <Loader />}
      <div className="mb-5">
        <div className="flex items-center">
          <Button className="">
            <Link href="/admin/employees/create" className="flex items-center justify-beetwen">أضف موظف <CiCirclePlus className="mr-1" /></Link>
          </Button>
        </div>
        
      </div>

      <Table columns={columns} dataSource={tableData} />

      



      <div>
        <Modal
          title="حذف حساب!!!"
          open={openDelete}
          onOk={hideModalAndDeleteItem}
          onCancel={() => setOpenDelete(false)}
          okText="موافق"
          cancelText="إلغاء" okButtonProps={{ style: { backgroundColor: '#4096ff' } }}
        >
          <p>هل أنت متأكد من أنك تريد حذف حساب الموظف ؟</p>
        </Modal>
      </div>

    </div>

  )
}

export default PageContent