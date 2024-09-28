"use client";
import React, { useState } from "react";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { Form, Input, Modal, Select, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { AddServiceEmployee } from "@/app/[locale]/api/ForEmployee"
import { useRouter, useParams } from 'next/navigation';
import QRCode from 'qrcode'
import { ServiceStatusList } from "@/app/[locale]/utils/constant";

type FieldType = {
  phoneType: string,
  serviceType: string,
  serviceStatus: string,
  serviceCost: string,
  serviceCurrency: string,
  warantiDuration: string,
}
type Props = {
  id: string,
  setOpen: any,
  locale : LocaleProps |string
}
 
function CustomerDetailsEmpolyee({ id, setOpen,locale }: Props) {
  const [openPrint, setOpenPrint] = useState(false);  
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { push } = useRouter()
  const [img, setImg] = useState("")

  const onFinish = ({ serviceCost, phoneType, serviceType, serviceStatus, warantiDuration }: FieldType) => {
    setIsLoading(true)
    const formData = new FormData();
    formData.append('userId', id);
    formData.append('serviceCost', serviceCost);
    formData.append('phoneType', phoneType);
    formData.append('serviceType', serviceType);
    formData.append('serviceStatus', serviceStatus);
    formData.append('warantiDuration', warantiDuration);
    formData.append('serviceCurrency', "tr");
  
    AddServiceEmployee(formData)
      .then((res) => {
        if (res.status) {
          form.resetFields();
          setOpenPrint(true)
          notification.success({
            message: "تم الإضافة  بنجاح"
          });
          // router.back();


        }
      })
      .catch((err) => {
        notification.error({
          message: err.response.data.message
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePrint = () => {
    QRCode.toDataURL(`https://mobilestore-vwav.onrender.com/app/user-profile/${id}`)
      .then(url => {
        setImg(url)
        setOpenPrint(false)
      })
      .catch(err => {
        console.error(err)
      })
  }
  return (
    <div>
      {isLoading && <Loader />}
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
          name="phoneType"
          label={<span className="text-sm  md:text-base">نوع الهاتف</span>}
          rules={[{ required: true, message: "الرجاء إدخال نوع الهاتف" }]}
        >
          <Input className="!rounded-[8px] !py-3" />
        </Form.Item>

        <Form.Item<FieldType>
          name="serviceType"
          label={<span className="text-sm  md:text-base"> نوع الصيانة</span>}
          rules={[{ required: true, message: "الرجاء إدخال نوع الصيانة" }]}
        >
          <Input className="!rounded-[8px] !py-3" />
        </Form.Item>

        <Form.Item<FieldType>
          name="serviceStatus"
          label={<span className="text-sm  md:text-base"> حالة الصيانة</span>}
          rules={[{ required: true, message: "الرجاء إدخال حالة الصيانة" }]}
        >
          <select
            style={{ width: "100%" }}
            className="w-full border-2 border-gray-200 rounded-lg h-12"
          >
            {ServiceStatusList.map((item) => (
              <option value={item.value} key={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </Form.Item>

        <Form.Item<FieldType>
          name="serviceCost"
          label={<span className="text-sm  md:text-base">التكلفة</span>}
        >
          <Input className="!rounded-[8px] !py-3" />
        </Form.Item>

        <Form.Item<FieldType>
          name="warantiDuration"
          label={<span className="text-sm  md:text-base"> مدة الكفالة</span>}
        >
          <Input className="!rounded-[8px] !py-3" />
        </Form.Item>
        <div className=" col-span-2">
          <button
            type="submit" className="rounded-full w-28 py-2 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
          >
            إضافة
          </button>
        </div>
      </Form>

      <Modal
        title="هل تريد طباعة وصل؟ "
        centered
        open={openPrint}
        onOk={() => handlePrint()}
        okButtonProps={{ style: { backgroundColor: '#4096ff' } }}
        onCancel={() => { setOpenPrint(false); setOpen(false); push("/employee/customer");  }}
        width={300}
      >

      </Modal>
    </div>
  )
}

export default CustomerDetailsEmpolyee;