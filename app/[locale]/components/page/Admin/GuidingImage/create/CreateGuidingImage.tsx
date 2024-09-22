"use client";
import React, { useState } from "react";
import { Button, Form, Input, Upload, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { AddStatus } from "@/app/[locale]/api/status";
import { useRouter } from "next/navigation";
import Image from "next/image";
type FieldType = {
  image: any;
  _id: number;
  url: string;
};

function CreateGuidingImage() {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async ({ image, url }: FieldType) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image[0].originFileObj!);
      formData.append("url", url);
      const response = await AddStatus(formData);
      setIsLoading(false);
      notification.success({
        message: "تمت إضافة الصورة التوجيهة بنجاح",
      });
      form.resetFields();
    } catch (err: any) {
      setIsLoading(false);
      console.log(err);
      notification.error({
        message: err.response.data.message,
      });
    }
  };
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
          label={<span className="text-sm  md:text-base">الصورة</span>}
          rules={[{ required: false, message: "الرجاء إدخال الصورة" }]}
          valuePropName="fileList"
          getValueFromEvent={(e: any) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
        >
          <Upload maxCount={1} listType="picture" className="w-full ">
            <Button
              className="w-full h-12 justify-between text-sm md:text-xl"
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f6f6f6",
              }}
            >
              <p> إرفاق الصورة 700 * 330 </p>
              <Image
                src="/assete/ImgUpdateIcon.svg"
                alt="ImgUpdateIcon"
                width={24}
                height={24}
                className=""
              />
            </Button>
          </Upload>
        </Form.Item>
        {/* end Images */}
        <Form.Item<FieldType>
          name="url"
          label={
            <span className="text-sm  md:text-base">رابط الصورة التوجيهة</span>
          }
          rules={[
            { required: false, message: "الرجاء إدخال رابط الصورة التوجيهة" },
          ]}
        >
          <Input className="!rounded-[8px] !py-3" />
        </Form.Item>

        <div className=" col-span-2">
          <button
            type="submit"
            className="rounded-full w-28 py-2 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
          >
            إضافة
          </button>
        </div>
      </Form>
    </div>
  );
}

export default CreateGuidingImage;
