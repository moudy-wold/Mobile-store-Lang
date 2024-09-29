"use client";
import React, { useState } from "react";
import { Button, Form, Input, Upload, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import Loader from "@/app/[locale]/components/global/Loader/Loader"; 
import Image from "next/image";
import { AddGuidingImage } from "@/app/[locale]/api/guidingImage";
import { useTranslation } from "@/app/i18n/client";
type FieldType = {
  image: any;
  _id: number;
  url: string;
};

function CreateGuidingImage({locale} : LocaleProps) {
  const { t } = useTranslation(locale, "common");

  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async ({ image, url }: FieldType) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", image[0].originFileObj!);
    formData.append("url", url);
    try {
      const response = await AddGuidingImage(formData);
      setIsLoading(false);
      notification.success({
        message: t("add_guiding_image_successfully"),
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
          label={<span className="text-sm  md:text-base">{t("image")}</span>}
          rules={[{ required: false, message: t("please_enter_image") }]}
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
              <p> {t("attach_photo_size")} 700 * 330 </p>
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
            <span className="text-sm  md:text-base">  {t("guiding_image_link")}</span>
          }
          rules={[
            { required: false, message: t("please_enter_guiding_image_link") },
          ]}
        >
          <Input className="!rounded-[8px] !py-3" />
        </Form.Item>

        <div className=" col-span-2">
          <button
            type="submit"
            className="rounded-full w-28 py-2 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
          >
            {t("add")}
          </button>
        </div>
      </Form>
    </div>
  );
}

export default CreateGuidingImage;
