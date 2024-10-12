"use client"
import React, { useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Form, Input, Modal, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { CancelledOrder_Talab } from "@/app/[locale]/api/talab";
import Loader from "@/app/[locale]/components/global/Loader/Loader";

type Props = {
    locale: string;
    order_id: string;
    setOpenCancellation: any;
}

type FieldType = {
    reason: string,
}

function CancellationReq(props: any) {
    const { t } = useTranslation(props.locale, "common")
    const [form] = useForm();
    const [isLoading, setIsLoading] = useState(false);


    const onFinish = async ({ reason }: FieldType) => {
        setIsLoading(true)
        console.log(props.order_id)
        try {
            const res = await CancelledOrder_Talab(props.order_id, reason);
            console.log(res)
            notification.success({
                message: t("sent_cancellation_request_successfully")
            })
            props.setOpenCancellation(false)
            setIsLoading(false)
        }
        catch (err: any) {
            console.log(err)
            setIsLoading(false)
            notification.error({
                message: err.response.data.message
            })
        }
    }

    return (
        <div className="">
            {isLoading && <Loader />}
            <Form
                form={form}
                name="cancellation-reason"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
                onFinish={onFinish}
            >

                <Form.Item<FieldType>
                    name="reason"
                    label={<span className="text-sm  md:text-base"> {t("reason")}</span>}
                    rules={[{ required: true, message: t("please_enter_reason") }]}
                >
                    <Input className="!rounded-[8px] !py-3" />
                </Form.Item>
                <div className=" col-span-2">
              <button
                type="submit"
                className="border-2 border-[#006496] rounded-full w-28 py-2 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
              >
                {t("send")}
              </button>
            </div>
            </Form>


        </div>
    )
}

export default CancellationReq;