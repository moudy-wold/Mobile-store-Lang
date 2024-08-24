"use client"
import React, { useEffect, useState } from "react";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { Button, Form, Input, Upload, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { CreateInfos } from "@/app/[locale]/api/info";
import { useRouter } from 'next/navigation';
import { MdDelete } from "react-icons/md";
import { SocialMedya } from "@/app/[locale]/utils/constant";

type Props = {
    data: {
        name: string,
        logo: any,
        description: string,
        social: string,
    }
}

type FieldType = {
    
        name: string,
        logo: any,
        description: string,
        social: string,
    
}

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

function CreateInfo({ data }: Props) {

    const [form] = useForm();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [socialArr, setSocialArr] = useState<any>([]);

    useEffect(() => {
        if (data) {
            form.setFieldValue('name', data?.name);
            form.setFieldValue('description', data?.description);
            form.setFieldValue('logo', [
                {
                    uid: '-2',
                    name: data?.logo,
                    status: 'done',
                    url: data?.logo,
                },
            ]);

            const socialData = JSON.parse(data?.social);
            setSocialArr(socialData);
        };
    }, [data]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const selectedItem = SocialMedya.find(item => item.name === selectedValue);

        if (selectedItem && socialArr != null) {
            const isAlreadyAdded = socialArr.some((item: any) => item.name === selectedItem.name);
            if (!isAlreadyAdded) {
                setSocialArr([...socialArr, selectedItem]);
            }
        }
    };

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newSocialArr = [...socialArr];
        newSocialArr[index] = { ...newSocialArr[index], url: e.target.value };
        setSocialArr(newSocialArr);
    };

    const handleDelete = (index: number) => {
        const updatedSocialArr = [...socialArr];
        updatedSocialArr.splice(index, 1);
        setSocialArr(updatedSocialArr);
    };

    const onFinish = async ({ name, logo, description }: FieldType) => {
        // setIsLoading(true);
        const formData = new FormData();
        formData.append("name", name);
        formData.append('logo', logo[0].originFileObj);
        formData.append("description", description);
        formData.append('social', JSON.stringify(socialArr));
        
        CreateInfos(formData)
            .then((res) => {
                notification.success({
                    message: 'تم إضافة المعلومات بنجاح',
                });
                setIsLoading(false);
                router.back()
            })
            .catch((error: any) => {
                setIsLoading(false);
                notification.error({
                    message: 'خطأ',
                    description: error.response.data.message,
                });
            });
    };

    return (
        <div>
            {isLoading && <Loader />}

            <Form
                form={form}
                name="product-create"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
                onFinish={onFinish}
                className="lg:grid lg:grid-cols-2 gap-4"
            >
                <Form.Item<FieldType>
                    name="name"
                    label={<span className="text-sm md:text-base">إسم المتجر</span>}
                    rules={[{ required: true, message: "الرجاء إدخال إسم المتجر" }]}
                >
                    <Input className="!rounded-[8px] !py-3" />
                </Form.Item>

                <Form.Item<FieldType>
                    name="logo"
                    label={<span className="text-sm md:text-base">الشعار اللوغو</span>}
                    rules={[{ required: true, message: "الرجاء إدخال اللوغو" }]}
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
                        className="w-full"
                        beforeUpload={() => false}
                        maxCount={1}
                    >
                        <Button
                            className="w-full h-12 justify-between text-sm md:text-xl"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#f6f6f6",
                            }}
                        >
                            <p>إرفاق صورة اللوغو 150px * 150px</p>
                            {ImgUpdateIcon}
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item<FieldType>
                    name="description"
                    label={<span className="text-sm md:text-base">التفاصيل</span>}
                    rules={[{ required: true, message: "الرجاء إدخال التفاصيل" }]}
                >
                    <Input.TextArea className="!rounded-[8px] !py-3" />
                </Form.Item>

                <Form.Item<FieldType>
                    name="social"
                    label={<span className="text-sm md:text-base">روابط التواصل الإجتماعي</span>}
                >
                    <select
                        style={{ width: "100%" }}
                        className="w-full border-2 border-gray-200 rounded-lg h-12"
                        onChange={handleSelectChange}
                    >
                        {SocialMedya.map((item) => (
                            <option value={item.name} key={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </Form.Item>

                <div className="lg:col-span-2 lg:grid grid-cols-2 gap-2">
                    {socialArr?.map((item: any, index: number) => (
                        <div key={index}>
                            <div key={item.name} className="grid grid-cols-3 item-center border-[1px] border-gray-300 rounded-xl p-3 my-2">
                                <span>{item.name}</span>
                                <span className='flex items-center justify-end'>{item.icon}</span>
                                <span className="cursor-pointer hover:text-red-800 flex items-center justify-end" onClick={() => handleDelete(index)}><MdDelete /></span>
                            </div>
                            <Form.Item label={<span className="text-sm">الرابط</span>}>
                                <Input
                                    placeholder="يرجى كتابة الرابط ..."
                                    className="!rounded-[8px] !py-1"
                                    value={item.url || ""}
                                    onChange={(e) => handleLinkChange(e, index)}
                                />
                            </Form.Item>
                        </div>
                    ))}
                </div>

                <div className="col-span-2">
                    <button
                        type="submit"
                        className="rounded-full w-28 py-2 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
                    >
                        إضافة
                    </button>
                </div>
            </Form>
        </div>
    );
}

export default CreateInfo;
