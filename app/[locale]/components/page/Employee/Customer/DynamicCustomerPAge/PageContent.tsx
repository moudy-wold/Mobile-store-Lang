"use client";
import {
  EditeServiceByIdEmployee,
  GetAllServiceEmployee,
} from "@/app/[locale]/api/ForEmployee";
import { Space, notification } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { IoChatbubblesOutline } from "react-icons/io5";
import { MdOutlineDoneOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { useRouter } from "next/navigation";
import { ServiceStatusList } from "@/app/[locale]/utils/constant";
import { useTranslation } from "@/app/i18n/client";

function PageContent({ data, locale }: any) {
  const { t } = useTranslation(locale, "common");

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [openActiveService, setOpenActiveService] = useState(false);
  const [openDeleteService, setOpenDeleteService] = useState(false);
  const [servicesData, setServicesData] = useState([]);
  const [openAddService, setOpenAddService] = useState(false);
  const [id, setId] = useState("");
  const [obj, setObj] = useState({});

  useEffect(() => {
    setServicesData(data?.services);
  }, []);

  const customerDataToShow = [
    { key: "1", name: data?.userName, phoneNumber: data?.phoneNumber },
  ];
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
      title: t("actions"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href={`/empolyee/customer/edit/${record._id}`}>
            <CiEdit />
          </a>
          <a>
            <RiDeleteBinLine
              onClick={() => {
                setOpenDelete(true);
                setId(record._id);
              }}
            />
          </a>
          <a>
            <CiCirclePlus
              onClick={() => {
                setOpenAddService(true);
                setId(record._id);
              }}
              className="text-xl"
            />
          </a>
          <a href={`/empolyee/message`}>
            <IoChatbubblesOutline
              onClick={() => {
                setId(record._id);
              }}
              className="text-xl"
            />
          </a>
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
      title: t("serviceStatus"),
      dataIndex: "serviceStatus",
      key: "serviceStatus",
      width: "180px",
      render: (_, record) => (
        <Space size="middle">
          <select
            onChange={(e) => {
              setObj((prevState) => ({
                ...prevState,
                serviceStatus: e.target.value,
              }));
              setId(record._id);
            }}
            style={{ width: "100%" }}
            className="w-full border-2 border-gray-200 rounded-lg h-12"
          >
            {ServiceStatusList.map((item) => (
              <>
                {item.value == record.serviceStatus ? (
                  <option value={item.value} key={item.id} selected>
                    {t(item.label)}
                  </option>
                ) : (
                  <option value={item.value} key={item.id}>
                    {t(item.label)}
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
          <a href={`/empolyee/customer/service/edit/${record.id}`}>
            <CiEdit />
          </a>
          <a>
            <RiDeleteBinLine
              onClick={() => {
                setOpenDeleteService(true);
                setId(record.id);
              }}
            />
          </a>
        </Space>
      ),
    },
  ];
  const activeServices = servicesData.filter((f: any) => {
    return f.serviceStatus != "done";
  });

  const onFinish = () => {
    setIsLoading(true);
    EditeServiceByIdEmployee(id, "2", obj)
      .then((res) => {
        if (res.data.success) {
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
          message: err.response.data.error.errors.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      {isLoading && <Loader />}
      <div>
        <Table columns={columns} dataSource={customerDataToShow} />
      </div>
      <div className="mt-10">
        <h2 className="">{t("active_services")}</h2>
        <Table
          columns={serviceColumns}
          dataSource={activeServices}
          scroll={{ x: 500 }}
        />
      </div>
      <button
        onClick={() => {
          onFinish();
        }}
        className="px-4 py-2 bg-[#006496] text-white rounded-2xl hover:bg-white hover:text-[#006496] text-lg transition-all duration-200"
      >
        {t("save_changes")}
      </button>

      <div className="mt-10">
        <h2 className="">{t("services")}</h2>
        <Table
          columns={serviceColumns}
          dataSource={servicesData}
          scroll={{ x: 500 }}
        />
      </div>
    </div>
  );
}

export default PageContent;
