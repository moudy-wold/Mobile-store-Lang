"use client";
import React, { useState } from "react";
import { Card, Form, Input, Modal, notification, } from "antd";
import { useForm } from 'antd/es/form/Form';
import { AddCustomer } from "@/app/[locale]/api/customer";
import Loader from '@/app/[locale]/components/global/Loader/Loader';
import CustomerDetails from "./CustomerDetails";
import { useRouter } from "next/navigation"


type FieldType = {
  userName: string;
  phoneNumber: string;
  password: string;
  role: string,

};

function CreateCustomer() {

  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // const [openPrint, setOpenPrint] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [obj, setObj] = useState({ role: "customer" });
  const router = useRouter()
  const { push } = useRouter()
  // const [img, setImg] = useState("")

  const onFinish = async () => {
    

      setIsLoading(true)
      try {
        const response = await AddCustomer(obj)
        setId(response.data?.data?._id)
        setIsLoading(false)
          setOpen(true)

      } catch (err: any) {
        setIsLoading(false)
    console.log(err)
        if (err?.response?.status == 400) {
          if (err.response?.data?.role == "admin") {
            notification.error({
              message: "هذا المستحدم موجود كمسؤول "
            })
            push("/admin/customer")
          } else {
            notification.success({
              message: "هذا المستحدم موجود بالفعل "
            })
            setId(err.response?.data?._id)
            setOpen(true)
          }

        }

      }

    
  }

// const getData = async () => {
  //   const text = {
  //     name: "moudy",
      
  //     description: "qwe",
  //     social: [{ name: "1", icon: "fa", url: "https://facebook.com" },
  //     { name: "2", icon: "fa", url: "https://facebook.com" },
  //     { name: "3", icon: "fa", url: "https://facebook.com" }
  //     ]
  //   };
  
  //   try {
  //     const response = await axios.post(
  //       "https://mobilstore.aymankanawi.info/api/info",
  //       text,
  //       {
  //         headers: {
  //           "Authorization": "Bearer 15|uJUUfXdNAvJAtNaxV0gk2Xqj6WXByTbqZTJpi3PG45eededb",
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <div>
      <div className="">
        {isLoading && <Loader />}     
        <Card>
          <Form
            form={form}
            name="user-create"
            initialValues={{ remember: true }}
            autoComplete="off"
            layout="vertical"
            onFinish={onFinish}
            className="lg:grid  lg:grid-cols-2 gap-4"
          >

            <Form.Item<FieldType>
              name="userName"
              label={<span className="text-sm  md:text-base">إسم الزبون</span>}
              rules={[{ required: true, message: "الرجاء إدخال إسم الزبون" }]}
            >
              <Input className="!rounded-[8px] !py-3" onChange={(e) => setObj((prevState) => ({ ...prevState, userName: e.target.value }))} />
            </Form.Item>

            <Form.Item<FieldType>
              name="phoneNumber"
              label={<span className="text-sm  md:text-base">رقم الهاتف</span>}
              rules={[{ required: true, message: "الرجاء إدخال رقم الهاتف" }]}
            >
              <Input className="!rounded-[8px] !py-3" onChange={(e) => setObj((prevState) => ({ ...prevState, phoneNumber: e.target.value }))} />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              label={<span className="text-sm  md:text-base">كلمة السر</span>}
              rules={[
                { required: true, message: 'يرجى إدخال كلمة المرور!' },
                { min: 8, message: 'يجب أن تكون كلمة المرور مكونة من 8 أحرف على الأقل!' }
              ]}
            >
              <Input className="!rounded-[8px] !py-3" onChange={(e) => { setPassword(e.target.value); setObj((prevState) => ({ ...prevState, password: e.target.value })) }} />
            </Form.Item>
            {/* 
            <Form.Item<FieldType>
              name="role"
              label={<span className="text-sm  md:text-base"> نوع المستخدم</span>}
              rules={[{ required: true, message: "الرجاء إدخال نوع الصيانة" }]}
            >
           <Input className="!rounded-[8px] !py-3" onChange={(e)=>setObj((prevState) => ({ ...prevState, role: e.target.value }))}/>
            </Form.Item> */}

            <div className=" col-span-2">
              <button
                type="submit" className="rounded-full w-28 py-2 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
              >
                إضافة
              </button>
            </div>
          </Form>

        </Card>

      </div>
      <Modal
        title="إضافة تفاصيل الصيانة"
        centered
        open={open}
        onOk={() => setOpen(false)}
        okButtonProps={{ style: { display: 'none', backgroundColor: '#4096ff' } }}
        onCancel={() => { setOpen(false);push("/admin/customer"); }}
        width={1000}
      >
        <CustomerDetails id={id} setOpen={setOpen}/>
      </Modal>
      


    </div>
  );
}

export default CreateCustomer;
