"use client";
import React, { useState } from "react";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { Card, Form, Input, Modal, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { AddCustomerEmployees } from "@/app/[locale]/api/ForEmployee";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import dynamic from "next/dynamic";

const CustomerDetails = dynamic(()=> import("@/app/[locale]/components/page/Employee/Customer/CreateCustomer/CustomerDetails"))

type FieldType = {
  userName: string;
  phoneNumber: string;
  password: string;
  role: string;
};

function CreateCustomer({ locale }: LocaleProps) {
  const { t } = useTranslation(locale, "common");

  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // const [openPrint, setOpenPrint] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [obj, setObj] = useState({ role: "customer" });
  const router = useRouter();
  const { push } = useRouter();
  // const [img, setImg] = useState("")

  const onFinish = async () => {
    if (password.length < 8) {
      notification.error({
        message: t("password_must_least_8_characters_long"),
      });
    } else {
      setIsLoading(true);
      try {
        const response = await AddCustomerEmployees(obj);
        setId(response.data?.data?._id);
        setIsLoading(false);
        setOpen(true);
      } catch (err: any) {
        setIsLoading(false);
        console.log(err);
        if (err?.response?.status == 400) {
          if (
            err.response?.data?.role == "admin" ||
            err.response?.data?.role == "empolyee"
          ) {
            notification.error({
              message: t("user_is_logged_as_administrator "),
            });
            push("/empolyee/customer");
          } else {
            notification.success({
              message: t("user_already_exists "),
            });
            setId(err.response?.data?._id);
            setOpen(true);
          }
        }
      }
    }
  };

  return (
    <div>
      <div className="">
        {isLoading && <Loader />}
        <Card>
          <Form
            form={form}
            name="user-create"
            initialValues={{ remember: true }}
            autoComplete="off"
            layout="vertical"
            onFinish={onFinish}
            className="lg:grid  lg:grid-cols-2 gap-4"
          >
            <Form.Item<FieldType>
              name="userName"
              label={
                <span className="text-sm  md:text-base">
                  {t("customer_name")}
                </span>
              }
              rules={[
                { required: true, message: t("please_enter_customer_name") },
              ]}
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
                <span className="text-sm  md:text-base">
                  {t("phoneNumber")}
                </span>
              }
              rules={[
                { required: true, message: t("please_enter_phoneNumber") },
              ]}
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
              name="password"
              label={
                <span className="text-sm  md:text-base">{t("password")}</span>
              }
              rules={[
                { required: true, message: t("please_enter_password") },
                { min: 8, message: t("password_must_least_8_characters_long") },
              ]}
            >
              <Input
                className="!rounded-[8px] !py-3"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setObj((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }));
                }}
              />
            </Form.Item>
            {/* 
            <Form.Item<FieldType>
              name="role"
              label={<span className="text-sm  md:text-base"> نوع المستخدم</span>}
              rules={[{ required: true, message: "الرجاء إدخال نوع الصيانة" }]}
            >
           <Input className="!rounded-[8px] !py-3" onChange={(e)=>setObj((prevState) => ({ ...prevState, role: e.target.value }))}/>
            </Form.Item> */}

            <div className=" col-span-2">
              <button
                type="submit"
                className="rounded-full w-28 py-2 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
              >
                {t("add")}
              </button>
            </div>
          </Form>
        </Card>
      </div>
      <Modal
        title={t("add_service_details")}
        centered
        open={open}
        onOk={() => setOpen(false)}
        okButtonProps={{
          style: { display: "none", backgroundColor: "#4096ff" },
        }}
        onCancel={() => {
          setOpen(false);
          push("/employee/customer");
        }}
        width={1000}
      >
        <CustomerDetails locale={locale} id={id} setOpen={setOpen} />
      </Modal>
    </div>
  );
}

export default CreateCustomer;
