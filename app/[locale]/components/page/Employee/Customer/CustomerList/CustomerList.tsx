"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import SearchUser from "@/app/[locale]/components/global/Search/SearchUser/SearchUser";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  DeleteServiceEmployee,
  EditeStatusServiceByIdEmployee,
  GetAllServiceEmployee,
  DeleteCustomerEmployees,
  GetAllCustomerEmployees,
} from "@/app/[locale]/api/ForEmployee";
import moment from "moment";
import { Space, Table, Modal, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { MdOutlineDoneOutline } from "react-icons/md";
import { IoChatbubblesOutline, IoPrintOutline } from "react-icons/io5";
import { ServiceStatusList } from "@/app/[locale]/utils/constant";
import { useTranslation } from "@/app/i18n/client";

import dynamic from "next/dynamic";

const CustomerDetails = dynamic(() => import("../CreateCustomer/CustomerDetails"))

 
 
function CustomerList({ locale }: LocaleProps) {
  const { t } = useTranslation(locale, "common");

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
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [data, setData] = useState([]);

  const handlePageChange = async (page: any) => {
    setPage(page + 1);
    setIsLoading(true);
    try {
      const res = await GetAllCustomerEmployees(page);
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
      // const res = await GetAllCustomer(skip, limit);
      const res = await GetAllCustomerEmployees();
      setCurrentPage(res.data.pagination.current_page);
      setTotalItems(res.data.pagination.total);
      setPageSize(res.data.pagination.per_page);
      setData(res.data.customers);
    };
    getData();
  }, []);

  const handleFetchService = (id: string) => {
    setIsLoading(true);
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
  };
  // Edit Stuts Serivce
  const EditStatusServiceFun = async (serviceId: string, status: string) => {
    setIsLoading(true);

    let customerId: any = localStorage.getItem("customerId");

    EditeStatusServiceByIdEmployee(serviceId, customerId, status)
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
        console.log(err);
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
    DeleteCustomerEmployees(customerId)
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
    DeleteServiceEmployee(serviceId)
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
    setIsLoading(true);
    import('qrcode')
      .then(QRCode => {
        QRCode.toDataURL(`https://mobilestore-vwav.onrender.com/app/user-profile/${customerId}`)
          .then(url => {
            setImg(url);
            setOpenPrint(false);
            setIsLoading(false);
          })
          .catch(err => {
            console.error(err);
            setIsLoading(false);
          });
      })
      .catch(err => {
        console.error('Failed to load QRCode module', err);
        setIsLoading(false);
      });
  };
  //  Customers Table
  const columns: ColumnsType<any> = [
    {
      title: t("customer_name"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("phone_number"),
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
          <a href={`/employee/customer/edit/${record._id}`}>
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
          <a href={`/employee/message`}>
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
      title: t("serviceStatus"),
      dataIndex: "service_status",
      key: "serviceStatus",
      width: "180px",
      render: (_, record) => (
        <Space size="middle">
          <select
            onChange={(e) => {
              EditStatusServiceFun(record._id, e.target.value);
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
                      {t(item.label)}
                    </option>
                  ) : (
                    <option value={item.value} key={index}>
                      {t(item.label)}
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
      dataIndex: "createdAt",
      key: "createdAt",
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
      return f.status !== "done";
    }),
  }));

  return (
    <div>
      {isLoading && <Loader />}
      <div className="grid grid-cols-[50%_50%] items-center px-4 lg-px-0">

        <div className="">
          <button className="border-2 border-gray-300 rounded-lg p-1 pr-2">
            <Link
              href="/employee/customer/create"
              className="flex items-center justify-beetwen text-xl"
            >
              {t("add_customer")} <CiCirclePlus className="mr-2" />
            </Link>
          </button>
        </div>

        <div className="p-4">
          <SearchUser userRole="employee" locale={locale} />
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
        {img && <Image src={img} width={50} height={50} alt="afdsd" />}

        <Modal
          title={t("services")}
          centered
          width={1000}
          open={openService}
          // onOk={() => onFinish()}
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
          title={t("active_status")}
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
          <p>{t("are_sure_you_want_delete_service")}</p>
        </Modal>

        {openAddService && (
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
              locale={locale}
              id={customerId}
              setOpen={setOpenAddService}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default CustomerList;
