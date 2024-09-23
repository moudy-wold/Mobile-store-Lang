"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Upload, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import Image from "next/image";
import FetchImageAsFile from "@/app/[locale]/components/global/FetchImageAsFile/FetchImageAsFile";
import { EditGuidingImageById } from "@/app/[locale]/api/guidingImage";
type FieldType = {
  _id: number;
  image: any;
  url: string;
};

type Props = {
  id: string;
  setOpenEditeGuidingImage: any;
  data: { image: string; url: string };
};

function EditGuidingImage(props: Props) {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [getData, setGetData] = useState(true);
  // const { data: StatusData, isLoading: EditLoading } = useSwr(
  //   `/api/status/${props.id}`,
  //   () => GetStatusById(props.id)
  // );

  useEffect(() => {
    const data = props?.data;
    if (getData == true) {
      if (data) {
        console.log(data);
        form.setFieldValue("url", data?.url);
        form.setFieldValue("image", [
          {
            uid: "-2",
            name: data?.image,
            status: "done",
            url: data?.image,
          },
        ]);
        setGetData(false);
      }
    }
  }, []);

  const onFinish = async ({ image, url }: FieldType) => {
    setIsLoading(true);
    const formData = new FormData();

    // formData.append("image", image[0].originFileObj!);

    //  start image fixed  ****************************
    console.log(image[0]);
    const file = image.url
      ? await FetchImageAsFile(
          image.url,
          image.url.split("/").pop() || "image.jpg"
        )
      : image[0].originFileObj;

    // Append the processed image to formData
    formData.append("image", file); // 'image' instead of 'images' since it's a single file

    // end my code *************

    formData.append("url", url);

    try {
      const response = await EditGuidingImageById(props.id, formData);
      setIsLoading(false);
      notification.success({
        message: "تمت إضافةالصورة التوجيهة بنجاح",
      });
      form.resetFields();
      props.setOpenEditeGuidingImage(false);
    } catch (err: any) {
      setIsLoading(false);
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
            تعديل
          </button>
        </div>
      </Form>
    </div>
  );
}

export default EditGuidingImage;
