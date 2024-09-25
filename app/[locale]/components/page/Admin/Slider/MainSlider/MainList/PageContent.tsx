"use client";
import React,{useState,useEffect} from 'react';
import Image from "next/image"
import {DeleteSlider, Slider} from "@/app/[locale]/api/slider"
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import type { ColumnsType, } from "antd/es/table";
import { Space, Table, Modal,Button, notification } from "antd";
import {useRouter } from 'next/navigation';
import Loader from '@/app/[locale]/components/global/Loader/Loader';
import { useTranslation } from '@/app/i18n/client';
 
type Props = {
    data:Slider[],
    pageName :string
    locale: string;
}
function MainSliderList({data,pageName,locale}: Props) {
  const { t, i18n } = useTranslation(locale, "common");
 
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [id,setId] = useState("")
    const [isLoading,setIsLoading] = useState(false)
   
    const hideModal = () => {
      setOpenDelete(false);
    };


 
    const hideModalAndDeleteItem = () => {
      setIsLoading(true)
    DeleteSlider(id)  
    .then((res)=>{
      if (res.data.success) {            
        notification.success({
          message: t("slider_deleted_successfully")
        });       
      }  
    })
    .catch((err)=>{
      console.log(err.response)
      // notification.error({
      //   message: err.response.data.error.errors[0].msg

      // });     
    })
    .finally(()=>{
      setIsLoading(false)
      setOpenDelete(false);
      router.refresh()
    })
    };
  
    const columns: ColumnsType<any> = [
        {
          title: t("slider_name"),
          dataIndex: "title",
          key: "title",
          sorter: (a:any, b:any) => a.title.localeCompare(b.title),
          render: (text) => <a>{text}</a>,
        },        
        {
          title: t("image"),
          dataIndex: "img",
          key: "img",
         
        },       
        {
          title: t("actions"),
          key: "action",
          render: (_, record) => (
            <Space size="middle">
              <a href={`/admin/main-slider/edit/${record.id}`}><CiEdit onClick={() => setOpen(true)} /> </a>
              <a><RiDeleteBinLine onClick={() =>{ setOpenDelete(true); setId(record.id)}}  /></a>             
            </Space>
          ),
        },
      ];
      
      const FilterdData = data.filter((e:any) => {return e.type == pageName })

      const dataToShow = FilterdData.map((item:any) => ({
        id: item._id,
        title: item.title,
        img: <Image src={item.image} height={100} width={200} alt={item.title} className="!h-[80px]" />,
      }));


  return (
    <div className="w-[100vh] overflow-hidden">
      {isLoading && <Loader />}
      <Table columns={columns} dataSource={dataToShow} />


<div>      
  
   
<Modal
       title={t("delete_slider")}
    open={openDelete}
    onOk={()=>{hideModalAndDeleteItem()}}
    onCancel={hideModal}
    okText={t("confirm")}
    cancelText={t("cancel")}
    okButtonProps={{ style: { backgroundColor: '#4096ff' }}}
  >
   <p>{t("confirm_delete_slider")}</p>
  </Modal></div>
    </div>
  )
}

export default MainSliderList
