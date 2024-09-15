"use client";
import React, { useState } from "react";
import { Button, Form, Input, Upload, notification, } from "antd";
import { useForm } from 'antd/es/form/Form';
import Loader from '@/app/[locale]/components/global/Loader/Loader';
import { AddStatus } from "@/app/[locale]/api/status";
import { useRouter } from 'next/navigation';

type FieldType = {
  image: any,
  _id: number,
  description: string,
  title: string
};

const ImgUpdateIcon = (
  <svg
    id="attachment_diagonal"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <rect
      id="Bounding_box"
      data-name="Bounding box"
      width="24"
      height="24"
      fill="rgba(255,255,255,0)"
    />
    <path
      id="Icon_color"
      data-name="Icon color"
      d="M10.3,18.24a6.06,6.06,0,0,1-8.548,0,6,6,0,0,1,0-8.48l8.5-8.44a4.557,4.557,0,0,1,6.416,0,4.467,4.467,0,0,1,0,6.36l-7.8,7.74A3.014,3.014,0,1,1,4.6,11.17l4.945-4.9a.5.5,0,0,1,.711,0l.541.53a.5.5,0,0,1,0,.71L5.85,12.41a1.261,1.261,0,0,0,1.782,1.77l7.8-7.73a2.738,2.738,0,0,0,0-3.89,2.784,2.784,0,0,0-3.924,0L2.987,11a4.247,4.247,0,0,0,0,6,4.327,4.327,0,0,0,6.056,0L14.7,11.39a.511.511,0,0,1,.721,0l.53.53a.48.48,0,0,1,0,.7Z"
      transform="translate(3 2)"
      fill="#a0a0a0"
    />
  </svg>
);
function CreateStatus() {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
   
  const onFinish = async ({ image, title, description, }: FieldType) => {
    
    setIsLoading(true)
    try {
      const formData = new FormData();      
        formData.append('image', image[0].originFileObj!);
        formData.append('title', title);
        formData.append('description', description);
      const response = await AddStatus(formData)
      setIsLoading(false)
      notification.success({
        message: "تمت إضافة الحالة بنجاح"
      })
      form.resetFields();
      
    } catch (err: any) {
      setIsLoading(false)
      console.log(err)
      // notification.error({
      //   message: err.response.data.message
      // })
    }
  }
  return (
    <div>
      {isLoading && <Loader />}
      <Form
        form={form}
        name="user-create"
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        className=""
      >
        {/* Start Images */}
        <Form.Item<FieldType>
          name="image"
          label={
            <span className="text-sm  md:text-base">الصورة</span>
          }
          rules={[{ required: false, message: "الرجاء إدخال الصورة" }]}
          valuePropName="fileList"
          getValueFromEvent={(e: any) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
        >
          <Upload
            maxCount={1}
            listType="picture"
            className="w-full "
          >
            <Button
              className="w-full h-12 justify-between text-sm md:text-xl"
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f6f6f6",
              }}
            >
              <p> إرفاق الصورة 170px * 170px </p>
              {ImgUpdateIcon}
            </Button>
          </Upload>
        </Form.Item>
        {/* end Images */}
        <Form.Item<FieldType>
          name="title"
          label={<span className="text-sm  md:text-base">عنوان الحالة</span>}
          rules={[{ required: false, message: "الرجاء إدخال عنوان الحالة" }]}
        >
          <Input className="!rounded-[8px] !py-3"  />
        </Form.Item>

        <Form.Item<FieldType>
          name="description"
          label={<span className="text-sm  md:text-base">وصف الحالة</span>}
          rules={[{ required: false, message: "الرجاء إدخال وصف الحالة" }]}
        >
          <Input className="!rounded-[8px] !py-3" />
        </Form.Item>

        <div className=" col-span-2">
          <button
            type="submit" className="rounded-full w-28 py-2 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
          >
            إضافة
          </button>
        </div>
      </Form>
    </div>
  )
}

export default CreateStatus