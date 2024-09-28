"use client";
import React, { useState } from "react";
import Image from "next/image";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { Form, Input, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { SendEmail } from "@/app/[locale]/api/auth";
import { useTranslation } from "@/app/i18n/client";

type FieldType = {
  email: string;
};
function VerifySendEmail(props: any) {
  const { t } = useTranslation(props.locale, "common");
  const [isLoading, setIsLoading] = useState(false);

  const [form] = useForm();
  const onFinish = async ({ email }: FieldType) => {
    // setIsLoading(true)
    SendEmail(email)
      .then((res: any) => {
        if (res.status) {
          notification.success({
            message: t("code_has_been_sent_to_email"),
          });
          props.setOpenEmail(false);
          props.setOpenVerifyPopup(true);
        }
      })
      .catch((err: any) => {
        console.log(err);
        notification.error({
          message: err.response.data.message,
        });
      });
  };
  return (
    <div className={`absolute inset-0 top-0 z-50`}>
      {isLoading && <Loader />}
      <div className="fixed inset-0 bg-black opacity-50 z-30"></div>

      <div className="  bg-white p-10  rounded-xl z-50 relative  w-full ">
        <button
          onClick={() => {
            props.setOpenEmail(false);
          }}
          className="absolute -top-6 right-0 p-3 rounded-full"
        >
          <Image
            src={"/assets/cancel.svg"}
            alt="cancel"
            width={30}
            height={30}
          />
        </button>
        <div>
          <Form
            form={form}
            name="send-email"
            initialValues={{ remember: true }}
            autoComplete="off"
            layout="vertical"
            onFinish={onFinish}
            className=""
          >
            <Form.Item<FieldType>
              name="email"
              className="block"
              label={
                <span className="text-sm  md:text-base">{t("email")}</span>
              }
              rules={[
                { required: true, message: t("please_enter_your_email") },
              ]}
            >
              <Input
                placeholder={t("please_enter_your_email")}
                className="!rounded-[8px] !py-3  w-full block"
              />
            </Form.Item>
            <div className=" col-span-2">
              <button
                type="submit"
                className="rounded-full w-28 py-2 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
              >
                {t("send")}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default VerifySendEmail;
