"use client";
import React, { useState, useEffect } from "react";
import { Button, Card, Form, Input, notification, Upload } from "antd";
import { GetProductById, EditProductById } from '@/app/[locale]/api/product';
import { useForm } from 'antd/es/form/Form';
import { useRouter, useParams } from 'next/navigation';
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import useSwr from 'swr';
import { MdDelete } from "react-icons/md";
import FetchImageAsFile from "@/app/[locale]/components/global/FetchImageAsFile/FetchImageAsFile";
import Image from "next/image"
import { useTranslation } from "@/app/i18n/client";

type FieldType = {
  id: string,
  images: any,
  name: string,
  quantity: string,
  price: string,
  details: {},
  brand: string,
  description: string,
};


function EditProduct({ locale }: LocaleProps) {
  const { t } = useTranslation(locale, "common");

  const [form] = useForm();
  const params = useParams();
  const id: any = params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [getData, setGetData] = useState(true);
  const [returnDetails, setReturnDetails] = useState([{}]);
  const router = useRouter();
  const [categoryId, setCategoryId] = useState<any>();
  const { data: ProductData, isLoading: EditLoading } = useSwr(
    `/api/products/${id}`,
    () => GetProductById(id)
  );
  useEffect(() => {
    setCategoryId(localStorage.getItem("categoryId"))
  }, [])

  useEffect(() => {
    const data = ProductData?.data;
    if (data) {
      if (getData) {
        data?.data?.details.map((item: any) => {
          setReturnDetails(prevDetails => [...prevDetails, { title: item.title, content: item.content }]);
        })
        returnDetails.shift();

        form.setFieldValue('name', data?.data?.name);
        form.setFieldValue(
          'images',
          data.data.images.map((image: any) => ({
            uid: String(image),
            name: image,
            status: 'done',
            url: image,
          }))
        );
        form.setFieldValue('quantity', data?.data?.quantity);
        form.setFieldValue('price', data?.data?.price);
        form.setFieldValue('brand', data?.data?.brand);
        form.setFieldValue('description', data?.data?.description);
        Object.entries(data?.data?.details).map(([key, value]) => {
          return (
            form.setFieldValue(key, value)
          )
        })
      }
      setGetData(false)
    }
  }, [ProductData])

  const onFinish = async ({ name, images, quantity, price, brand, description }: FieldType) => {
    const filteredArray = returnDetails.filter((item: any) => item.title !== "" && item.content !== "");

    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    //  start image fixed  ****************************
    const imageFiles = await Promise.all(
      images.map(async (file: any) => {
        if (file.url) {
          return await FetchImageAsFile(file.url, file.url.split('/').pop() || 'image.jpg');
        }
        return file.originFileObj; // Return the original file if there's no URL
      })
    );

    // Append processed images to formData
    imageFiles.forEach((file: any) => {
      formData.append('images[]', file);
    });

    formData.append('_method', 'put');

    // end my code *************
    formData.append('quantity', quantity);
    formData.append('brand', brand);
    formData.append('price', price);
    formData.append('details', JSON.stringify(filteredArray));
    formData.append('categoryId', categoryId);
    EditProductById(id, formData)
      .then((res) => {
        if (res.data.status) {
          form.resetFields();
          setIsLoading(false)
          notification.success({
            message: t("modified_successfully")
          });
          router.back();
        }
      })
      .catch((err) => {
        console.log(err.response.data)
        notification.error({
          message: err.response.data.message
        })
        setIsLoading(false);
      })


  }

  const addDetailField = () => {
    setReturnDetails([...returnDetails, { title: "", content: "" }]);
  };

  const handleDetailChange = (index: number, field: string, value: string) => {
    const newDetails: any = [...returnDetails];
    newDetails[index][field] = value;
    setReturnDetails(newDetails);
  };


  const handleDeleteItemFromDetails = (detail: any) => {
    let newArr = returnDetails.filter((item: any) => item.title !== detail.title);
    setReturnDetails(newArr)
  }
  return (
    <div>
      {isLoading && <Loader isLoading={isLoading} />}
      {EditLoading && <Loader />}
      <div className="">
        <Card>
          <Form
            form={form}
            name="product-create"
            initialValues={{ remember: true }}
            autoComplete="off"
            layout="vertical"
            onFinish={onFinish}
            className="lg:grid  lg:grid-cols-2 gap-4"
          >
            {/* Start Images */}
            <Form.Item<FieldType>
              name="images"
              label={
                <span className="text-sm md:text-base">{t("product_iamge")}</span>
              }
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

                className="w-full "
              >
                <Button
                  className="w-full h-12 justify-between text-sm md:text-xl"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f6f6f6",
                  }}
                >
                  <p> {t("attach_photo_size")}  350px * 350px </p>
                  <Image src="/assets/ImgUpdateIcon.svg" alt="sasd" width={24} height={24} className="" />

                </Button>
              </Upload>
            </Form.Item>
            {/* end Images */}

            {/* Start name */}
            <Form.Item<FieldType>
              name="name"
              label={<span className="text-sm md:text-base">{t("product_name")}</span>}
              rules={[{ required: true, message: t("please_enter_product_name") }]}
            >
              <Input className="!rounded-[8px] !py-3" />
            </Form.Item>
            {/* End Name */}

            {/* Start Price */}
            <Form.Item<FieldType>
              name="price"
              label={
                <span className="text-sm md:text-base"> {t("price")}</span>
              }
              rules={[{ required: true, message: t("please_enter_price") }]}
            >
              <Input className="!rounded-[8px] !py-3" />
            </Form.Item>
            {/* End Price */}

            {/* Start  quantity*/}
            <Form.Item<FieldType>
              name="quantity"
              label={<span className="text-sm md:text-base">{t("quantity")}</span>}
              rules={[{ required: true, message: t("please_enter_qauntity") }]}
            >
              <Input className="!rounded-[8px] !py-3" />
            </Form.Item>
            {/* End  quantity*/}


            {/* Start  brand*/}
            <Form.Item<FieldType>
              name="brand"
              label={<span className="text-sm md:text-base">{t("brand_name")}</span>}
              rules={[{ required: true, message: t("please_enter_brand_name") }]}
            >
              <Input className="!rounded-[8px] !py-3" />
            </Form.Item>
            {/* End brand */}

            {/* Start description */}
            <Form.Item<FieldType>
              name="description"
              label={<span className="text-sm md:text-base"> {t("details")}</span>}
              rules={[{ required: true, message: t("please_enter_details") }]}
            >
              <Input.TextArea className="!rounded-[8px] !py-3" />
            </Form.Item>
            {/* End description */}

            {/* Start Details */}
            {returnDetails.map((detail: any, index: number) => {
              return (
                <div key={index} className="border-2 border-gray-300 rounded-xl p-2">

                  <Form.Item
                    label={`${t("feature_title")} ${index + 1}`}
                    rules={[{ required: false, message: t("please_enter_title") }]}
                  >
                    <Input
                      value={detail.title}
                      onChange={(e) => handleDetailChange(index, "title", e.target.value)}
                      className="!rounded-[8px] !py-3"
                    />
                  </Form.Item>
                  <Form.Item
                    label={`${t("feature_content")} ${index + 1}`}
                    rules={[{ required: false, message: t("please_enter_content") }]}
                    className="mb-4"
                  >
                    <Input
                      value={detail?.content}
                      onChange={(e) => handleDetailChange(index, "content", e.target.value)}
                      className="!rounded-[8px] !py-3"
                    />
                  </Form.Item>
                  <div className="px-1">

                    <MdDelete
                      onClick={() => { handleDeleteItemFromDetails(detail) }}
                      className="text-xl hover:text-red-400 hover:scale-110 cursor-pointer transition-all duration-150" />

                  </div>
                </div>
              );
            })}

            {/* End Details */}

            {/* نهاية إضافة تفاصيل جديدة */}
            <div className="w-full flex flex-col ">
              <Button className="w-1/2 h-12" onClick={addDetailField}>
                {t("add_new_details")}
              </Button>

            </div>
            <div className=" col-span-2">
              <button
                type="submit"
                className="rounded-full w-28 py-2 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
              >
                {t("edit")}
              </button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}
export default EditProduct;
