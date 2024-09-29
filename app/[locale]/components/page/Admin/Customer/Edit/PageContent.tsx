"use client";
import React, { useState, useEffect } from "react";
import { Card, Form, Input, notification } from "antd";
import { GetCustomerByIdEmployees, EditCustomerByIdEmployees } from '@/app/[locale]/api/ForEmployee';
import { useForm } from 'antd/es/form/Form';
import { useRouter, useParams } from 'next/navigation';
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import useSwr from 'swr';
import { useTranslation } from "@/app/i18n/client";


type FieldType = {
  id: string,
  userName: string;
  phoneNumber: string;
  phoneType: string;
  role: string;
  serviceType: string;
  serviceStatus: string;
};

function EditeCustomer({locale} : LocaleProps) {
  const { t } = useTranslation(locale,"common"); 
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
            message: t("modified_successfully")
          });
          router.back();
        }
      })
      .catch((err) => {
        notification.success({
          message: err.response.data.message
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
              label={<span className="text-sm  md:text-base">{t("customer_name")}</span>}
              rules={[{ required: true, message: t("please_enter_customer_name") }]}
            >
              <Input className="!rounded-[8px] !py-3" onChange={(e) => setObj((prev) => ({ ...prev, userName: e.target.value }))} />
            </Form.Item>
            <Form.Item<FieldType>
              name="phoneNumber"
              label={<span className="text-sm  md:text-base">{t("phoneNumber")}</span>}
              rules={[{ required: true, message: t("please_enter_phoneNumber") }]}
            >
              <Input className="!rounded-[8px] !py-3" onChange={(e) => setObj((prev) => ({ ...prev, phoneNumber: e.target.value }))} />
            </Form.Item>



            <div className=" col-span-2">
              <button
                type="submit" className="rounded-full w-20 py-1 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
              >
                {t("edit")}
              </button>
            </div>
          </Form>

        </Card>
      </div>
    </div>
  );
}

export default EditeCustomer
