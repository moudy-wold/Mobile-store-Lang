"use client";
import React, { useState, useEffect } from "react";
import { Card, Form, Input, notification } from "antd";
import { GetCustomerByIdEmployees, EditCustomerByIdEmployees } from '@/app/[locale]/api/ForEmployee';
import { useForm } from 'antd/es/form/Form';
import { useRouter, useParams } from 'next/navigation';
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import useSwr from 'swr';
// type FieldType = {
//   customerName: string;
//   phoneNumber: string;
//   password: string;
//   phoneType: string;
//   serviceType: string;
//   serviceStatus:string;
//   warantiDuration:string;
// };

type FieldType = {
  id: string,
  userName: string;
  phoneNumber: string;
  phoneType: string;
  role: string;
  serviceType: string;
  serviceStatus: string;
};

function EditeCustomer() {
  const router = useRouter();
  const [form] = useForm();
  const params = useParams();
  const id: any  = params.id;
  const formData = new FormData();
  const [isLoading, setIsLoading] = useState(false);
  const [obj, setObj] = useState({});
  const { data: CustomerData, isLoading: EditLoading } = useSwr(
    `/api/employee/users/${id}`,
    () => GetCustomerByIdEmployees(id)
  );

  useEffect(() => {
    const data = CustomerData?.data?.data;
  
    if (data) {
      form.setFieldValue('userName', data.userName);
      form.setFieldValue('phoneNumber', data.phoneNumber);
    }
  }, [CustomerData, form])

  const onFinish = () => {
    setIsLoading(true)
    EditCustomerByIdEmployees(id, obj)
      .then((res) => {        
        if (res.status) {
          form.resetFields();
          notification.success({
            message: "تم التعديل  بنجاح"
          });
          router.back();
        }
      })
      .catch((err) => {
        notification.success({
          message: err.response.data.error.errors[0].msg
        })
      })
      .finally(() => {
        setIsLoading(false);
      })
  }
  return (
    <div>
      {(isLoading || EditLoading) && <Loader />}
      <div className="">
        <Card >
          <Form
            form={form}
            name="CustomerData"
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
              <Input className="!rounded-[8px] !py-3" onChange={(e) => setObj((prev) => ({ ...prev, userName: e.target.value }))} />
            </Form.Item>
            <Form.Item<FieldType>
              name="phoneNumber"
              label={<span className="text-sm  md:text-base">رقم الهاتف</span>}
              rules={[{ required: true, message: "الرجاء إدخال رقم الهاتف" }]}
            >
              <Input className="!rounded-[8px] !py-3" onChange={(e) => setObj((prev) => ({ ...prev, phoneNumber: e.target.value }))} />
            </Form.Item>



            <div className=" col-span-2">
              <button
                type="submit" className="rounded-full w-20 py-1 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
              >
                تعديل
              </button>
            </div>
          </Form>

        </Card>
      </div>
    </div>
  );
}

export default EditeCustomer
