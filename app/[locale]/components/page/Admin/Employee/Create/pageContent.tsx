"use client"
import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  notification,
} from "antd";
import { useForm } from 'antd/es/form/Form';
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { AddEmployees } from "@/app/[locale]/api/employees";
import { useRouter } from "next/navigation";


type FieldType = {
  userName: string;
  phoneNumber: string;
  password: string;
  role: string,

};

function AddAdmin() {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  
  const [obj, setObj] = useState({ });
  const router = useRouter();

  const onFinish = async () => {
    setIsLoading(true)
    try {
      const response = await AddEmployees(obj)    
      setIsLoading(false)
      if(response.data.message == "the user exists already"){
        notification.error({
          message: "هذا الحساب موجود بالفعل"
        })
      }else{
        notification.success({
          message: "تم إضافة الموظف بنجاح"
        })
        router.back()
      }
      console.log(response.data.message)
    } catch (err: any) {
      setIsLoading(false)
      console.log(err.response)
      notification.error({
            message: err.response.data.error.message

      })
    }

  };

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
              label={<span className="text-sm  md:text-base">إسم الموظف</span>}
              rules={[{ required: true, message: "الرجاء إدخال إسم الموظف" }]}
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
              rules={[{ required: true, message: "الرجاء إدخال كلمة السر" }]}
            >
              <Input className="!rounded-[8px] !py-3" onChange={(e) => setObj((prevState) => ({ ...prevState, password: e.target.value }))} />
            </Form.Item>



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
    </div>
  );
}

export default AddAdmin;

