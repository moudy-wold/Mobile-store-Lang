"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import { SendREsponse } from "@/app/[locale]/api/ticket";
import Loader from "@/app/[locale]/components/global/Loader/Loader";
import { useTranslation } from "@/app/i18n/client";

function Ticket({ data, id, locale }: any) {
  const { t } = useTranslation(locale, "common");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [response, setResponse] = useState("");

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setResponse(e.target.value);
  };

  const onFinish = async (e: any) => {
    e.preventDefault();
    if (data?.status == "In Progress") {
      setIsLoading(true);

      try {
        const res = await SendREsponse(id, response);
        console.log(res);
        router.refresh();
        setIsLoading(false);
        setResponse("");
      } catch (err: any) {
        console.log(err.response.data);
        notification.error({
          message: err.response.data?.message,
        });
        setIsLoading(false);
      }
    } else if (data?.status == "Open") {
      notification.error({
        message: t("waiting_for_response_from_support_center"),
      });
    } else {
      notification.error({
        message: t("topic_is_finished"),
      });
    }
  };
  return (
    <div className="">
      {isLoading && <Loader />}
      <div className="">
        {/* Start Subject  */}
        <div className="mx-auto w-[300px]">
          <p className="text-center">{data?.subject} </p>
          <div className="flex items-center justify-between">
            <p className="w-fit bg-[#006496] text-white rounded-lg p-2">
              {data?.status == "Open" && t("under_study")}
              {data?.status == "In Progress" && t("under_processing")}
              {data?.status == "Closed" && t("closed")}
            </p>
            <p className="text-center mt-2">{data?.created_at} </p>
          </div>
        </div>
        {/* End Subject  */}

        {/* Start Description */}
        <div className="text-center text-lg mt-5">{data?.description}</div>
        {/* End Description */}

        {/* Start Show Responses */}
        <div className="">
          {data?.ticket_responses?.map((item: any) => (
            <div
              className={`  border-t-2 border-gray-300 p-5 my-5`}
              key={item?.id}
            >
              <p className="">
                {item.created.includes("Support") && t("from_support")}{" "}
              </p>
              <br />
              <p
                className={` ${
                  item.created.includes("Support") ? "text-start" : "text-end"
                }`}
              >
                {item.response}
              </p>
            </div>
          ))}
        </div>
        {/* End Show Responses */}

        {/* Start Input */}
        <div className="border-t-2 border-gray-300 mt-20 p-5">
          <form onSubmit={onFinish}>
            <textarea
              id="response"
              name="response"
              rows={5}
              cols={33}
              onChange={handleChange}
              value={response}
              className="border-2 border-gray-300 rounded-md p-2 w-full placeholder:text-xl outline-gray-500"
              placeholder={t("leave_your_response_here....")}
              disabled={data?.can_user_response == "1" ? false : true}
            ></textarea>
            <button
              type="submit"
              className={`p-2 px-4 text-lg rounded-lg mt-4 block border-2 border-[#006496] bg-[#006496] text-white ${
                data?.can_user_response == "1"
                  ? "hover:text-[#006496] hover:bg-white "
                  : ""
              } transition-all duration-150`}
            >
              {t("send")}
            </button>
          </form>
        </div>
        {/* End Input */}
      </div>
    </div>
  );
}
export default Ticket;
