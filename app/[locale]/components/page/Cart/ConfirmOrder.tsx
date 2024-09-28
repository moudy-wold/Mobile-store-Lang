"use client";
import React, { useState } from "react";
import { Card, Form, Input, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/navigation";
import { ConfirmOrder } from "@/app/[locale]/api/order";
import { useTranslation } from "@/app/i18n/client";
type FieldType = {
  userName: string;
  phoneNumber: string;
  address: string;
  note?: string;
};
function ConfirmOrderCom({ data, locale }: any) {
  const { t } = useTranslation(locale, "common");
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [obj, setObj] = useState({});
  const router = useRouter();

  const onFinish = async (data: any) => {
    // setIsLoading(true)

    try {
      const res = await ConfirmOrder(data);
      setIsLoading(false);
      console.log(res);
      notification.success({
        message: t("order_has_been_confirmed"),
      });
      router.back();
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
      notification.error({
        message: err.response.data.message,
      });
    }
  };

  return (
    <div>
      <Card>
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
            name="userName"
            label={<span className="text-sm  md:text-base">{t("name")} </span>}
            rules={[{ required: true, message: t("please_enter_name") }]}
          >
            <Input
              className="!rounded-[8px] !py-3"
              onChange={(e) =>
                setObj((prevState) => ({
                  ...prevState,
                  userName: e.target.value,
                }))
              }
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="phoneNumber"
            label={
              <span className="text-sm  md:text-base">{t("phone_number")}</span>
            }
            rules={[{ required: true, message: t("please_enter_phoneNumber") }]}
          >
            <Input
              className="!rounded-[8px] !py-3"
              onChange={(e) =>
                setObj((prevState) => ({
                  ...prevState,
                  phoneNumber: e.target.value,
                }))
              }
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="address"
            label={
              <span className="text-sm  md:text-base">{t("address")}</span>
            }
            rules={[{ required: true, message: t("please_enter_title") }]}
          >
            <Input.TextArea
              className="!rounded-[8px] !py-3"
              onChange={(e) =>
                setObj((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="note"
            label={
              <span className="text-sm  md:text-base">
                {t("additional_notes")}
              </span>
            }
            rules={[{ required: false }]}
          >
            <Input.TextArea
              className="!rounded-[8px] !py-3"
              onChange={(e) =>
                setObj((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
            />
          </Form.Item>

          <div className=" col-span-2">
            <button
              type="submit"
              className="rounded-full p-2  flex items-center justify-center text-base lg:text-xl text-white border-2 border-[#006496] bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
            >
              {t("send")}
            </button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default ConfirmOrderCom;
