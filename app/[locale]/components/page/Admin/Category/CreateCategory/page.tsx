"use client";
import React, { useState } from "react";
import { Form, Input, notification, Switch } from "antd";
import { useForm } from 'antd/es/form/Form';
import Loader from '@/app/[locale]/components/global/Loader/Loader';
import { AddCategory } from "@/app/[locale]/api/category";

type FieldType = {
    name: string;
    tilte: string;
    comparison: any;
};

function CreateCategory() {
    const [form] = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [obj, setObj] = useState({comparison:1});
    const [name, setName] = useState("");

  
    const onChange = (checked: any) => {
        setObj((prevState) => ({ ...prevState, comparison: checked ? 1 : 0 }));
    };
    const onFinish = async () => {
        if (name.includes(" ")) {
            notification.error({
                message: "حقل الرابط بجب أن لا يحتوي على مسافات"
            })
        } else {
            setIsLoading(true)
            try {
                const response = await AddCategory(obj)
                setIsLoading(false)
                notification.success({
                    message: "تمت إضافة القسم بنجاح"
                })
                form.resetFields();
            } catch (err: any) {
                setIsLoading(false)
                notification.error({
                    message: err.response.data.message
                })
            }
        }
    }

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
                className="lg:grid  lg:grid-cols-2 gap-4"
            >

                <Form.Item<FieldType>
                    name="name"
                    label={<span className="text-sm  md:text-base">رابط القسم</span>}
                    rules={[{ required: true, message: "الرجاء إدخال رابط القسم" }]}
                >
                    <Input className="!rounded-[8px] !py-3" onChange={(e) => { setObj((prevState) => ({ ...prevState, name: e.target.value })); setName(e.target.value) }} />
                </Form.Item>

                <Form.Item<FieldType>
                    name="tilte"
                    label={<span className="text-sm  md:text-base">إسم القسم بالعربي</span>}
                    rules={[{ required: true, message: "الرجاء إدخال إسم القسم بالعربي" }]}
                >
                    <Input className="!rounded-[8px] !py-3" onChange={(e) => { setObj((prevState) => ({ ...prevState, title: e.target.value }))}}/>
                </Form.Item>

                <div className="flex items-center">
                    <p>تقعيل خاصية مقارنة المنتجات في هذا القسم</p>
                    <Switch defaultChecked onChange={onChange} className="bg-gray-400" />
                </div>

                <div className=" col-span-2">
                    <button
                        type="submit" className="rounded-full w-28 py-2 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
                    >
                        إضافة
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default CreateCategory