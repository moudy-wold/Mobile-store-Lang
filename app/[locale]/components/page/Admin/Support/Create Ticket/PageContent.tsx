"use client"
import React, { useState } from "react";
import { Button, Form, Input, Upload, notification } from "antd";
import { useForm } from 'antd/es/form/Form';
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
import { SendNewTicket } from "@/app/[locale]/api/ticket";
import { useRouter } from "next/navigation";
import Loader from "@/app/[locale]/components/global/Loader/Loader"

type FieldType = {

    subject: string,
    file: any,
    description: string
};
const ImgUpdateIcon = (
    <svg
        id="attachment_diagonal"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
    >
        <rect
            id="Bounding_box"
            data-name="Bounding box"
            width="24"
            height="24"
            fill="rgba(255,255,255,0)"
        />
        <path
            id="Icon_color"
            data-name="Icon color"
            d="M10.3,18.24a6.06,6.06,0,0,1-8.548,0,6,6,0,0,1,0-8.48l8.5-8.44a4.557,4.557,0,0,1,6.416,0,4.467,4.467,0,0,1,0,6.36l-7.8,7.74A3.014,3.014,0,1,1,4.6,11.17l4.945-4.9a.5.5,0,0,1,.711,0l.541.53a.5.5,0,0,1,0,.71L5.85,12.41a1.261,1.261,0,0,0,1.782,1.77l7.8-7.73a2.738,2.738,0,0,0,0-3.89,2.784,2.784,0,0,0-3.924,0L2.987,11a4.247,4.247,0,0,0,0,6,4.327,4.327,0,0,0,6.056,0L14.7,11.39a.511.511,0,0,1,.721,0l.53.53a.48.48,0,0,1,0,.7Z"
            transform="translate(3 2)"
            fill="#a0a0a0"
        />
    </svg>
);

function CreateTicket() {
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
            console.log(res)
            notification.success({
                message: "تم إرسال الرسالة بنجاح"
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
                    label={<span className="text-sm md:text-base">العنوان</span>}
                    rules={[{ required: true, message: "الرجاء إدخال العنوان" }]}
                >
                    <Input className="!rounded-[8px] !py-3" />
                </Form.Item>
                {/* نهاية الاسم */}

                {/* بدء الاسم */}
                <Form.Item<FieldType>
                    name="description"
                    label={<span className="text-sm md:text-base">الوصف</span>}
                    rules={[{ required: true, message: "الرجاء إدخال الوصف" }]}
                >
                    <Input.TextArea className="!rounded-[8px] !py-3" />
                </Form.Item>
                {/* نهاية الاسم */}
                <Form.Item<FieldType>
                    name="file"
                    label={
                        <span className="text-sm md:text-base">صورة أو ملف للمشكلة</span>
                    }
                    rules={[{ required: true, message: "الرجاء إدخال ملف أو صورة للمشكلة" }]}
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
                            <p> إرفاق صورة المنتج 350px * 350px </p>
                            {ImgUpdateIcon}
                        </Button>
                    </Upload>
                </Form.Item>
                {/* نهاية الصور */}

                <button
                    type="submit"
                    className=" col-span-2 rounded-full w-fit mt-5 px-5  py-2 text-center text-base lg:text-xl text-white border-2 border-[#006496] bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
                >
                    إرسال
                </button>
            </Form>

        </div>
    )
}

export default CreateTicket