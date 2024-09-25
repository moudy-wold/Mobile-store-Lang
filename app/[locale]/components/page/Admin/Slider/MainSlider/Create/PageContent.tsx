"use client";
import React, { useState } from "react";
import { Card, Form, Input, Upload, Button, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { AddSlider } from "@/app/[locale]/api/slider";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import {useRouter} from "next/navigation"
import { useTranslation } from "@/app/i18n/client";
import Image from "next/image";

type FieldType = {
  title: string;
  type: string;
  image: any;
};
 

function AddMainSlider({locale}:LocaleProps) {
  const { t, i18n } = useTranslation(locale, "common");
 
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [form] = useForm();
  const onFinish = ({ title, type, image }: FieldType) => {
    setIsLoading(true)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", "main");    
    formData.append('image', image[0].originFileObj!);
    AddSlider(formData)
      .then((res) => {
        notification.success({
          message: t("slider_added_successfully"),
        });
      })
      .catch((err) => {
        notification.error({
          message: err.response.data.message,
        });
      })
      .finally(() => {
        router.back()
        setIsLoading(false);
      });
  };

 
  return (
    <div>
      {isLoading && <Loader />}
      <div className="">
        <Card>
          <Form
            form={form}
            name="blog-create"
            initialValues={{ remember: true }}
            autoComplete="off"
            layout="vertical"
            onFinish={onFinish}
            className="lg:grid lg:grid-cols-2 gap-4"
          >
            <Form.Item<FieldType>
              name="title"
              label={
                <span className="text-sm  md:text-base">{t("slider_title")}</span>
              }
              rules={[{ required: true, message: t("please_enter_the_slider_title") }]}
            >
              <Input className="!rounded-[8px] !py-3" />
            </Form.Item>

            
            <Form.Item<FieldType>
              name="image"
              label={
                <span className="text-sm  md:text-base">{t("slider_image")}</span>
              }
              rules={[{ required: true, message: t("please_enter_image") }]}
              valuePropName="fileList"
              getValueFromEvent={(e: any) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e?.fileList;
              }}
            >
              <Upload
                listType="picture"
                maxCount={1}
                className="w-full "
                // customRequest={customUpload}
              >
                <Button
                  className="w-full h-12 justify-between text-sm md:text-xl"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f6f6f6",
                  }}
                >
                  <p> {t("attach_photo_size")} 1100 px * 200px </p>
                  <Image src={"/assets/ImgUpdateIcon.svg"} alt="svg" width={24} height={24} className="" />
                  
                </Button>
              </Upload>
            </Form.Item>
            <div className=" col-span-2">
              <button
                type="submit"
                className="rounded-full w-20 py-1 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
              >
                       {t("add")}

              </button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default AddMainSlider;
