"use client";
import { DeleteService, EditeServiceById, EditeStatusServiceById, GetAllService } from "@/app/[locale]/api/services";
import { Modal, Space, notification } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { IoChatbubblesOutline, IoPrintOutline } from "react-icons/io5";
import { MdOutlineDoneOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import Loader from '@/app/[locale]/components/global/Loader/Loader';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode'
import { GiFlowerStar } from "react-icons/gi";
import ChangePassword from "../../Admin/Customer/CustomerList/ChangePassword/ChangePassword";
import CustomerDetails from "../../Admin/Customer/CreateCustomer/CustomerDetails";
import { DeleteServiceEmployee, EditeStatusServiceByIdEmployee } from "@/app/[locale]/api/ForEmployee";

function CustomerPage({ data, customerIdFromServer }: any) {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [openActiveService, setOpenActiveService] = useState(false);
  const [openDeleteService, setOpenDeleteService] = useState(false);
  const [servicesData, setServicesData] = useState([]);
  const [openAddService, setOpenAddService] = useState(false);
  const [id, setId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [img, setImg] = useState("")
  const [openPrint, setOpenPrint] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [cusotmerPhoneNumber, setCusotmerPhoneNumber] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [userRole, setUserRole] = useState("");

  const [obj, setObj] = useState({});

  const ServiceStatusList = [
    {
      value: "pending",
      id: "1",
      label: "قيد الانتظار"
    },
    {
      value: "active",
      id: "2",
      label: "جاري الفحص"

    },
    {
      value: "refused",
      id: "3",
      label: "إعادة"

    },
    {
      value: "done",
      id: "4",
      label: "إنتهى"
    },
  ]

  useEffect(() => {
    const user: any = localStorage.getItem("userRole")

    if (user != undefined) {
      setUserRole(JSON.parse(user))
    }

    setServicesData(data?.Services)
  }, [])

  const handleChangeServicesStatus = async (serviceId: string, status: string) => {
    setIsLoading(true)

    if (userRole == "admin") {


      EditeStatusServiceById(serviceId, customerIdFromServer, status)
        .then((res) => {
          if (res.status) {

            notification.success({
              message: "تم التعديل بنجاح"
            })
            setOpenActiveService(true)
          }
          router.refresh()

        })
        .catch((err) => {
          notification.error({
            message: err.response.data.message
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      EditeStatusServiceByIdEmployee(serviceId, customerIdFromServer, status)
        .then((res) => {
          if (res.status) {

            notification.success({
              message: "تم التعديل بنجاح"
            })
            setOpenActiveService(true)
          }
          router.refresh()

        })
        .catch((err) => {
          notification.error({
            message: err.response.data.message
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // Delete Service
  const hideModalAndDeleteService = () => {
    setIsLoading(true)
    setOpenDeleteService(false)
    if (userRole == "admin") {
      DeleteService(serviceId)
        .then((res) => {
          if (res.status) {
            notification.success({
              message: "تم حذف الصيانة بنجاح"
            });
          }
          router.refresh()
        })
        .catch((err) => {
          console.log(err)
          notification.error({
            message: err.response.data.message
          });
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      DeleteServiceEmployee(serviceId)
        .then((res) => {
          if (res.status) {
            notification.success({
              message: "تم حذف الصيانة بنجاح"
            });
          }
          router.refresh()
        })
        .catch((err) => {
          console.log(err)
          notification.error({
            message: err.response.data.message
          });
        })
        .finally(() => {
          setIsLoading(false)
        })

    }
  }

  const customerDataToShow = [{
    key: "1",
    id: data._id,
    name: data?.userName,
    phoneNumber: data?.phoneNumber,
  }]

  // Print Fun
  const handlePrint = () => {
    QRCode.toDataURL(`https://mobilestore-vwav.onrender.com/app/user-profile/${customerId}`)
      .then(url => {
        setImg(url)
        setOpenPrint(false)
      })
      .catch(err => {
        console.error(err)
      })
  }
  
  const columns: ColumnsType<any> = [
    {
      title: "إسم الزبون",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <a>{text}</a>,
    },
    {
      title: "رقم الهاتف",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
    },

    {
      title: "الإجرائات",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {
            userRole === "admin" || userRole === "employee" ?
              <>
                <a href={`/${userRole}/customer/edit/${record.id}`}><CiEdit /></a>
                <a><RiDeleteBinLine onClick={() => { setOpenDelete(true); setCustomerId(record.id) }} /></a>
                <a><CiCirclePlus onClick={() => { setCustomerId(record.id); setOpenAddService(true); }} className="text-xl" /></a>
                <span className="hover:text-[#006496] cursor-pointer hover:scale-110 transition-all duration-200" onClick={() => { setCustomerId(record.id); handlePrint() }} ><IoPrintOutline className="text-xl" /> </span>
                {userRole === "admin" &&
                  <span className="hover:text-[#006496] cursor-pointer hover:scale-110 transition-all duration-200" onClick={() => { setCustomerId(record.id); setOpenChangePassword(true); setCusotmerPhoneNumber(record.phoneNumber) }} ><GiFlowerStar /></span>
                }
              </> : <>{userRole}</>
          }
        </Space>
      ),
    },
  ];

  const serviceColumns: ColumnsType<any> = [
    {
      title: "نوع الهاتف",
      dataIndex: "phoneType",
      key: "phoneType",
    },
    {
      title: "نوع الصيانة",
      dataIndex: "serviceType",
      key: "serviceType",
    },
    {
      title: "تكلفة الصيانة",
      dataIndex: "serviceCost",
      key: "serviceCost",
    },
    {
      title: "حالة الصيانة",
      dataIndex: "serviceStatus",
      key: "serviceStatus",
      width: '180px',
      render: (_, record) => (
        <Space size="middle">
          <select
            onChange={(e) => { handleChangeServicesStatus(record._id, e.target.value); setServiceId(record._id); }}
            style={{ width: "100%" }}
            className="w-full border-2 border-gray-200 rounded-lg h-12"
            disabled={userRole == "admin" || userRole == "employee" ? false : true}
          >
            {ServiceStatusList.map((item: any, index: number) => {
              return (
                <>
                  {item.value == record.serviceStatus ?
                    <option value={item.value} key={item.id} selected>
                      {item.label}
                    </option> :
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>}
                </>
              )
            })}
          </select>
          {record.serviceStatus == "delivered" && <MdOutlineDoneOutline className="text-[#5cb85c]" />}
        </Space>
      ),
    },
    {
      title: "مدة الكفالة",
      key: "warantiDuration",
      dataIndex: "warantiDuration",
    },
    {
      title: "تاريح الإستلام",
      dataIndex: "createdAt",
      key: "createdAt",

    },
    {
      title: "تاريخ التسليم",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "الإجرائات",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {userRole == "admin" || userRole == "employee" ? <>
            <a href={`/${userRole}/customer/service/edit/${record._id}`}><CiEdit /></a>
            <a><RiDeleteBinLine onClick={() => { setOpenDeleteService(true); setServiceId(record._id) }} /></a>
          </> : <>{userRole}</>}
        </Space>
      ),
    },
  ];
  const activeServices = servicesData.filter((f: any) => { return f.serviceStatus != "done" });

  return (
    <div className="container">
      {isLoading && <Loader />}
      <div>
        <Table columns={columns} dataSource={customerDataToShow} />
      </div>
      <div className="mt-10 border-2 border-gray-300 rounded-lg p-5">
        <h2 className="">
          الصيانات النشطة
        </h2>
        <Table columns={serviceColumns} dataSource={activeServices} scroll={{ x: 500 }} />
      </div>

      <div className="mt-10 border-2 border-gray-300 rounded-lg p-5">
        <h2 className="">
          الصيانات
        </h2>
        <Table columns={serviceColumns} dataSource={servicesData} scroll={{ x: 500 }} />
      </div>

      <Modal
        title="حذف الصيانة!!!"
        open={openDeleteService}
        onOk={() => hideModalAndDeleteService()}
        onCancel={() => setOpenDeleteService(false)}
        okText="موافق"
        cancelText="إلغاء"
        okButtonProps={{ style: { backgroundColor: '#4096ff' } }}
      >
        <p>هل أنت متأكد من أنك تريد حذف الصيانة ؟</p>
      </Modal>

      <Modal
        title="تغيير كلمة المرور للزبون"
        open={openChangePassword}

        onCancel={() => setOpenChangePassword(false)}
        okText="موافق"
        cancelText="إلغاء"
        okButtonProps={{ style: { display: "none" } }}
      >
        <ChangePassword userId={customerId} phoneNumber={cusotmerPhoneNumber} setOpenChangePassword={setOpenChangePassword} />
      </Modal>

      {openAddService &&
        <Modal
          title="إضافة الصيانة"
          centered
          open={openAddService}
          onOk={() => setOpenAddService(false)}
          okButtonProps={{ style: { display: 'none', backgroundColor: '#4096ff' } }}
          onCancel={() => setOpenAddService(false)}
          width={1000}
        >
          <CustomerDetails id={customerId} setOpen={setOpenAddService} />
        </Modal>
      }

    </div>
  )
}

export default CustomerPage;