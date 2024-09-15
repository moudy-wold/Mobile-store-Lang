"use client";
import React, { useState, useEffect } from "react";
import { Button, Card, Form, Input, notification, Upload } from "antd";
import { EditProductById } from '@/app/[locale]/api/phone';
import { useForm } from 'antd/es/form/Form';
import { useRouter, useParams } from 'next/navigation';
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import useSwr from 'swr';
import { GetProductById } from "@/app/[locale]/api/phone";
import { MdOutlineDoneOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

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

function EditProduct() {

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
        // for (const property in data?.data?.details) {
        data?.data?.details.map((item: any) => {          

          setReturnDetails(prevDetails => [...prevDetails, { title: item.title, content: item.content }]);

        })



        returnDetails.shift();

        form.setFieldValue('name', data?.data?.name);
        // form.setFieldValue('images', data?.data?.images);
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

    setIsLoading(true);


    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    for (let i = 0; i < images.length; i++) {
      formData.append('images[]', images[i].originFileObj!);
    }
    formData.append('quantity', quantity);
    formData.append('brand', brand);
    formData.append('price', price);
    // formData.append('details', JSON.stringify(Object.keys(detailsData).length == 0 ? returnDetails : detailsData));
    formData.append('details', JSON.stringify(returnDetails));
    formData.append('categoryId', categoryId);
    console.log(returnDetails)
    EditProductById(id, formData)
      .then((res) => {
        console.log(res.data)
        if (res.data.status) {
          form.resetFields();
          setIsLoading(false)
          notification.success({
            message: "تم التعديل  بنجاح"
          });
          // router.back();
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
 

  const handleDeleteItemFromDetails = (detail:any)=>{
    let newArr  = returnDetails.filter((item:any) => item.title !== detail.title);
    setReturnDetails(newArr)
  }
  return (
    <div>
      {isLoading || EditLoading && <Loader />}
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
                <span className="text-sm  md:text-base">صورة المنتج</span>
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
                  <p> إرفاق صورة السلايدر 1100px * 200px </p>
                  {ImgUpdateIcon}
                </Button>
              </Upload>
            </Form.Item>
            {/* end Images */}

            {/* Start name */}
            <Form.Item<FieldType>
              name="name"
              label={<span className="text-sm  md:text-base">إسم الهاتف</span>}
              rules={[{ required: true, message: "الرجاء إدخال إسم الهاتف" }]}
            >
              <Input className="!rounded-[8px] !py-3" />
            </Form.Item>
            {/* End Name */}

            {/* Start Price */}
            <Form.Item<FieldType>
              name="price"
              label={
                <span className="text-sm  md:text-base"> السعر</span>
              }
              rules={[{ required: true, message: "الرجاء إدخال السعر" }]}
            >
              <Input className="!rounded-[8px] !py-3" />
            </Form.Item>
            {/* End Price */}

            {/* Start  quantity*/}
            <Form.Item<FieldType>
              name="quantity"
              label={<span className="text-sm  md:text-base">العدد</span>}
              rules={[{ required: true, message: "الرجاء إدخال العدد" }]}
            >
              <Input className="!rounded-[8px] !py-3" />
            </Form.Item>
            {/* End  quantity*/}


            {/* Start  brand*/}
            <Form.Item<FieldType>
              name="brand"
              label={<span className="text-sm  md:text-base">إسم الشركة</span>}
              rules={[{ required: true, message: "الرجاء إدخال إسم الشركة" }]}
            >
              <Input className="!rounded-[8px] !py-3" />
            </Form.Item>
            {/* End brand */}

            {/* Start description */}
            <Form.Item<FieldType>
              name="description"
              label={<span className="text-sm  md:text-base"> التفاصيل</span>}
              rules={[{ required: true, message: "الرجاء إدخال التفاصيل" }]}
            >
              <Input.TextArea className="!rounded-[8px] !py-3" />
            </Form.Item>
            {/* End description */}

            {/* Start Details */}
            {returnDetails.map((detail: any, index: number) => {
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
                    onClick={()=>{handleDeleteItemFromDetails(detail)}}
                    className="text-xl hover:text-red-400 hover:scale-110 cursor-pointer transition-all duration-150" />
                  
                  </div>
                </div>
              );
            })}

            {/* End Details */}

            {/* نهاية إضافة تفاصيل جديدة */}
            <div className="w-full flex flex-col ">
              <Button className="w-1/2 h-12" onClick={addDetailField}>
                إضافة تفاصيل جديدة
              </Button>

            </div>
            <div className=" col-span-2">
              <button
                type="submit"
                className="rounded-full w-28 py-2 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
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
export default EditProduct;
