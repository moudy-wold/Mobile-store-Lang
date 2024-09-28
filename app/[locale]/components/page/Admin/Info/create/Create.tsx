"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { Button, Form, Input, Upload, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { CreateInfos } from "@/app/[locale]/api/info";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { SocialMedya } from "@/app/[locale]/utils/constant";
import { useSelector } from "react-redux";
import { useTranslation } from "@/app/i18n/client";
import Image from "next/image";

type FieldType = {
  name: string;
  logo: any;
  description: string;
  social: string;
};

function CreateInfo({ locale }: LocaleProps) {
  const { t } = useTranslation(locale, "common");

  const [form] = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [socialArr, setSocialArr] = useState<any>([]);
  const { infoData } = useSelector((state: any) => state.counter);

  useEffect(() => {
    if (infoData?.data) {
      form.setFieldValue("name", infoData?.data?.name);
      form.setFieldValue("description", infoData?.data?.description);
      form.setFieldValue("logo", [
        {
          uid: "-2",
          name: infoData?.data?.logo,
          status: "done",
          url: infoData?.data?.logo,
        },
      ]);

      const socialData = JSON.parse(infoData?.data?.social);
      setSocialArr(socialData);
    }
  }, [infoData?.data]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedItem = SocialMedya.find(
      (item) => item.name === selectedValue
    );

    if (selectedItem && socialArr != null) {
      const isAlreadyAdded = socialArr.some(
        (item: any) => item.name === selectedItem.name
      );
      if (!isAlreadyAdded) {
        setSocialArr([...socialArr, selectedItem]);
      }
    }
  };

  const handleLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newSocialArr = [...socialArr];
    newSocialArr[index] = { ...newSocialArr[index], url: e.target.value };
    setSocialArr(newSocialArr);
  };

  const handleDelete = (index: number) => {
    const updatedSocialArr = [...socialArr];
    updatedSocialArr.splice(index, 1);
    setSocialArr(updatedSocialArr);
  };

  const onFinish = async ({ name, logo, description }: FieldType) => {
    // setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("logo", logo[0].originFileObj);
    formData.append("description", description);
    formData.append("social", JSON.stringify(socialArr));

    CreateInfos(formData)
      .then((res) => {
        notification.success({
          message: "تم إضافة المعلومات بنجاح",
        });
        setIsLoading(false);
        router.back();
      })
      .catch((error: any) => {
        setIsLoading(false);
        notification.error({
          message: "خطأ",
          description: error.response.data.message,
        });
      });
  };

  return (
    <div>
      {isLoading && <Loader />}

      <Form
        form={form}
        name="product-create"
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        className="lg:grid lg:grid-cols-2 gap-4"
      >
        <Form.Item<FieldType>
          name="name"
          label={
            <span className="text-sm md:text-base">{t("market_name")}</span>
          }
          rules={[{ required: true, message: t("please_enter_market_name") }]}
        >
          <Input className="!rounded-[8px] !py-3" />
        </Form.Item>

        <Form.Item<FieldType>
          name="logo"
          label={<span className="text-sm md:text-base">{t("logo")}</span>}
          rules={[{ required: true, message: t("please_enter_logo") }]}
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
            className="w-full"
            beforeUpload={() => false}
            maxCount={1}
          >
            <Button
              className="w-full h-12 justify-between text-sm md:text-xl"
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f6f6f6",
              }}
            >
              <p>{t("attach_logo")} 150px * 150px</p>
              <Image
                src="/assets/ImgUpdateIcon.svg"
                alt="ImgUpdateIcon"
                width={24}
                height={24}
                className=""
              />
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item<FieldType>
          name="description"
          label={<span className="text-sm md:text-base">{t("details")}</span>}
          rules={[{ required: true, message: t("please_enter_details") }]}
        >
          <Input.TextArea className="!rounded-[8px] !py-3" />
        </Form.Item>

        <Form.Item<FieldType>
          name="social"
          label={
            <span className="text-sm md:text-base">
              {t("sosyal_medya_links")}
            </span>
          }
        >
          <select
            style={{ width: "100%" }}
            className="w-full border-2 border-gray-200 rounded-lg h-12"
            onChange={handleSelectChange}
          >
            {SocialMedya.map((item) => (
              <option value={item.name} key={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </Form.Item>

        <div className="lg:col-span-2 lg:grid grid-cols-2 gap-2">
          {socialArr?.map((item: any, index: number) => (
            <div key={index}>
              <div
                key={item.name}
                className="grid grid-cols-3 item-center border-[1px] border-gray-300 rounded-xl p-3 my-2"
              >
                <span>{item.name}</span>
                <span className="flex items-center justify-end">
                  {item.icon}
                </span>
                <span
                  className="cursor-pointer hover:text-red-800 flex items-center justify-end"
                  onClick={() => handleDelete(index)}
                >
                  <MdDelete />
                </span>
              </div>
              <Form.Item label={<span className="text-sm">{t("links")}</span>}>
                <Input
                  placeholder={t("olease_enter_link")}
                  className="!rounded-[8px] !py-1"
                  value={item.url || ""}
                  onChange={(e) => handleLinkChange(e, index)}
                />
              </Form.Item>
            </div>
          ))}
        </div>

        <div className="col-span-2">
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

export default CreateInfo;
