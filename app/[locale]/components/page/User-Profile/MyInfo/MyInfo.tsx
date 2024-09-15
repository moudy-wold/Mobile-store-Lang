'use client'
import OTPPopup from '@/app/[locale]/components/global/OTPPopup/OTPPopup';
import { useForm } from 'antd/es/form/Form';
import { Modal, Form, Input, notification } from 'antd';
import React, { useState } from 'react'
import { IoMdCloudDone } from "react-icons/io";
import { useRouter } from "next/navigation";
import { ResendVerifyEmail, SendEmail, UpdateOrAddEmailAndName } from '@/app/[locale]/api/auth';
import Loader from '@/app/[locale]/components/global/Loader/Loader';
import VerifySendEmail from '../VerifySendEmail/VerifySendEmail';
import { useSelector } from 'react-redux';

type FieldType = {
  email: string;
}
function MyInfo({ data, customer }: any) {
  const [form] = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [openVerifyPopup, setOpenVerifyPopup] = useState(false)
  const [openEmail, setOpenEmail] = useState(false)
  const [email, setEmail] = useState("")
  const [slideChangePass, setSlideChangePass] = useState(false);
  const router = useRouter();
  const { infoData } = useSelector((state: any) => state.counter)

  const handleOpenEmail = () => {
    setOpenEmail(true)
  };

  const handleSendToEmail = async () => {
    SendEmail(email)
      .then((res: any) => {
        console.log(res)
        if (res.status) {
          notification.success({
            message: "تم إرسال الكود للبريد الإلكرتوني"
          })
        }
      })
      .catch((err: any) => {
        console.log(err)
        notification.error({
          message: err.response.data.message
        })
      })
  };

  const handelSendVerifyCode = async () => {
    setIsLoading(true)
    ResendVerifyEmail()
      .then((res: any) => {
        console.log(res)
        if (res.status) {
          setIsLoading(false)
          notification.success({
            message: "تم إرسال الكود بنجاح"
          });
          setOpenVerifyPopup(true)
        }
      })
      .catch((err: any) => {
        console.log(err)
        setIsLoading(false)
        notification.error({
          message: err.responde.data.message,
        });
      })
  }

  const onFinishSendEmail = async ({ email }: FieldType) => {
    setIsLoading(true)
    const emaildata = {
      email: email
    }
    UpdateOrAddEmailAndName(emaildata)
      .then((res: any) => {
        console.log(res)
        if (res.status) {
          notification.success({
            message: "تم إرسال الكود إلى البريد الإلكتروني"
          })
          setOpenVerifyPopup(true)
          setIsLoading(false)
        }
      })
      .catch((err: any) => {
        console.log(err)
        setIsLoading(false)
        notification.error({
          message: err.response.data.message
        })
      })
  }
  return (
    <div className='p-20'>
      <Loader isLoading={isLoading} />
      <div className="border-2 border-gray-300 rounded-lg p-5">
        <div className='grid grid-cols-4 gap-5 items-center '>
          <div className=''>
            <span className='text-lg'>إسم المستخدم : </span>
            <span className='text-lg'> {!customer ? infoData.data?.createdBy?.userName : data?.userName} </span>
          </div>
          <div className=''>
            <span className='text-lg'>رقم الهاتف : </span>
            <span className='text-lg'> {!customer ? infoData.data?.createdBy?.phoneNumber : data?.phoneNumber} </span>
          </div>
          <div className='flex items-center '>
            <span className='text-lg w-fit'>الإيميل : </span>
            {customer ?
              (
                !data.email_verified ?
                  <span className='text-lg flex items-center gap-1'>
                    {data?.email} 
                    <span className='flex items-center gap-2'>            
                      {data?.email_verified && <IoMdCloudDone className="text-[#5cb85c] tet-xl" />}
                    </span>

                  </span> :
                  <button onClick={() => { handleOpenEmail() }} className=' text-[#006496] cursor-pointer hover:scale-105 transition-all duration-150'>يرجى إدخال بريد إلكرتوني !!</button>
              ) : (
                infoData.data?.createdBy?.email ?
                  <span className='text-lg flex items-center gap-1'> {infoData.data?.createdBy?.email}
                    <span className='flex items-center gap-2'> 
                      {infoData.data?.createdBy?.email_verified && <IoMdCloudDone className="text-[#5cb85c] tet-xl" />}
                    </span>
                  </span>
                  :
                  <button onClick={() => { handleOpenEmail() }} className=' text-[#006496] cursor-pointer hover:scale-105 transition-all duration-150'>يرجى إدخال بريد إلكرتوني  !!</button>
              )
            }
          </div>
          <div className=''>
            <span className=''> {!customer ? (infoData.data?.createdBy?.email && !infoData.data?.createdBy?.email_verified && <button onClick={() => handelSendVerifyCode()} className=" block mx-auto bg-[#006496] text-white hover:text-[#006496] hover:bg-white transition-all duration-150 cursor-pointer border-2 border-[#006496] p-2 rounded-xl ">تأكيد حسابك بخطوة صغيرة ؟ </button>) : (data?.email && !data?.email_verified && <button onClick={() => handelSendVerifyCode()} className=" block mx-auto bg-[#006496] text-white hover:text-[#006496] hover:bg-white transition-all duration-150 cursor-pointer border-2 border-[#006496] p-2 rounded-xl ">تأكيد حسابك بخطوة صغيرة ؟ </button>)}
            </span>
          </div>
        </div>

      </div>


      {/* Start Chane Password */}
      <div className="">
        <h2>
          <button
            type="button"
            className={`flex items-center justify-center p-3 my-10 rounded-lg  border-2 border-[#8c8c8c] hover:border-[#006496] font-semibold py-2 text-[#8c8c8c]  hover:text-[#036499!important] hover:text-[#036499]  hover:[&{sapn}]:text-[#8c8c8c] ${slideChangePass ? "!text-[#036499] [&{sapn}]:!text-[#8c8c8c] !border-[#006496]" : " "}  `}
            onClick={() => { setSlideChangePass(!slideChangePass); }}
            aria-expanded={slideChangePass}
            aria-controls="faqs-text-01"
          >
            <span className="" >تغيير كلمة المرور </span>

          </button>
        </h2>

        <div
          id="faqs-text-01"
          role="region"
          aria-labelledby="faqs-title-01"
          className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${slideChangePass ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"} `}
        >
          <div className="overflow-hidden">
            <div className="w-1/2">
              <Form
                form={form}
                name="send-email"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
                onFinish={onFinishSendEmail}
                className=""
              >
                <Form.Item<FieldType>
                  name="email"
                  className="block"
                  label={<span className="text-sm  md:text-base">البريد الإلكرتوني</span>}
                  rules={[{ required: true, message: "الرجاء إدخال البريد الإلكرتوني" }]}
                >
                  <Input
                    placeholder="الرجاء إدخال البريد الإلكرتوني"
                    className="!rounded-[8px] !py-3  w-full block" />
                </Form.Item>
                <div className=" col-span-2">
                  <button
                    type="submit" className="rounded-full w-28 py-2 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
                  >
                    إرسال
                  </button>
                </div>
              </Form>

            </div>
          </div>
        </div>
      </div>
      {/* End  Chane Password  */}
      <Modal
        title="تفاصيل إنشاء الحساب"
        centered
        open={openVerifyPopup}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={() => { setOpenVerifyPopup(false); router.push("/auth/login"); }}
        width={500}
      >
        <OTPPopup setOpenVerifyPopup={setOpenVerifyPopup} />
      </Modal>
      
      <Modal
        centered
        open={openEmail}
        okButtonProps={{ style: { display: "hidden" } }}
        onCancel={() => { setOpenEmail(false); router.push("/auth/login"); }}
        width={600}
      >
        <VerifySendEmail setOpenVerifyPopup={setOpenVerifyPopup} setOpenEmail={setOpenEmail} />
      </Modal>


    </div>
  )
}

export default MyInfo
