"use client";
import React, { useState } from 'react'
import { Card, Form, Input, notification } from 'antd'
import { useForm } from 'antd/es/form/Form';
import { useRouter } from "next/navigation";
import { ConfirmOrder } from "@/app/[locale]/api/order";
import Loader from "@/app/[locale]/components/global/Loader/Loader";

type FieldType = {
  userName: string,
  phoneNumber: string,
  address: string,
  note?: string,
};
function ConfirmOrderCom({ data }: any) {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (data: any) => {
    setIsLoading(true)

    try {
      const res = await ConfirmOrder(data)
      setIsLoading(false)
      console.log(res)
      notification.success({
        message: "تم تأكيد الطلب"
      })
      router.back()
    } catch (err: any) {
      console.log(err)
      setIsLoading(false)
      notification.error({
        message: err.response.data.message

      })
    }

  };

  return (
    <div>
      {isLoading && <Loader />}
      <div className="my-7">
        <Form
          form={form}
          name="user-create"
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
          onFinish={onFinish}
          className=""
        >
          <Form.Item<FieldType>
            name="note"
            label={<span className="text-sm  md:text-base">ملاحظات إضافية</span>}
            rules={[{ required: false }]}
          >
            <Input.TextArea className="!rounded-[8px] !py-3"  />
          </Form.Item>
          <div className=" ">
            <button
              type="submit" className="rounded-full p-2  flex items-center justify-center text-base lg:text-lg text-white border-2 border-[#006496] bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
            >
              إرسال الطلبية
            </button>
          </div>
        </Form>
      </div>



    </div>
  )
}

export default ConfirmOrderCom;