"use client";
import React, { useState, useEffect } from "react";
import { Button, Card, Form, Input, Upload, notification } from "antd";
import { useForm } from 'antd/es/form/Form';
import { AddProduct } from "@/app/[locale]/api/product";
import Loader from '@/app/[locale]/components/global/Loader/Loader';
import { useRouter } from 'next/navigation';
import { MdDelete } from "react-icons/md";
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
  description: string
};
 
function CreateProduct({locale}:LocaleProps) {
  const { t } = useTranslation(locale, "common");

  const [form] = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState([{ title: "", content: "" }]);
  
  const [categoryId, setCategoryId] = useState<any>();

  useEffect(() => {
    setCategoryId(localStorage.getItem("categoryId"))
  }, [])

  const onFinish = async ({ name, images, quantity, price, brand, description }: FieldType) => {
     setIsLoading(true);
     const formData: any = new FormData();
     formData.append("name", name);

     for (let i = 0; i < images.length; i++) {
       formData.append('images[]', images[i].originFileObj!);
     }
 
     formData.append('quantity', quantity);
     formData.append('price', price);
     formData.append('brand', brand);
     formData.append("description", description);
     formData.append('details', JSON.stringify(details  ));
     formData.append('categoryId', categoryId);
 
     try {
       const response = await AddProduct(formData);
       notification.success({
         message: t('product_added_successfully'),
       });
       router.back();
       setIsLoading(false);
 
     } catch (error: any) {
       setIsLoading(false);
       console.log(error);
       notification.error({         
         message: error.response.data.message,
       });
     }
  };

  const addDetailField = () => {
    setDetails([...details, { title: "", content: "" }]);
    
  };
  
  const handleDetailChange = (index: number, field: string, value: string) => {
    const newDetails:any = [...details];
    newDetails[index][field] = value;
    setDetails(newDetails);
  };
  
 
  const handleDeleteItemFromDetails = (detail:any)=>{
    let newArr  = details.filter((item:any) => item.title !== detail.title);
    setDetails(newArr)
  }

  return (
    <div>
      {isLoading && <Loader />}
      <Card>
        <Form
          form={form}
          name="product-create"
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
          onFinish={onFinish}
          className="lg:grid lg:grid-cols-2 gap-4"
        >
         {/* بدء الصور */}
         <Form.Item<FieldType>
            name="images"
            label={
              <span className="text-sm md:text-base">{t("product_iamge")}</span>
            }
            rules={[{ required: true, message: t("please_enter_image") }]}
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
          {/* نهاية الصور */}

          {/* بدء الاسم */}
          <Form.Item<FieldType>
            name="name"
            label={<span className="text-sm md:text-base">{t("product_name")}</span>}
            rules={[{ required: true, message: t("please_enter_product_name") }]}
          >
            <Input className="!rounded-[8px] !py-3" />
          </Form.Item>
          {/* نهاية الاسم */}

          {/* بدء السعر */}
          <Form.Item<FieldType>
            name="price"
            label={
              <span className="text-sm md:text-base"> {t("price")}</span>
            }
            rules={[{ required: true, message: t("please_enter_price") }]}
          >
            <Input className="!rounded-[8px] !py-3" />
          </Form.Item>
          {/* نهاية السعر */}

          {/* بدء العدد */}
          <Form.Item<FieldType>
            name="quantity"
            label={<span className="text-sm md:text-base">{t("quantity")}</span>}
            rules={[{ required: true, message: t("please_enter_qauntity") }]}
          >
            <Input className="!rounded-[8px] !py-3" />
          </Form.Item>
          {/* نهاية العدد */}

          {/* بدء الشركة */}
          <Form.Item<FieldType>
            name="brand"
            label={<span className="text-sm md:text-base">{t("brand_name")}</span>}
            rules={[{ required: true, message: t("please_enter_brand_name") }]}
          >
            <Input className="!rounded-[8px] !py-3" />
          </Form.Item>
          {/* نهاية الشركة */}

          {/* بدء الوصف */}
          <Form.Item<FieldType>
            name="description"
            label={<span className="text-sm md:text-base"> {t("details")}</span>}
            rules={[{ required: true, message: t("please_enter_details") }]}
          >
            <Input.TextArea className="!rounded-[8px] !py-3" />
          </Form.Item>
          {/* نهاية الوصف */}


          {/* بدء التفاصيل */}
          {details.map((detail, index) => {
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
                >
                  <Input
                    value={detail.content}
                    onChange={(e) => handleDetailChange(index, "content", e.target.value)}
                    className="!rounded-[8px] !py-3"
                  />
                </Form.Item>
                <div className="px-1">
                  
                  <MdDelete 
                  onClick={()=>{handleDeleteItemFromDetails(detail)}}
                  className="text-xl hover:text-red-400 hover:scale-110 cursor-pointer transition-all duration-150" />
                
                </div>
              </div>
            );
          })}

          
          {/* نهاية إضافة تفاصيل جديدة */}

          <div className="col-span-2">
          <div className="w-full flex flex-col ">
            <Button className="w-1/2 h-12" onClick={addDetailField}>
              {t("add_new_details")}
            </Button>
           
          </div>
            <button
              type="submit"
              className=" rounded-full  mt-5 w-28 py-2 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
            >
              {t("add")}
            </button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default CreateProduct;
