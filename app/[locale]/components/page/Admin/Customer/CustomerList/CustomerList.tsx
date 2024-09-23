"use client";
import React, { useEffect, useState } from "react";
import { Space, Table, Modal, notification, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { DeleteCustomer, GetAllCustomer } from "@/app/[locale]/api/customer";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { useRouter } from "next/navigation";
import {
  DeleteService,
  EditeStatusServiceById,
  GetAllService
} from "@/app/[locale]/api/services";
import moment from "moment";
import CustomerDetails from "../CreateCustomer/CustomerDetails";
import { MdOutlineDoneOutline } from "react-icons/md";
import { IoChatbubblesOutline, IoPrintOutline } from "react-icons/io5";
import QRCode from "qrcode";
import Image from "next/image";
import { ServiceStatusList } from "@/app/[locale]/utils/constant";
import { GiFlowerStar } from "react-icons/gi";
import ChangePassword from "./ChangePassword/ChangePassword";
import { useSelector } from "react-redux";

interface DataType {
  id: string;
  name: string;
  phoneNumber: string;
  password: string;
  service: string[];
}

type FieldType = {
  serviceStatus: string;
};

function CustomerList() {
  const { card_System, repair_Service_System } = useSelector(
    (state: any) => state.counter
  );

  const router = useRouter();
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [openActiveService, setOpenActiveService] = useState(false);
  const [openDeleteService, setOpenDeleteService] = useState(false);
  const [servicesData, setServicesData] = useState([]);
  const [openAddService, setOpenAddService] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [status, setStatus] = useState("");
  const [img, setImg] = useState("");
  const [openPrint, setOpenPrint] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [cusotmerPhoneNumber, setCusotmerPhoneNumber] = useState("");
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [data, setData] = useState([]);

  const handlePageChange = async (page: any) => {
    setPage(page + 1);
    setIsLoading(true);
    console.log(page);
    try {
      const res = await GetAllCustomer(page);
      setData(res.data.customers);
      setCurrentPage(res.data.pagination.current_page);
      console.log(res.data);
      setIsLoading(false);
    } catch (err: any) {
      notification.error({
        message: err.response.data.message
      });
      setIsLoading(false);
    }
  };

  // First Fetch
  useEffect(() => {
    let userIdValue: any = localStorage.getItem("userId");
    setUserId(JSON.parse(userIdValue));
    const getData = async () => {
      const res = await GetAllCustomer(1);
      setCurrentPage(res.data.pagination.current_page);
      setTotalItems(res.data.pagination.total);
      setPageSize(res.data.pagination.per_page);
      // console.log(res.data);
      setData(res.data.customers);
    };
    getData();
  }, []);

  const handleFetchService = (id: string) => {
    setIsLoading(true);
    GetAllService(id)
      .then((res) => {
        if (res.status) {
          setServicesData(res.data.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        notification.error({
          message: err.response.data.message
        });
      })
      .finally(() => {
        setIsLoading(false);
        router.refresh();
      });
  };

  // Edit Stuts Serivce
  const onFinish = async (serviceId: string, status: string) => {
    setIsLoading(true);

    let customerId: any = localStorage.getItem("customerId");

    EditeStatusServiceById(serviceId, customerId, status)
      .then((res) => {
        if (res.status) {
          notification.success({
            message: "تم التعديل بنجاح"
          });
          setOpenActiveService(true);
        }
        router.refresh();
      })
      .catch((err) => {
        notification.error({
          message: err.response.data.message
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Delete Customer
  const hideModalAndDeleteItem = () => {
    setIsLoading(true);
    DeleteCustomer(customerId)
      .then((res) => {
        if (res.status) {
          notification.success({
            message: "تم حذف الزبون بنجاح"
          });
          setOpenDelete(false);
        }
      })
      .catch((err) => {
        console.log(err.response);
        notification.error({
          message: err.response.data.message
        });
      })
      .finally(() => {
        setIsLoading(false);
        setOpenDelete(false);
        router.refresh();
      });
  };

  // Delete Service
  const hideModalAndDeleteService = () => {
    setIsLoading(true);
    setOpenDeleteService(false);
    DeleteService(serviceId)
      .then((res) => {
        if (res.status) {
          notification.success({
            message: "تم حذف الصيانة بنجاح"
          });
        }
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: err.response.data.message
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // Print Fun
  const handlePrint = () => {
    QRCode.toDataURL(
      `https://mobilestore-vwav.onrender.com/app/user-profile/${customerId}`
    )
      .then((url) => {
        setImg(url);
        setOpenPrint(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  //  Customers Table
  const columns: ColumnsType<any> = [
    {
      title: "إسم الزبون",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <a href={`/user-profile/${record._id}`}>{record.name}</a>
      )
    },
    {
      title: "رقم الهاتف",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber)
    },
    {
      title: "الصيانات",
      key: "services",
      render: (_, record) => (
        <Space size="middle">
          <a
            className="border-2 border-gray-400 rounded-xl p-2 hover:bg-gray-100 block text-xs lg:text-sm text-center"
            onClick={() => {
              setOpenService(true);
              handleFetchService(record._id);
              localStorage.setItem("customerId", record._id);
            }}
          >
            عرض الصيانات {record.services?.length}
          </a>
        </Space>
      )
    },
    {
      title: "الصيانات النشطة",
      dataIndex: "activeServices",
      key: "activeServices",
      render: (_, record) => (
        <Space size="middle">
          <a
            className="border-2 border-gray-400 rounded-xl p-2 hover:bg-gray-100 block text-xs lg:text-sm text-center"
            onClick={() => {
              setOpenActiveService(true);
              handleFetchService(record._id);
              localStorage.setItem("customerId", record._id);
            }}
          >
            الصيانات النشطة {record.activeServices?.length}
          </a>
        </Space>
      )
    },
    {
      title: "الإجرائات",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href={`/admin/customer/edit/${record._id}`}>
            <CiEdit />
          </a>
          <a>
            <RiDeleteBinLine
              onClick={() => {
                setOpenDelete(true);
                setCustomerId(record._id);
              }}
            />
          </a>
          <a>
            <CiCirclePlus
              onClick={() => {
                setCustomerId(record._id);
                setOpenAddService(true);
              }}
              className="text-xl"
            />
          </a>
          <a href={`/admin/message`}>
            <IoChatbubblesOutline
              onClick={() => {
                setCustomerId(record._id);
              }}
              className="text-xl"
            />
          </a>
          <span
            className="hover:text-[#006496] cursor-pointer hover:scale-110 transition-all duration-200"
            onClick={() => {
              setCustomerId(record._id);
              handlePrint();
            }}
          >
            <IoPrintOutline className="text-xl" />{" "}
          </span>
          <span
            className="hover:text-[#006496] cursor-pointer hover:scale-110 transition-all duration-200"
            onClick={() => {
              setCustomerId(record._id);
              setOpenChangePassword(true);
              setCusotmerPhoneNumber(record.phoneNumber);
            }}
          >
            <GiFlowerStar />
          </span>
        </Space>
      )
    }
  ];

  // Srvices and activeServices Table
  const serviceColumns: ColumnsType<any> = [
    {
      title: "نوع الهاتف",
      dataIndex: "phoneType",
      key: "phoneType"
    },
    {
      title: "نوع الصيانة",
      dataIndex: "serviceType",
      key: "serviceType"
    },
    {
      title: "تكلفة الصيانة",
      dataIndex: "serviceCost",
      key: "serviceCost"
    },
    {
      title: "حالة الصيانة",
      dataIndex: "serviceStatus",
      key: "serviceStatus",
      width: "180px",
      render: (_, record) => (
        <Space size="middle">
          <select
            onChange={(e) => {
              onFinish(record._id, e.target.value);
              setStatus(e.target.value);
              setServiceId(record._id);
            }}
            style={{ width: "100%" }}
            className="w-full border-2 border-gray-200 rounded-lg h-12"
          >
            {ServiceStatusList.map((item: any, index: number) => {
              return (
                <>
                  {item.value == record.serviceStatus ? (
                    <option value={item.value} key={item.id} selected>
                      {item.label}
                    </option>
                  ) : (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  )}
                </>
              );
            })}
          </select>
          {record.serviceStatus == "delivered" && (
            <MdOutlineDoneOutline className="text-[#5cb85c]" />
          )}
        </Space>
      )
    },
    {
      title: "مدة الكفالة",
      key: "warantiDuration",
      dataIndex: "warantiDuration"
    },
    {
      title: "تاريح الإستلام",
      dataIndex: "createdAt",
      key: "createdAt"
    },
    {
      title: "تاريخ التسليم",
      dataIndex: "updatedAt",
      key: "updatedAt"
    },
    {
      title: "الإجرائات",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href={`/employee/customer/service/edit/${record._id}`}>
            <CiEdit />
          </a>
          <a>
            <RiDeleteBinLine
              onClick={() => {
                setOpenDeleteService(true);
                setServiceId(record._id);
              }}
            />
          </a>
        </Space>
      )
    }
  ];
  const activeServices: any = servicesData?.filter((f: any) => {
    return f.serviceStatus != "done";
  });

  const servicesDataToShow = servicesData.map((item: any) => ({
    _id: item._id,
    phoneType: item.phoneType,
    serviceType: item.serviceType,
    serviceCost: item.serviceCost,
    serviceStatus: item.serviceStatus,
    warantiDuration: item.warantiDuration,
    receivedDate: moment(item.createdAt).locale("en").format("DD/MM/YYYY"),
    deliveryDate: moment(item.updatedAt).locale("en").format("DD/MM/YYYY")
  }));

  const customerDataToShow = data?.map((item: any) => ({
    _id: item._id,
    name: item.userName,
    phoneNumber: item.phoneNumber,
    services: item.Services,
    // activeServices: item.Services?.filter((f: any) => { return f.serviceStatus !== "done" })
    activeServices: item.Services?.filter((f: any) => {
      return f.serviceStatus !== "done";
    })
  }));

  if (!repair_Service_System) {
    router.push("/");
  }

  return (
    <div>
      {isLoading && <Loader />}
      <div>
        <Table
          columns={columns}
          dataSource={customerDataToShow}
          scroll={{ x: 750 }}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: totalItems,
            onChange: handlePageChange
          }}
        />
      </div>

      <div>
        <Modal
          title="حذف حساب!!!"
          open={openDelete}
          onOk={() => hideModalAndDeleteItem()}
          onCancel={() => setOpenDelete(false)}
          okText="موافق"
          cancelText="إلغاء"
          okButtonProps={{ style: { backgroundColor: "#4096ff" } }}
        >
          <p>هل أنت متأكد من أنك تريد حذف حساب الزبون ؟</p>
        </Modal>
        {img && <Image src={img} width={50} height={50} alt="aswd" />}

        <Modal
          title="الصيانات"
          centered
          width={1000}
          open={openService}
          onCancel={() => setOpenService(false)}
          cancelText="إغلاق"
          okButtonProps={{
            style: { backgroundColor: "#4096ff", display: "none" }
          }}
        >
          <Table
            columns={serviceColumns}
            dataSource={servicesDataToShow}
            rowKey={"id"}
            scroll={{ x: 500 }}
            // pagination={{
            //   pageSize: paginationData?.meta.per_page,
            //   current: paginationData?.meta.current_page,
            //   total: paginationData?.meta.total,
            //   showQuickJumper: true,
            //   showTotal: (total) => `العدد الكلي ${total}`,
            //   onChange: onPaginationChangeHandler,
            // }}
          />
        </Modal>

        <Modal
          title="الصيانات النشطة"
          centered
          width={1000}
          open={openActiveService}
          onCancel={() => setOpenActiveService(false)}
          cancelText="إغلاق"
          okButtonProps={{
            style: { backgroundColor: "#4096ff", display: "none" }
          }}
        >
          <Table
            columns={serviceColumns}
            dataSource={activeServices}
            scroll={{ x: 500 }}
          />
        </Modal>

        <Modal
          title="حذف الصيانة!!!"
          open={openDeleteService}
          onOk={() => hideModalAndDeleteService()}
          onCancel={() => setOpenDeleteService(false)}
          okText="موافق"
          cancelText="إلغاء"
          okButtonProps={{ style: { backgroundColor: "#4096ff" } }}
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
          <ChangePassword
            userId={customerId}
            phoneNumber={cusotmerPhoneNumber}
            setOpenChangePassword={setOpenChangePassword}
          />
        </Modal>

        {openAddService && (
          <Modal
            title="إضافة الصيانة"
            centered
            open={openAddService}
            onOk={() => setOpenAddService(false)}
            okButtonProps={{
              style: { display: "none", backgroundColor: "#4096ff" }
            }}
            onCancel={() => setOpenAddService(false)}
            width={1000}
          >
            <CustomerDetails id={customerId} setOpen={setOpenAddService} />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default CustomerList;
