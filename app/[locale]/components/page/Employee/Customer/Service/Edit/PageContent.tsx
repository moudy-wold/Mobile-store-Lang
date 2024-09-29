"use client";
import React, { useState, useEffect } from "react";
import { Card, Form, Input,notification } from "antd";
import { useForm } from "antd/es/form/Form";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { useRouter, useParams } from "next/navigation";
import {
  EditeServiceByIdEmployee,
  GetServiceByIdEmployee,
} from "@/app/[locale]/api/ForEmployee";
import useSwr from "swr";
import { useTranslation } from "@/app/i18n/client";
import { ServiceStatusList } from "@/app/[locale]/utils/constant";

type FieldType = {
  phoneType: string;
  serviceType: string;
  serviceStatus: string;
  serviceCost: string;
  serviceCurrency: string; //Will delete it
  warantiDuration: string;
};

function EditServiceById({ locale }: LocaleProps) {
  const { t } = useTranslation(locale, "common");

  const params = useParams();
  const id: any = params.id;
  const [form] = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [customerId, setCustomerId] = useState<any>("");
  const [obj, setObj] = useState({
    phoneType: "",
    serviceType: "",
    serviceStatus: "",
    serviceCost: "",
    serviceCurrency: "",
    warantiDuration: "",
  });

  const { data: ServieData, isLoading: EditLoading } = useSwr(
    `/api/employee/repairServices/${id}`,
    () => GetServiceByIdEmployee(id)
  );

  useEffect(() => {
    let customerIdValue: any = localStorage.getItem("customerId");
    setCustomerId(customerIdValue);

    const data = ServieData?.data;
    if (data) {
      form.setFieldValue("serviceCost", data?.data?.serviceCost);
      form.setFieldValue("phoneType", data?.data?.phoneType);
      form.setFieldValue("serviceType", data?.data?.serviceType);
      form.setFieldValue("serviceStatus", data?.data?.serviceStatus);
      form.setFieldValue("warantiDuration", data?.data?.warantiDuration);
      form.setFieldValue("serviceCurrency", data?.data?.serviceCurrency);

      obj.phoneType = data?.data?.phoneType;
      obj.serviceType = data?.data?.serviceType;
      obj.serviceStatus = data?.data?.serviceStatus;
      obj.serviceCost = data?.data?.serviceCost;
      obj.warantiDuration = data?.data?.warantiDuration;
      obj.serviceCurrency = data?.data?.serviceCurrency;
    }
  }, [ServieData]);

  const onFinish = ({
    serviceCost,
    phoneType,
    serviceType,
    serviceStatus,
    warantiDuration,
  }: FieldType) => {
    setIsLoading(true);
    // const formData = new FormData();
    // formData.append('serviceCost', serviceCost);
    // formData.append('phoneType', phoneType);
    // formData.append('serviceType', serviceType);
    // formData.append('serviceStatus', serviceStatus);
    // formData.append('warantiDuration', warantiDuration);
    // formData.append('serviceCurrency', "tr");

    EditeServiceByIdEmployee(id, customerId, obj)
      .then((res) => {
        if (res.status) {
          form.resetFields();
          notification.success({
            message: t("modified_successfully"),
          });
          setOpen(true);
        }
        router.back();
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: err.response.data.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      {(isLoading || EditLoading) && <Loader />}
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
            name="phoneType"
            label={
              <span className="text-sm  md:text-base">{t("phone_type")}</span>
            }
            rules={[{ required: true, message: t("please_enter_phone_type") }]}
          >
            <Input
              className="!rounded-[8px] !py-3"
              onChange={(e) =>
                setObj((prevState) => ({
                  ...prevState,
                  phoneType: e.target.value,
                }))
              }
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="serviceType"
            label={
              <span className="text-sm  md:text-base">{t("service_type")}</span>
            }
            rules={[
              { required: true, message: t("please_enter_service_type") },
            ]}
          >
            <Input
              className="!rounded-[8px] !py-3"
              onChange={(e) =>
                setObj((prevState) => ({
                  ...prevState,
                  serviceType: e.target.value,
                }))
              }
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="serviceStatus"
            label={
              <span className="text-sm  md:text-base">
                {t("service_status")}
              </span>
            }
          >
            <select
              style={{ width: "100%" }}
              className="w-full border-2 border-gray-200 rounded-lg h-12"
              onChange={(e) =>
                setObj((prevState) => ({
                  ...prevState,
                  serviceStatus: e.target.value,
                }))
              }
            >
              {ServiceStatusList.map((item) => (
                <option value={item.value} key={item.id}>
                  {t(item.label)}
                </option>
              ))}
            </select>
          </Form.Item>

          <Form.Item<FieldType>
            name="serviceCost"
            label={<span className="text-sm  md:text-base">{t("cost")}</span>}
            rules={[{ required: true, message: t("please_enter_cost") }]}
          >
            <Input
              className="!rounded-[8px] !py-3"
              onChange={(e) =>
                setObj((prevState) => ({
                  ...prevState,
                  serviceCost: e.target.value,
                }))
              }
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="warantiDuration"
            label={
              <span className="text-sm  md:text-base">
                {t("waranti_duration")}
              </span>
            }
          >
            <Input
              className="!rounded-[8px] !py-3"
              onChange={(e) =>
                setObj((prevState) => ({
                  ...prevState,
                  warantiDuration: e.target.value,
                }))
              }
            />
          </Form.Item>
          <div className=" col-span-2">
            <button
              type="submit"
              className="rounded-full w-20 py-1 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
            >
              {t("edit")}
            </button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default EditServiceById;
