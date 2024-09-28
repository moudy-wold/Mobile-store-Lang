"use client";
import React, { useState } from "react";
import { Card, Form, Input, Modal, notification, } from "antd";
import { useForm } from 'antd/es/form/Form';
import { UpdatePassword } from "@/app/[locale]/api/auth";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { useTranslation } from "@/app/i18n/client";

type FieldType = {
    password: string;
    rePassword: string;
};

function ChangePassword(props: any) {
    const { t } = useTranslation(props.locale,"common");

    const [form] = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async ({ password }: FieldType) => {
        setIsLoading(true)

        try {
            const response = await UpdatePassword(props.userId, props.phoneNumber, password)
            setIsLoading(false)
            notification.success({
                message: t("password_changed_successfully")
            })
            props.setOpenChangePassword(false)
        } catch (err: any) {
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
                name="user-create"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
                onFinish={onFinish}
                className="lg:grid  lg:grid-cols-2 gap-4"
            >

                <Form.Item<FieldType>
                    name="password"
                    label={<span className="text-sm  md:text-base">{t("password")}</span>}
                    rules={[{ required: true, message: t("please_enter_password") }]}
                >
                    <Input className="!rounded-[8px] !py-3" placeholder="كلمة المرور" />
                </Form.Item>
                <Form.Item
                    name="rePassword"
                    label={<span className="text-sm  md:text-base">{t("confirm_password")}</span>}
                    dependencies={['password']}
                    rules={[
                        { required: true, message: t('please_confirm_password') },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(t('password_does_not_match')));
                            },
                        }),
                    ]}
                >
                    <div>
                        <Input placeholder={t("confirm_password")} className="!rounded-[2px]    !py-3 placeholder:!text-[#646464]" />
                    </div>
                </Form.Item>
                <button type="submit"
                    className="rounded-full w-28 py-2 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1">
                    {t("send")}
                </button>
            </Form>
        </div>
    )
}

export default ChangePassword;