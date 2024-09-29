"use client";
import React, { useState } from "react";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import {
  ResendVerifyEmail,
  SendEmail,
  UpdateOrAddEmailAndName,
} from "@/app/[locale]/api/auth";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Modal, Form, Input, notification } from "antd";
import { IoMdCloudDone } from "react-icons/io";
import { useTranslation } from "@/app/i18n/client";
import dynamic from "next/dynamic";

const OTPPopup = dynamic(() => import("@/app/[locale]/components/global/OTPPopup/OTPPopup"))
const VerifySendEmail = dynamic(() => import("../VerifySendEmail/VerifySendEmail"))

type FieldType = {
  email: string;
};
function MyInfo({ data, customer, locale }: any) {
  const { t } = useTranslation(locale, "common");

  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [openVerifyPopup, setOpenVerifyPopup] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [slideChangePass, setSlideChangePass] = useState(false);
  const router = useRouter();
  const { infoData } = useSelector((state: any) => state.counter);

  const handleOpenEmail = () => {
    setOpenEmail(true);
  };

  const handleSendToEmail = async () => {
    SendEmail(email)
      .then((res: any) => {
        if (res.status) {
          notification.success({
            message: t("code_has_been_sent_to_email"),
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
        notification.error({
          message: err.response.data.message,
        });
      });
  };

  const handelSendVerifyCode = async () => {
    setIsLoading(true);
    ResendVerifyEmail()
      .then((res: any) => {
        console.log(res);
        if (res.status) {
          setIsLoading(false);
          notification.success({
            message: t("code_has_been_sent_successfully"),
          });
          setOpenVerifyPopup(true);
        }
      })
      .catch((err: any) => {
        console.log(err);
        setIsLoading(false);
        notification.error({
          message: err.responde.data.message,
        });
      });
  };

  const onFinishSendEmail = async ({ email }: FieldType) => {
    setIsLoading(true);
    const emaildata = {
      email: email,
    };
    UpdateOrAddEmailAndName(emaildata)
      .then((res: any) => {
        console.log(res);
        if (res.status) {
          notification.success({
            message: t("code_has_been_sent_to_email"),
          });
          setOpenVerifyPopup(true);
          setIsLoading(false);
        }
      })
      .catch((err: any) => {
        console.log(err);
        setIsLoading(false);
        notification.error({
          message: err.response.data.message,
        });
      });
  };
  return (
    <div className="p-20">
      <Loader isLoading={isLoading} />
      <div className="border-2 border-gray-300 rounded-lg p-5">
        <div className="grid grid-cols-4 gap-5 items-center ">
          <div className="">
            <span className="text-lg">{t("user_name:")}</span>
            <span className="text-lg">
              {" "}
              {!customer
                ? infoData.data?.createdBy?.userName
                : data?.userName}{" "}
            </span>
          </div>
          <div className="">
            <span className="text-lg">{t("phone_number:")}</span>
            <span className="text-lg">
              {" "}
              {!customer
                ? infoData.data?.createdBy?.phoneNumber
                : data?.phoneNumber}{" "}
            </span>
          </div>
          <div className="flex items-center ">
            <span className="text-lg w-fit">{t("email:")}</span>
            {customer ? (
              !data.email_verified ? (
                <span className="text-lg flex items-center gap-1">
                  {data?.email}
                  <span className="flex items-center gap-2">
                    {data?.email_verified && (
                      <IoMdCloudDone className="text-[#5cb85c] tet-xl" />
                    )}
                  </span>
                </span>
              ) : (
                <button
                  onClick={() => {
                    handleOpenEmail();
                  }}
                  className=" text-[#006496] cursor-pointer hover:scale-105 transition-all duration-150"
                >
                  {" "}
                  {t("please_enter_your_email")} !!
                </button>
              )
            ) : infoData.data?.createdBy?.email ? (
              <span className="text-lg flex items-center gap-1">
                {" "}
                {infoData.data?.createdBy?.email}
                <span className="flex items-center gap-2">
                  {infoData.data?.createdBy?.email_verified && (
                    <IoMdCloudDone className="text-[#5cb85c] tet-xl" />
                  )}
                </span>
              </span>
            ) : (
              <button
                onClick={() => {
                  handleOpenEmail();
                }}
                className=" text-[#006496] cursor-pointer hover:scale-105 transition-all duration-150"
              >
                {t("please_enter_your_email")} !!
              </button>
            )}
          </div>
          <div className="">
            <span className="">
              {" "}
              {!customer
                ? infoData.data?.createdBy?.email &&
                !infoData.data?.createdBy?.email_verified && (
                  <button
                    onClick={() => handelSendVerifyCode()}
                    className=" block mx-auto bg-[#006496] text-white hover:text-[#006496] hover:bg-white transition-all duration-150 cursor-pointer border-2 border-[#006496] p-2 rounded-xl "
                  >
                    {t("verify_your_account_with_one_small_step")}{" "}
                  </button>
                )
                : data?.email &&
                !data?.email_verified && (
                  <button
                    onClick={() => handelSendVerifyCode()}
                    className=" block mx-auto bg-[#006496] text-white hover:text-[#006496] hover:bg-white transition-all duration-150 cursor-pointer border-2 border-[#006496] p-2 rounded-xl "
                  >
                    {t("verify_your_account_with_one_small_step")}{" "}
                  </button>
                )}
            </span>
          </div>
        </div>
      </div>

      {/* Start Chane Password */}
      <div className="">
        <h2>
          <button
            type="button"
            className={`flex items-center justify-center p-3 my-10 rounded-lg  border-2 border-[#8c8c8c] hover:border-[#006496] font-semibold py-2 text-[#8c8c8c]  hover:text-[#036499!important] hover:text-[#036499]  hover:[&{sapn}]:text-[#8c8c8c] ${slideChangePass
              ? "!text-[#036499] [&{sapn}]:!text-[#8c8c8c] !border-[#006496]"
              : " "
              }  `}
            onClick={() => {
              setSlideChangePass(!slideChangePass);
            }}
            aria-expanded={slideChangePass}
            aria-controls="faqs-text-01"
          >
            <span className="">{t("change_password")} </span>
          </button>
        </h2>

        <div
          id="faqs-text-01"
          role="region"
          aria-labelledby="faqs-title-01"
          className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${slideChangePass
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
            } `}
        >
          <div className="overflow-hidden">
            <div className="w-1/2">
              <Form
                form={form}
                name="send-email"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
                onFinish={onFinishSendEmail}
                className=""
              >
                <Form.Item<FieldType>
                  name="email"
                  className="block"
                  label={
                    <span className="text-sm  md:text-base">
                      {t("email")}
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: t("please_enter_your_email"),
                    },
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
                    {t('send')}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      {/* End  Chane Password  */}
      <Modal
        title={t("account_creation_details")}
        centered
        open={openVerifyPopup}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={() => {
          setOpenVerifyPopup(false);
          router.push("/auth/login");
        }}
        width={500}
      >
        <OTPPopup setOpenVerifyPopup={setOpenVerifyPopup} locale={locale} />
      </Modal>

      <Modal
        centered
        open={openEmail}
        okButtonProps={{ style: { display: "hidden" } }}
        onCancel={() => {
          setOpenEmail(false);
          router.push("/auth/login");
        }}
        width={600}
      >
        <VerifySendEmail
          setOpenVerifyPopup={setOpenVerifyPopup}
          setOpenEmail={setOpenEmail}
          locale={locale}
        />
      </Modal>
    </div>
  );
}

export default MyInfo;
