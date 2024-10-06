"use client";
import React, { useEffect, useState } from "react";
import { Space, Table, Modal, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { DeleteCustomer, GetAllCustomer } from "@/app/[locale]/api/customer";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { useRouter } from "next/navigation";
import {
  DeleteService,
  EditeStatusServiceById,
  GetAllService,
} from "@/app/[locale]/api/services";
import moment from "moment";

import { MdOutlineDoneOutline } from "react-icons/md";
import { IoChatbubblesOutline, IoPrintOutline } from "react-icons/io5";
import QRCode from "qrcode";
import Image from "next/image";
import { ServiceStatusList } from "@/app/[locale]/utils/constant";
import { GiFlowerStar } from "react-icons/gi";
import ChangePassword from "./ChangePassword/ChangePassword";
import { useSelector } from "react-redux";
import { useTranslation } from "@/app/i18n/client";
import SearchUser from "@/app/[locale]/components/global/Search/SearchUser/SearchUser";
import Link from "next/link";
import dynamic from 'next/dynamic'
 
const CustomerDetails = dynamic(() => import('../CreateCustomer/CustomerDetails'), {
  ssr: false,
})


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

function CustomerList({ locale }: LocaleProps) {
  const { t } = useTranslation(locale, "common");

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
    try {
      const res = await GetAllCustomer(page);
      setData(res.data.customers);
      setCurrentPage(res.data.pagination.current_page);
      setIsLoading(false);
    } catch (err: any) {
      notification.error({
        message: err.response.data.message,
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
          message: err.response.data.message,
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
            message: t("modified_successfully"),
          });
          setOpenActiveService(true);
        }
        router.refresh();
      })
      .catch((err) => {
        notification.error({
          message: err.response.data.message,
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
            message: t("customer_deleted_successfully"),
          });
          setOpenDelete(false);
        }
      })
      .catch((err) => {
        console.log(err.response);
        notification.error({
          message: err.response.data.message,
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
            message: t("service_has_been_successfully_removed"),
          });
        }
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: err.response.data.message,
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
      title: t("customer_name"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <a href={`/user-profile/${record._id}`}>{record.name}</a>
      ),
    },
    {
      title: t("phoneNumber"),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
    },
    {
      title: t("services"),
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
            {t("show_services")} {record.services?.length}
          </a>
        </Space>
      ),
    },
    {
      title: t("active_services"),
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
            {t("active_services")} {record.activeServices?.length}
          </a>
        </Space>
      ),
    },
    {
      title: t("actions"),
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
      ),
    },
  ];

  // Srvices and activeServices Table
  const serviceColumns: ColumnsType<any> = [
    {
      title: t("phone_type"),
      dataIndex: "phoneType",
      key: "phoneType",
    },
    {
      title: t("service_type"),
      dataIndex: "serviceType",
      key: "serviceType",
    },
    {
      title: t("service_cost"),
      dataIndex: "serviceCost",
      key: "serviceCost",
    },
    {
      title: t("service_status"),
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
      ),
    },
    {
      title: t("waranti_duration"),
      key: "warantiDuration",
      dataIndex: "warantiDuration",
    },
    {
      title: t("received_date"),
      dataIndex: "receivedDate",
      key: "receivedDate",
    },
    {
      title: t("delivery_date"),
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: t("actions"),
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
      ),
    },
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
    deliveryDate: moment(item.updatedAt).locale("en").format("DD/MM/YYYY"),
  }));

  const customerDataToShow = data?.map((item: any) => ({
    _id: item._id,
    name: item.userName,
    phoneNumber: item.phoneNumber,
    services: item.Services,
    // activeServices: item.Services?.filter((f: any) => { return f.serviceStatus !== "done" })
    activeServices: item.Services?.filter((f: any) => {
      return f.serviceStatus !== "done";
    }),
  }));

  if (!repair_Service_System) {
    router.push("/");
  }

  return (
    <div>
      {isLoading && <Loader />}
      <div className="grid grid-cols-[50%_50%] items-center px-4 lg-px-0">
        <div className="">
          <button className="border-2 border-gray-300 rounded-lg p-1 pr-2">
            <Link
              href="/admin/customer/create"
              className="flex items-center justify-beetwen text-xl"
            >
              {t("add_customer")} <CiCirclePlus className="mr-2" />
            </Link>
          </button>
        </div>

        <div className="p-4">
          <SearchUser locale={locale} />
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={customerDataToShow}
          scroll={{ x: 750 }}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: totalItems,
            onChange: handlePageChange,
          }}
        />
      </div>

      <div>
        <Modal
          title={t("delete_account")}
          open={openDelete}
          onOk={() => hideModalAndDeleteItem()}
          onCancel={() => setOpenDelete(false)}
          okText={t("confirm")}
          cancelText={t("close")}
          okButtonProps={{ style: { backgroundColor: "#4096ff" } }}
        >
          <p>{t("are_you_sure_want_delete_customer_account")}</p>
        </Modal>
        {img && <Image src={img} width={50} height={50} alt="aswd" />}

        <Modal
          title={t("services")}
          centered
          width={1000}
          open={openService}
          onCancel={() => setOpenService(false)}
          cancelText={t("close")}
          okButtonProps={{
            style: { backgroundColor: "#4096ff", display: "none" },
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
          title={t("active_services")}
          centered
          width={1000}
          open={openActiveService}
          onCancel={() => setOpenActiveService(false)}
          cancelText={t("close")}
          okButtonProps={{
            style: { backgroundColor: "#4096ff", display: "none" },
          }}
        >
          <Table
            columns={serviceColumns}
            dataSource={activeServices}
            scroll={{ x: 500 }}
          />
        </Modal>

        <Modal
          title={t("delete_service")}
          open={openDeleteService}
          onOk={() => hideModalAndDeleteService()}
          onCancel={() => setOpenDeleteService(false)}
          okText={t("confirm")}
          cancelText={t("close")}
          okButtonProps={{ style: { backgroundColor: "#4096ff" } }}
        >
          <p> {t("are_sure_you_want_delete_service")} </p>
        </Modal>

        <Modal
          title={t("change_customer_password")}
          open={openChangePassword}
          onCancel={() => setOpenChangePassword(false)}
          okText={t("confirm")}
          cancelText={t("close")}
          okButtonProps={{ style: { display: "none" } }}
        >
          <ChangePassword
            userId={customerId}
            phoneNumber={cusotmerPhoneNumber}
            setOpenChangePassword={setOpenChangePassword}
          />
        </Modal>

        
          <Modal
            title={t("add_service")}
            centered
            open={openAddService}
            onOk={() => setOpenAddService(false)}
            okButtonProps={{
              style: { display: "none", backgroundColor: "#4096ff" },
            }}
            onCancel={() => setOpenAddService(false)}
            width={1000}
          >
            <CustomerDetails
              id={customerId}
              setOpen={setOpenAddService}
              locale={locale}
            />
          </Modal>
         
      </div>
    </div>
  );
}

export default CustomerList;
