"use client"
import React, { useEffect, useState } from "react";
import { Card, Form, Input, notification } from "antd";
import { useForm } from 'antd/es/form/Form';
import { useParams,useRouter  } from "next/navigation";
import { EditEmployeeById, GetEmployeeById } from "@/app/[locale]/api/employees";
import useSwr from 'swr';
import Loader from "@/app/[locale]/components/global/Loader/Loader";
type FieldType = {
  id: string,
  userName: string;
  phoneNumber: string;
};

function EditAdmin() {
  const router = useRouter();
  const [form] = useForm();
  const params = useParams();
  const id: string | string[] = params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [obj, setObj] = useState({})
  
  const { data: AdminData, isLoading: EditLoading } = useSwr(
    `/api/employees/${id}`,
    () => GetEmployeeById(id)
  );

  useEffect(() => {
    const data = AdminData?.data;
    if (data) {
      form.setFieldValue('userName', data.data.userName);
      setObj((prevState) => ({ ...prevState, userName: data.data.userName }))
      form.setFieldValue('phoneNumber', data.data.phoneNumber);      
      setObj((prevState) => ({ ...prevState, phoneNumber: data.data.phoneNumber }))
    }
  }, [AdminData])

  const onFinish = () => {
    setIsLoading(true)
    EditEmployeeById(id, obj)
      .then((res) => {
        console.log(res)
        if (res.data.status) {
          notification.success({
            message: "تم التعديل  بنجاح"
          });
        }
      })
      .catch((err) => {
        console.log(err.response)
        notification.success({
          message: err.response.data.error.message
        })
      })
      .finally(() => {
        setIsLoading(false);
        // router.back();
      })
  }
  return (
    <div>
      {isLoading || EditLoading && <Loader /> }
      <div className="">
        <Card>
          <Form
            form={form}
            name="blog-create"
            initialValues={{ remember: true }}
            autoComplete="off"
            layout="vertical"
            onFinish={onFinish}
            className="lg:grid  lg:grid-cols-2 gap-4"
          >
            <Form.Item<FieldType>
              name="userName"
              label={<span className="text-sm  md:text-base">إسم المسؤول</span>}
              rules={[{ required: true, message: "الرجاء إدخال إسم المسؤول" }]}
            >
                <Input className="!rounded-[8px] !py-3" onChange={(e) => setObj((prevState) => ({ ...prevState, userName: e.target.value }))} />
            </Form.Item>
            <Form.Item<FieldType>
              name="phoneNumber"
              label={<span className="text-sm  md:text-base">رقم الهاتف</span>}
              rules={[{ required: true, message: "الرجاء إدخال رقم الهاتف" }]}
            >
              <Input className="!rounded-[8px] !py-3" onChange={(e) => setObj((prevState) => ({ ...prevState, phoneNumber: e.target.value }))} />
            </Form.Item>
            <div className=" col-span-2">
              <button
                type="submit" className="rounded-full w-28 py-2 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
              >
                تعديل
              </button>
            </div>
          </Form>

        </Card>
      </div>
    </div>
  );
}

export default EditAdmin;
