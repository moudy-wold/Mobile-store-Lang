"use client";
import React, { useState } from "react";

import Loader from "@/app/[locale]/components/global/Loader/Loader";
import {
  SearchOnUserForAdmin,
  SearchOnUserForEmployee,
} from "@/app/[locale]/api/search";
import { DeleteCustomer } from "@/app/[locale]/api/customer";
import { DeleteCustomerEmployees } from "@/app/[locale]/api/ForEmployee";
import {
  DeleteService,
  EditeStatusServiceById,
  GetAllService,
} from "@/app/[locale]/api/services";
import {
  DeleteServiceEmployee,
  EditeStatusServiceByIdEmployee,
  GetAllServiceEmployee,
} from "@/app/[locale]/api/ForEmployee";
import { Modal, Space, Spin, Table, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CiCirclePlus, CiEdit, CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { RiDeleteBinLine } from "react-icons/ri";
import moment from "moment";
import { MdOutlineDoneOutline } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useTranslation } from "@/app/i18n/client";
import { ServiceStatusList } from "@/app/[locale]/utils/constant";
import dynamic from 'next/dynamic'

const CustomerDetails = dynamic(() => import('@/app/[locale]/components//page/Admin/Customer/CreateCustomer/CustomerDetails'), { ssr: false })
const CustomerDetailsEmpolyee = dynamic(() => import('@/app/[locale]/components/page/Employee/Customer/CreateCustomer/CustomerDetails'), { ssr: false })

type Props = {
  userRole?: string;
  locale: LocaleProps | string;
};

function SearchUser({ userRole, locale }: Props) {
  const { t } = useTranslation(locale, "common");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [openService, setOpenService] = useState(false);
  const [servicesData, setServicesData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [openAddService, setOpenAddService] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSearchData, setOpenSearchData] = useState(false);
  const [id, setId] = useState("");
  const [openDeleteService, setOpenDeleteService] = useState(false);
  const [obj, setObj] = useState({});
  const [openActiveService, setOpenActiveService] = useState(false);
  const [status, setStatus] = useState("");
  const [serviceId, setServiceId] = useState("");

  const onFinish = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (userRole == "employee") {
      try {
        const response = await SearchOnUserForEmployee(value);
        setSearchedData(response.data.customers);
        setOpenSearchData(true);
        setIsLoading(false);
      } catch (err: any) {
        setIsLoading(false);
        notification.error({
          message: err?.response?.data?.message,
        });
      }
    } else {
      try {
        const response = await SearchOnUserForAdmin(value);
        setSearchedData(response.data.customers);
        setOpenSearchData(true);
        setIsLoading(false);
      } catch (err: any) {
        setIsLoading(false);
        notification.error({
          message: err.response.data.message,
        });
      }
    }
  };

  const onFinishServiceStatus = async (serviceId: string, status: string) => {
    setIsLoading(true);
    let customerId: any = localStorage.getItem("customerId");
    if (userRole == "employee") {
      EditeStatusServiceByIdEmployee(serviceId, customerId, status)
        .then((res) => {
          if (res.data.status) {
            notification.success({
              message: t("modified_successfully"),
            });
            setOpenActiveService(true);
          }
          router.refresh();
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
          notification.error({
            message: err.response.data.error.errors.message,
          });
        });
    } else {
      EditeStatusServiceById(serviceId, customerId, status)
        .then((res) => {
          if (res.data.status) {
            notification.success({
              message: t("modified_successfully"),
            });
            setOpenActiveService(true);
          }
          router.refresh();
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
          notification.error({
            message: err.response.data.message,
          });
        });
    }
  };

  const handleFetchService = (id: string) => {
    setIsLoading(true);
    if (userRole == "employee") {
      GetAllServiceEmployee(id)
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
    } else {
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
    }
  };

  const hideModalAndDeleteService = () => {
    setIsLoading(true);
    setOpenDeleteService(false);
    if (userRole == "employee") {
      DeleteServiceEmployee(serviceId)
        .then((res) => {
          if (res.data.status) {
            notification.success({
              message: t("service_has_been_successfully_removed"),
            });
          }
          router.refresh();
        })
        .catch((err) => {
          console.log(err.response);
          notification.error({
            message: err.response.data.message,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      DeleteService(serviceId)
        .then((res) => {
          if (res.data.status) {
            notification.success({
              message: t("maintenance_has_been_successfully_removed"),
            });
          }
          router.refresh();
        })
        .catch((err) => {
          console.log(err.response);
          notification.error({
            message: err.response.data.message,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: t("customer_name"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <a>{text}</a>,
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
            className="border-2 border-gray-400 rounded-xl p-2 hover:bg-gray-100 block text-xs lg:text-xl text-center"
            onClick={() => {
              setOpenService(true);
              handleFetchService(record.id);
            }}
          >
            {t("show_services")} {record?.services?.length}
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
            className="border-2 border-gray-400 rounded-xl p-2 hover:bg-gray-100 block text-xs lg:text-base text-center"
            onClick={() => {
              setOpenActiveService(true);
              handleFetchService(record.id);
            }}
          >
            {t("active_services")} {record?.activeServices?.length}
          </a>
        </Space>
      ),
    },
    {
      title: t("actions"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href={`/admin/customer/edit/${record.id}`}>
            <CiEdit />
          </a>
          <a>
            <RiDeleteBinLine
              onClick={() => {
                setOpenDelete(true);
                setId(record.id);
                setServiceId(record.id);
              }}
            />
          </a>
          <a>
            <CiCirclePlus
              onClick={() => {
                setOpenAddService(true);
                setId(record.id);
              }}
              className="text-xl"
            />
          </a>
          <a href={`/admin/message`}>
            <IoChatbubblesOutline
              onClick={() => {
                setId(record.id);
              }}
              className="text-xl"
            />
          </a>
        </Space>
      ),
    },
  ];

  const dataToShow = searchedData?.map((item: any) => ({
    id: item._id,
    name: item.userName,
    phoneNumber: item.phoneNumber,
    services: item.Services,
    // activeServices: item.services.filter((f: any) => { return f.serviceStatus != "done" })
    activeServices: item.Services?.filter((i: any) => {
      return i.serviceStatus !== "done";
    }),
  }));

  const activeServices = servicesData.filter((f: any) => {
    return f.serviceStatus != "done";
  });
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
            // onChange={(e) => { setObj((prevState) => ({ ...prevState, serviceStatus: e.target.value })); setId(record._id); }}
            onChange={(e) => {
              onFinishServiceStatus(record._id, e.target.value);
              setStatus(e.target.value);
            }}
            style={{ width: "100%" }}
            className="w-full border-2 border-gray-200 rounded-lg h-12"
          >
            {ServiceStatusList.map((item) => (
              <>
                {item.value == record.serviceStatus ? (
                  <option value={item.value} key={item.id} selected>
                    {item.label}
                  </option>
                ) : (
                  <option value={item.value} key={item.id}>
                    {item.label}
                  </option>
                )}
              </>
            ))}
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
      dataIndex: "deliveryDate",
      key: "deliveryDate",
    },
    {
      title: t("actions"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href={`/admin/customer/service/edit/${record.id}`}>
            <CiEdit />
          </a>
          <a>
            <RiDeleteBinLine
              onClick={() => {
                setOpenDeleteService(true);
                setId(record._id);
                setServiceId(record._id);
                console.log(record._id);
              }}
            />
          </a>
        </Space>
      ),
    },
  ];

  const serviceDataToShow = servicesData.map((item: any) => ({
    _id: item._id,
    phoneType: item.phoneType,
    serviceType: item.serviceType,
    serviceCost: item.serviceCost,
    serviceStatus: item.serviceStatus,
    warantiDuration: item.warantiDuration,
    receivedDate: moment(item.createdAt).locale("en").format("DD/MM/YYYY"),
    deliveryDate: moment(item.updatedAt).locale("en").format("DD/MM/YYYY"),
  }));

  const hideModalAndDeleteItem = () => {
    setIsLoading(true);
    setOpenDelete(false);
    if (userRole == "employee") {
      DeleteCustomerEmployees(id)
        .then((res) => {
          if (res.data.status) {
            notification.success({
              message: t("customer_deleted_successfully"),
            });
          }
        })
        .catch((err) => {
          console.log(err.response);
          notification.error({
            message: err.response.data?.error.message,
          });
        })
        .finally(() => {
          setIsLoading(false);
          setOpenDelete(false);
          router.refresh();
        });
    } else {
      DeleteCustomer(id)
        .then((res) => {
          if (res.data.status) {
            notification.success({
              message: t("customer_deleted_successfully"),
            });
          }
        })
        .catch((err) => {
          console.log(err.response);
          notification.error({
            message: err.response.data?.error.message,
          });
        })
        .finally(() => {
          setIsLoading(false);
          setOpenDelete(false);
          router.refresh();
        });
    }
  };

  return (
    <div className="">
      {isLoading && <Loader />}
      <form onSubmit={(e) => onFinish(e)} className="flex items-center w-full ">
        <input
          type="text"
          placeholder={t("search...")}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
          className="outline-none px-2 lg:px-4 lg:py-[10px] border-2 border-solid w-11/12 rounded-s-md text-lg text-[#8c8c8c]"
        />

        <button
          onClick={(e) => {
            onFinish(e);
          }}
          className={`${isLoading ? "bg-white" : "bg-[#006496]"
            } bg-[#006496] w-7 h-7 lg:w-12 lg:h-12 text-xs text-white flex items-center justify-center rounded-e-md border-[2px] border-[#006496]`}
        >
          {isLoading ? (
            <Space size="small">
              <Spin size="small" />
            </Space>
          ) : (
            <CiSearch className="w-7 h-7 lg:font-bold" />
          )}
        </button>
      </form>
      <Modal
        title={t("search_results")}
        open={openSearchData}
        width={1000}
        onOk={() => setOpenSearchData(false)}
        onCancel={() => setOpenSearchData(false)}
        okText={t("close")}
        cancelText={t("cancel")}
        okButtonProps={{ style: { backgroundColor: "#4096ff" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Table columns={columns} dataSource={dataToShow} />
      </Modal>

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
      <Modal
        title={t("services")}
        centered
        width={1000}
        open={openService}
        onOk={() => setOpenService(false)}
        onCancel={() => setOpenService(false)}
        cancelText={t("close")}
        okButtonProps={{ style: { backgroundColor: "#4096ff" } }}
      >
        <Table
          columns={serviceColumns}
          dataSource={serviceDataToShow}
          scroll={{ x: 500 }}
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
        okText="موافق"
        cancelText="إلغاء"
        okButtonProps={{ style: { backgroundColor: "#4096ff" } }}
      >
        <p>{t("are_sure_you_want_delete_service")}</p>
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
        {userRole == "employee" ? (
          <CustomerDetailsEmpolyee
            locale={locale}
            id={id}
            setOpen={setOpenAddService}
          />
        ) : (
          <CustomerDetails id={id} setOpen={setOpenAddService} locale={locale} />
        )}
      </Modal>
    </div>
  );
}
export default SearchUser;
