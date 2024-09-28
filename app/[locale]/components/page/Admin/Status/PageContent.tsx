"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Space, Table, Modal, Button, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { DeleteStatus } from "@/app/[locale]/api/status";

import { useDispatch } from "react-redux";
import EditStatus from "./edit/editStatus";
import CreateStatus from "./create/createStatus";
import { useTranslation } from "@/app/i18n/client";
type Props = {
  data: {
    image: any;
    _id: number;
    description: string;
    title: string;
  }[];
};
function PageContent({ data, locale }: any) {
  const { t } = useTranslation(locale, "common");

  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openAddStatus, setOpenAddStatus] = useState(false);
  const [openEditeStatus, setOpenEditeStatus] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");

  const columns: ColumnsType<any> = [
    {
      title: t("title"),
      dataIndex: "title",
      key: "title",
      render: (_, record) => (
        <Space size="middle">
          <a>{record.title}</a>
        </Space>
      ),
    },
    {
      title: t("iamge"),
      dataIndex: "iamge",
      key: "iamge",
      render: (_, record) => (
        <Space size="middle">
          <Image
            src={record.image}
            width={100}
            height={100}
            alt={record.title}
          />
        </Space>
      ),
    },
    {
      title: t("description"),
      dataIndex: "description",
      key: "description",
      render: (_, record) => (
        <Space size="middle">
          <a>{record.description}</a>
        </Space>
      ),
    },
    {
      title: t("actions"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <CiEdit
              onClick={() => {
                setOpenEditeStatus(true);
                setId(record.id);
              }}
            />
          </a>
          <a>
            <RiDeleteBinLine
              onClick={() => {
                setOpenDelete(true);
                setId(record.id);
              }}
            />
          </a>
        </Space>
      ),
    },
  ];

  const tableData = data?.data?.data?.map((status: any) => ({
    id: status._id,
    image: status.image,
    title: status.title,
    description: status.description,
  }));
  const hideModalAndDeleteItem = () => {
    setIsLoading(true);
    setOpenDelete(false);
    DeleteStatus(id)
      .then((res) => {
        if (res.status == 200) {
          notification.success({
            message: t("deleted_status_successfully"),
          });
          router.refresh();
        }
      })
      .catch((err) => {
        notification.error({
          message: err.response.data.error.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
        setOpenDelete(false);
      });
  };
  return (
    <div className="">
      {isLoading && <Loader />}
      <div className="my-5 mb-8">
        <div className="">
          <Button
            className="flex items-center"
            onClick={() => {
              setOpenAddStatus(true);
            }}
          >
            <span className="">{t("add_status")} </span>{" "}
            <CiCirclePlus className="mr-1" />
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={tableData} />

      <div>
        <Modal
          title={t("add_status")}
          open={openAddStatus}
          onCancel={() => setOpenAddStatus(false)}
          okText={t("confirm")}
          cancelText={t("close")}
          okButtonProps={{
            style: { display: "none", backgroundColor: "#4096ff" },
          }}
        >
          <CreateStatus locale={locale} />
        </Modal>
      </div>

      <Modal
        title={t("edit_status")}
        open={openEditeStatus}
        onCancel={() => setOpenEditeStatus(false)}
        okText={t("confirm")}
        cancelText={t("close")}
        okButtonProps={{
          style: { display: "none", backgroundColor: "#4096ff" },
        }}
      >
        <EditStatus
          locale={locale}
          id={id}
          setOpenEditeStatus={setOpenEditeStatus}
        />
      </Modal>

      <div>
        <Modal
          title={t("delete_status")}
          open={openDelete}
          onOk={hideModalAndDeleteItem}
          onCancel={() => setOpenDelete(false)}
          okText={t("confirm")}
          cancelText={t("close")}
          okButtonProps={{ style: { backgroundColor: "#4096ff" } }}
        >
          <p>{t("are_you_sure_you_want_to_delete_status")}</p>
        </Modal>
      </div>
    </div>
  );
}

export default PageContent;
