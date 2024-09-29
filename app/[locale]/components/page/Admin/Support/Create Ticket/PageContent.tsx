"use client"
import React, { useState } from "react";
import { Button, Form, Input, Upload, notification } from "antd";
import { useForm } from 'antd/es/form/Form'; 
import { SendNewTicket } from "@/app/[locale]/api/ticket";
import { useRouter } from "next/navigation";
import Loader from "@/app/[locale]/components/global/Loader/Loader"
import Image from "next/image";
import { useTranslation } from "@/app/i18n/client";


type FieldType = {

    subject: string,
    file: any,
    description: string
};


function CreateTicket({ locale }: any) {
    const { t } = useTranslation(locale, "common");
    const [form] = useForm();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async ({ subject, file, description }: FieldType) => {
        setIsLoading(true)
        const formData = new FormData();

        formData.append("subject", subject);
        for (let i = 0; i < file.length; i++) {
            formData.append('file', file[i].originFileObj!);
        }
        formData.append('description', description);

        try {
            const res = await SendNewTicket(formData);
            notification.success({
                message: t("sended_message_successfully")
            })
            setIsLoading(false)
            router.back()

        }
        catch (err: any) {
            console.log(err.response)
            setIsLoading(false)
            notification.error({
                message: err.response.data.message
            })
        }

    };
    return (
        <div className="">
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

                {/* بدء الاسم */}
                <Form.Item<FieldType>
                    name="subject"
                    label={<span className="text-sm md:text-base">{t("title")}</span>}
                    rules={[{ required: true, message: t("please_enter_title") }]}
                >
                    <Input className="!rounded-[8px] !py-3" />
                </Form.Item>
                {/* نهاية الاسم */}

                {/* بدء الاسم */}
                <Form.Item<FieldType>
                    name="description"
                    label={<span className="text-sm md:text-base">{t("description")}</span>}
                    rules={[{ required: true, message: t("please_enter_description") }]}
                >
                    <Input.TextArea className="!rounded-[8px] !py-3" />
                </Form.Item>
                {/* نهاية الاسم */}
                <Form.Item<FieldType>
                    name="file"
                    label={
                        <span className="text-sm md:text-base">{t("image_or_file_of_problem")}ة</span>
                    }
                    rules={[{ required: true, message: t("please_enter_file_or_image") }]}
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
                        beforeUpload={() => false}
                        className="w-full"
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
                            <p> {t("attach_photo_size")} 350px * 350px </p>

                            <Image src="/assets/ImgUpdateIcon.svg" alt="ImgUpdateIcon" width={24} height={24} className="" />
                        </Button>
                    </Upload>
                </Form.Item>
                {/* نهاية الصور */}

                <button
                    type="submit"
                    className=" col-span-2 rounded-full w-fit mt-5 px-5  py-2 text-center text-base lg:text-xl text-white border-2 border-[#006496] bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
                >
                    {t("send")}
                </button>
            </Form>

        </div>
    )
}

export default CreateTicket