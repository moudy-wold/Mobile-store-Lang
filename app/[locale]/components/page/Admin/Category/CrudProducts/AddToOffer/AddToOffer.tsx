"use client";
import React, { useEffect, useState } from "react";
import { Form, notification, DatePicker, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useTranslation } from "@/app/i18n/client";
import { useRouter } from "next/navigation";
import { UpdateOfferProduct } from "@/app/[locale]/api/product";
import dayjs from 'dayjs';
import Loader from "@/app/[locale]/components/global/Loader/Loader";


type FieldType = {
  discount_price: string;
  is_on_offer: boolean;
  offer_start_date: string;
  offer_expiry_date: string;
};

function AddToOffer(props: any) {
  const { t } = useTranslation(props.locale, "common");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [form] = useForm();
  const [dates, setDates] = useState<any>({ discount_price: 0, offer_start_date: "", offer_expiry_date: "" })
  const disabledDate = (current: any) => {
    return current && current < dayjs().startOf('day');
  };
  const onFinish = async () => {
    setIsLoading(true);
    props.setOpenDates(false);
    UpdateOfferProduct(props.product_id, "1", dates.discount_price, dates.offer_start_date, dates.offer_expiry_date)
      .then((res) => {
        if (res.status) {
          notification.success({
            message: t("added_product_to_offer_successfully"),
          });
        }
        setIsLoading(false);
        router.refresh();
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false);
        notification.error({
          message: err.response.data.message
        });
      });
  }
  return (
    <div>
      {isLoading && <Loader />}
      <Form
        form={form}
        name="discount-price"
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
      >
        <div className="flex items-center gap-5 mt-5 mb-1 ">
          {/* Start Discount Price */}
          <div>
            <Form.Item<FieldType>
              name="discount_price"
              label={<span className="text-sm  md:text-base">{t("discount_price")}</span>}
              rules={[{ required: props.openDates, message: t("please_enter_discount_price") }]}

            >
              <Input placeholder={t("discount_price")} className="!rounded-[8px] !py-[6px]" onChange={(e) => { setDates((prev: any) => ({ ...prev, discount_price: +e.target.value })) }} />
            </Form.Item>
          </div>
          {/* End Discount Price */}

          {/* Start Start Date */}
          <div className="w-1/2 ">
            <Form.Item<FieldType>
              name="offer_start_date"
              label={<span className="text-sm  md:text-base">{t("offer_start_date")}</span>}
              rules={[{ required: props.openDates, message: t("please_enter_start_date") }]}

            >
              <DatePicker disabledDate={disabledDate} onChange={(value, option) => { setDates((prev: any) => ({ ...prev, offer_start_date: option })) }} className={`w-full`} />
            </Form.Item>
          </div>
          {/* End Start Date */}

          {/* Start End Date */}
          <div className="w-1/2">
            <Form.Item<FieldType>
              name="offer_expiry_date"
              label={<span className="text-sm  md:text-base">{t("offer_expiry_date")}</span>}
              rules={[{ required: props.openDates, message: t("please_enter_end_date") }]}

            >
              <DatePicker disabledDate={disabledDate} onChange={(value, option) => { setDates((prev: any) => ({ ...prev, offer_expiry_date: option })) }} className={`w-full`} />
            </Form.Item>
          </div>
          {/* End End Date */}

        </div>
        <div className="flex items-center justify-end mt-4">
          <button
            type="submit"
            className=" border-[1px] border-[#006496] rounded-lg text-base w-16  py-1 flex items-center justify-center  text-[#006496] bg-white transition-all hover:bg-[#006496] hover:text-white"
          >
            {t("confirm")}
          </button>
        </div>
      </Form>
    </div>
  )
}

export default AddToOffer
