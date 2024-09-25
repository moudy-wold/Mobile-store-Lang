"use client";
import React,{useState,useEffect} from "react";
import {
  Card,
  Form,
  Input,
  Upload,Button, notification
} from "antd";
import { useForm } from 'antd/es/form/Form';
import { useRouter,useParams } from 'next/navigation';
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import useSwr from 'swr';
import {EditSliderById, GetSliderById} from "@/app/[locale]/api/slider"
import Image from "next/image";
import { useTranslation } from "@/app/i18n/client";


type FieldType = {
    title: string;
    image: string;
    type:string

};
 
function EditMainSlider({locale}:LocaleProps) {
  const { t, i18n } = useTranslation(locale, "common");

  const [form] = useForm();
  const router = useRouter();
  const params = useParams();
  const id :string | string[] = params.id;
  const formData = new FormData();
  const [isLoading, setIsLoading] = useState(false);
  const [getData, setGetData] = useState(true);
  const { data:SliderData, isLoading :EditLoading } = useSwr(
    `/api/sliders/show/${id}`,
    () => GetSliderById(id)
  );
  useEffect(() => {
    const data = SliderData?.data;
    if(getData){
    if (data) {   
      form.setFieldValue('title', data?.data?.title);
      form.setFieldValue('image', [
        {
          uid: '-2',
          name: data?.data?.image,
          status: 'done',
          url: data?.data?.image,
        },
      ]);
      setGetData(false)
    }
  }

  }, [SliderData])

    const onFinish = ({title,type,image}:FieldType)=> {
      setIsLoading(true)    
      formData.append('title', title);
      formData.append('type', "branch");
      formData.append('image', image);    
      EditSliderById(id,formData)
      .then((res)=>{
        if (res.data.status) {
          form.resetFields();
          notification.success({
            message: t("slider_edited_successfully")
          });       
        }  
      })
      .catch((err)=>{
        console.log(err.response)
        notification.success({
            message: err.response.data.error.message

        })
      })
      .finally(()=>{
        setIsLoading(false);
        // router.back();
      })
    
      }
        return (
          <div>       
            {isLoading && <Loader />}
            <div className="">
            <Card >
           
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
                name="title"
                label={<span className="text-sm  md:text-base">{t("slider_title")}</span>}
                rules={[{ required: true, message: t("please_enter_the_slider_title") }]}
              >
                <Input className="!rounded-[8px] !py-3" />
              </Form.Item>
              {/* <Form.Item<FieldType>        
                name="type"
                label={<span className="text-sm  md:text-base">نوع السلايدر</span>}
                rules={[{ required: true, message:"الرجاء إدخال نوع السلايدر"}]}
              >
                <Input className="!rounded-[8px] !py-3" />
              </Form.Item> */}
              <Form.Item<FieldType>
          name="image"
          label={<span className="text-sm  md:text-base">{t("slider_image")}</span>}
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
            maxCount={1}
            className="w-full "
            // customRequest={({ onSuccess }) => onSuccess && onSuccess('ok')}
            // customRequest={customUpload}
          >
            <Button
              className="w-full h-12 justify-between text-sm md:text-xl"
              style={{ display: 'flex', backgroundColor: '#f6f6f6' }}
            >
              <p> {t("attach_photo_size")} 1100 px * 200px </p>
              <Image src={"/assets/ImgUpdateIcon.svg"} alt="svg" width={24} height={24} className="" />
            </Button>
          </Upload>
        </Form.Item>
              <div className=" col-span-2">        
                <button
                  type="submit" className="rounded-full w-20 py-1 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
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

export default EditMainSlider;