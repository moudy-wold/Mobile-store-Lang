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
type FieldType = {
    title: string;
    image: string;
    type:string

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
function EditMainSlider(){
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
            message: "تم التعديل  بنجاح"
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
                label={<span className="text-sm  md:text-base">عنوان السلايدر</span>}
                rules={[{ required: true, message:"الرجاء إدخال إسم الزبون"}]}
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
          label={<span className="text-sm  md:text-base">صورة السلايدر</span>}
          rules={[{ required: true, message: 'الرجاء إدخال الصورة' }]}
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
              <p>  إرفاق صورة السلايدر</p>
              {ImgUpdateIcon}
            </Button>
          </Upload>
        </Form.Item>
              <div className=" col-span-2">        
                <button
                  type="submit" className="rounded-full w-20 py-1 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
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

export default EditMainSlider;