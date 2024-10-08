"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { useRouter } from "next/navigation";
import { DeleteService, EditeStatusServiceById, } from "@/app/[locale]/api/services";
import { DeleteServiceEmployee, EditeStatusServiceByIdEmployee } from "@/app/[locale]/api/ForEmployee";
import { Modal, Space, notification } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { IoPrintOutline } from "react-icons/io5";
import { MdOutlineDoneOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { GiFlowerStar } from "react-icons/gi";
import { useTranslation } from "@/app/i18n/client";
import { ServiceStatusList } from "@/app/[locale]/utils/constant";
import dynamic from "next/dynamic";

const CustomerDetails = dynamic(() => import("@/app/[locale]/components/page/Admin/Customer/CreateCustomer/CustomerDetails"))
const ChangePassword = dynamic(() => import("@/app/[locale]/components/page/Admin/Customer/CustomerList/ChangePassword/ChangePassword"))

function CustomerPage({ data, customerIdFromServer, locale }: any) {
  const { t } = useTranslation(locale, "common");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openActiveService, setOpenActiveService] = useState(false);
  const [openDeleteService, setOpenDeleteService] = useState(false);
  const [servicesData, setServicesData] = useState([]);
  const [openAddService, setOpenAddService] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [img, setImg] = useState("");
  const [openPrint, setOpenPrint] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [cusotmerPhoneNumber, setCusotmerPhoneNumber] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [userRole, setUserRole] = useState("");

  const [obj, setObj] = useState({});

  useEffect(() => {
    const user: any = localStorage.getItem("userRole");

    if (user != undefined) {
      setUserRole(JSON.parse(user));
    }

    setServicesData(data?.Services);
  }, []);

  const handleChangeServicesStatus = async (
    serviceId: string,
    status: string
  ) => {
    setIsLoading(true);

    if (userRole == "admin") {
      EditeStatusServiceById(serviceId, customerIdFromServer, status)
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
    } else {
      EditeStatusServiceByIdEmployee(serviceId, customerIdFromServer, status)
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
    }
  };

  // Delete Service
  const hideModalAndDeleteService = () => {
    setIsLoading(true);
    setOpenDeleteService(false);
    if (userRole == "admin") {
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
    } else {
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
    }
  };

  const customerDataToShow = [
    {
      key: "1",
      id: data._id,
      name: data?.userName,
      phoneNumber: data?.phoneNumber,
    },
  ];

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
      title: t("actions"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {userRole === "admin" || userRole === "employee" ? (
            <>
              <a href={`/${userRole}/customer/edit/${record.id}`}>
                <CiEdit />
              </a>
              <a>
                <RiDeleteBinLine
                  onClick={() => {
                    setOpenDelete(true);
                    setCustomerId(record.id);
                  }}
                />
              </a>
              <a>
                <CiCirclePlus
                  onClick={() => {
                    setCustomerId(record.id);
                    setOpenAddService(true);
                  }}
                  className="text-xl"
                />
              </a>
              <span
                className="hover:text-[#006496] cursor-pointer hover:scale-110 transition-all duration-200"
                onClick={() => {
                  setCustomerId(record.id);
                  handlePrint();
                }}
              >
                <IoPrintOutline className="text-xl" />{" "}
              </span>
              {userRole === "admin" && (
                <span
                  className="hover:text-[#006496] cursor-pointer hover:scale-110 transition-all duration-200"
                  onClick={() => {
                    setCustomerId(record.id);
                    setOpenChangePassword(true);
                    setCusotmerPhoneNumber(record.phoneNumber);
                  }}
                >
                  <GiFlowerStar />
                </span>
              )}
            </>
          ) : (
            <>{userRole}</>
          )}
        </Space>
      ),
    },
  ];

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
              handleChangeServicesStatus(record._id, e.target.value);
              setServiceId(record._id);
            }}
            style={{ width: "100%" }}
            className="w-full border-2 border-gray-200 rounded-lg h-12"
            disabled={
              userRole == "admin" || userRole == "employee" ? false : true
            }
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
      title: t("waranti_uration"),
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
          {userRole == "admin" || userRole == "employee" ? (
            <>
              <a href={`/${userRole}/customer/service/edit/${record._id}`}>
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
            </>
          ) : (
            <>{userRole}</>
          )}
        </Space>
      ),
    },
  ];
  const activeServices = servicesData.filter((f: any) => {
    return f.serviceStatus != "done";
  });

  return (
    <div className="container">
      {isLoading && <Loader />}
      <div>
        <Table columns={columns} dataSource={customerDataToShow} />
      </div>
      <div className="mt-10 border-2 border-gray-300 rounded-lg p-5">
        <h2 className="">{t("active_services")}</h2>
        <Table
          columns={serviceColumns}
          dataSource={activeServices}
          scroll={{ x: 500 }}
        />
      </div>

      <div className="mt-10 border-2 border-gray-300 rounded-lg p-5">
        <h2 className="">{t("services")}</h2>
        <Table
          columns={serviceColumns}
          dataSource={servicesData}
          scroll={{ x: 500 }}
        />
      </div>

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
          locale={locale}
        />
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
  );
}

export default CustomerPage;
