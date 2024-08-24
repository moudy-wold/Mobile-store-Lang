"use client";
import React, { useState, useEffect } from "react";
import { Button, Card, Form, Input, Upload, notification } from "antd";
import { useForm } from 'antd/es/form/Form';
import { AddProduct } from "@/app/[locale]/api/phone";
import Loader from '@/app/[locale]/components/global/Loader/Loader';
import { useRouter } from 'next/navigation';
import { MdOutlineDoneOutline } from 'react-icons/md';

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

function CreateProduct() {
  const [form] = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState([{ title: "", content: "" }]);
  const [isAllDone, setIsAllDone] = useState(false);
  
  const [categoryId, setCategoryId] = useState<any>();

  useEffect(() => {
    setCategoryId(localStorage.getItem("categoryId"))
  }, [])

  const onFinish = async ({ name, images, quantity, price, brand, description }: FieldType) => {
   
    
    console.log(details)
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
         message: 'تم إضافة المنتج بنجاح',
       });
       router.back();
       setIsLoading(false);
 
     } catch (error: any) {
       setIsLoading(false);
       console.log(error);
       notification.error({
         message: 'خطأ',
         description: error.response.data.message,
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
    console.log(newDetails)
  };
  
  const handleDoneAddDetails = () => {
    const updatedDetails = details.map((detail) => ({ ...detail}));
    setDetails(updatedDetails);
     
  
    const detailsData : any = updatedDetails.reduce((acc:any, detail:any) => {
      acc[detail.title] = detail.content;
      return acc;
    }, {});
  
    setDetails(detailsData);
  };
  

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
              <span className="text-sm md:text-base">صورة المنتج</span>
            }
            rules={[{ required: true, message: "الرجاء إدخال الصورة" }]}
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
                <p> إرفاق صورة المنتج 350px * 350px </p>
                {ImgUpdateIcon}
              </Button>
            </Upload>
          </Form.Item>
          {/* نهاية الصور */}

          {/* بدء الاسم */}
          <Form.Item<FieldType>
            name="name"
            label={<span className="text-sm md:text-base">إسم المنتج</span>}
            rules={[{ required: true, message: "الرجاء إدخال إسم المنتج" }]}
          >
            <Input className="!rounded-[8px] !py-3" />
          </Form.Item>
          {/* نهاية الاسم */}

          {/* بدء السعر */}
          <Form.Item<FieldType>
            name="price"
            label={
              <span className="text-sm md:text-base"> السعر</span>
            }
            rules={[{ required: true, message: "الرجاء إدخال السعر" }]}
          >
            <Input className="!rounded-[8px] !py-3" />
          </Form.Item>
          {/* نهاية السعر */}

          {/* بدء العدد */}
          <Form.Item<FieldType>
            name="quantity"
            label={<span className="text-sm md:text-base">العدد</span>}
            rules={[{ required: true, message: "الرجاء إدخال العدد" }]}
          >
            <Input className="!rounded-[8px] !py-3" />
          </Form.Item>
          {/* نهاية العدد */}

          {/* بدء الشركة */}
          <Form.Item<FieldType>
            name="brand"
            label={<span className="text-sm md:text-base">إسم الشركة</span>}
            rules={[{ required: true, message: "الرجاء إدخال إسم الشركة" }]}
          >
            <Input className="!rounded-[8px] !py-3" />
          </Form.Item>
          {/* نهاية الشركة */}

          {/* بدء الوصف */}
          <Form.Item<FieldType>
            name="description"
            label={<span className="text-sm md:text-base"> التفاصيل</span>}
            rules={[{ required: true, message: "الرجاء إدخال التفاصيل" }]}
          >
            <Input.TextArea className="!rounded-[8px] !py-3" />
          </Form.Item>
          {/* نهاية الوصف */}


          {/* بدء التفاصيل */}
          {details.map((detail, index) => {
            return (
              <div key={index} className="border-2 border-gray-300 rounded-xl p-2">
                <Form.Item
                  label={`عنوان الميزة ${index + 1}`}
                  rules={[{ required: false, message: "الرجاء إدخال العنوان" }]}
                >
                  <Input
                    value={detail.title}
                    onChange={(e) => handleDetailChange(index, "title", e.target.value)}
                    className="!rounded-[8px] !py-3"
                  />
                </Form.Item>
                <Form.Item
                  label={`محتوى الميزة ${index + 1}`}
                  rules={[{ required: false, message: "الرجاء إدخال المحتوى" }]}
                >
                  <Input
                    value={detail.content}
                    onChange={(e) => handleDetailChange(index, "content", e.target.value)}
                    className="!rounded-[8px] !py-3"
                  />
                </Form.Item>
                <div className="flex items-center gap-5">

                </div>
              </div>
            );
          })}

          
          {/* نهاية إضافة تفاصيل جديدة */}

          <div className="col-span-2">
          <div className="w-full flex flex-col ">
            <Button className="w-1/2 h-12" onClick={addDetailField}>
              إضافة تفاصيل جديدة
            </Button>
            {/* <Button className="w-1/2 mt-10 h-12" onClick={handleDoneAddDetails}>
              تأكيد إضافة جميع التفاصيل
            </Button> */}
          </div>
            <button
              type="submit"
              className=" rounded-full  mt-5 w-28 py-2 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
            >
              إضافة
            </button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default CreateProduct;
