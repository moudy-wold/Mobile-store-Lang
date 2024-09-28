"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, notification, Switch, } from "antd";
import { useForm } from 'antd/es/form/Form';
import Loader from '@/app/[locale]/components/global/Loader/Loader';
import axios from "@/app/[locale]/api/axios";
 
import { EditCategoryById, GetCategoryById, } from "@/app/[locale]/api/category";
import useSwr from 'swr';
import { useTranslation } from "@/app/i18n/client";

type FieldType = {
  name: string;
  arabicName: string;
};
type Props = {
  id: string,
  setOpenEditeCategory: any,
}
function EditCategory({ id, setOpenEditeCategory,locale }: any) {
  const { t } = useTranslation(locale, "common");
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [obj, setObj] = useState({});
  const [name, setName] = useState("");
  const [copamre, setCompare] = useState(false);
  const { data: SectionData, isLoading: EditLoading } = useSwr(
    `/api/categories/${id}`,
    () => GetCategoryById(id)
  );


  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setObj(prevState => ({
      ...prevState,
      titles: { arabicName: value }
    }));
  };

  useEffect(() => {
    const data = SectionData?.data;
    if (data) {
      form.setFieldValue('name', data?.data?.name);
      setObj(prevState => ({
        ...prevState,
        name: data?.data?.name
      }));
      form.setFieldValue('arabicName', data?.data?.title);
      setObj(prevState => ({
        ...prevState,
        title: data?.data?.title
      }));
      setCompare(data?.data?.comparison == 1 ? true : false)
    }
  }, [SectionData, form])

  const onChange = (checked: any) => {
    setObj((prevState) => ({ ...prevState, comparison: checked ? "1" : "0" }));
  };

  const onFinish = () => {
    setIsLoading(true)
    EditCategoryById(id, obj)
      .then((res) => {
        if (res.data.status) {
          form.resetFields();
          setOpenEditeCategory(false)
          notification.success({
            message: t("modified_successfully")
          });
        }
      })
      .catch((err: any) => {
        console.log(err.response)
        notification.success({
          message: err.response.data.error.message
        })
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <div>
      {isLoading && <Loader />}
      <Form
        form={form}
        name="section-create"
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        className="lg:grid  lg:grid-cols-2 gap-4"
      >

        <Form.Item<FieldType>
          name="name"
          label={  <span className="text-sm  md:text-base">{t("section_link")}</span>}
          rules={[{ required: true, message: t("please_enter_section_link") }]}
        >
          <Input className="!rounded-[8px] !py-3" onChange={(e) => { setObj((prevState) => ({ ...prevState, name: e.target.value })); setName(e.target.value) }} />
        </Form.Item>

        <Form.Item<FieldType>
          name="arabicName"
          label={<span className="text-sm  md:text-base">{t("department_name_by")} {""} {locale}</span>}
          rules={[
            { required: true, message: t("please_enter_department_name") },
          ]}
        >
          <Input className="!rounded-[8px] !py-3" onChange={(e) => { setObj((prevState) => ({ ...prevState, title: e.target.value })); }} />
        </Form.Item>
        <div className="flex items-center">
        <p>{t("comparison_for_this_section")}</p>
          <Switch
            defaultChecked={copamre ? true : false}
            onChange={onChange}
            className="bg-gray-400"
          />
        </div>

        <div className=" col-span-2">
          <button
            type="submit" className="rounded-full w-28 py-2 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
          >
            {t("edit")}
          </button>
        </div>
      </Form>
    </div>
  )
}

export default EditCategory

