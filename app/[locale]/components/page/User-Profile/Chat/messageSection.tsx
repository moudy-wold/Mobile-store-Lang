"use client";
import React, { useEffect, useRef, useState } from "react";
import MessagefForm from "./MessagefForm";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setTalker,setTalkerMsgs,setCurrentMsg } from "@/app/[locale]/lib/todosSlice";
import { GetMessage } from "@/app/[locale]/api/message";
import moment from "moment";
type Props = {
  Talker: {
    _id: string;
    userName: string;
    phoneNumber: string;
    message: string[];
    role: string;
    timestamp: string;
    unseen: number;
    createdAt: string;
  }
};
function MessageSection() {
  const dispatch = useDispatch();
  const talkerMsgs = useSelector((state: any) => state.counter.talkerMsgs)
  const {talker} = useSelector((state: any) => state.counter)
  const {currentMsg} = useSelector((state:any) => state.counter)
  const [data, setData] = useState<any>([])
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    
    const getData = async () => {
      // const res = await GetMessage("65d9d05b1c651d58226c1a20")      //admin
      // const res = await GetMessage("65abfe9d0c89cba45c3be6ba")      //customer
      // const res = await GetMessage()      //customer
      // dispatch(setTalkerMsgs(res.data.data))
      // setData(res.data.data)
      // dispatch(setCurrentMsg(""))
 
    }
     getData()

  }, [currentMsg])
  
  return (
    <div className="h-[91vh] lg:h-[68vh]">
      <div className={`bg-[url('/chat-background.jpg')] w-full h-[95%] pb-2`}>
        
       
          <div className=" h-[99%]" ref={itemRef}>

            {/* for messages */}
            <div className="h-[89%] lg:h-[90%] py-3 px-1 overflow-y-scroll">
              {/* <div className="flex items-center justify-start"><p className={`bg-white border-[1px] border-gray-300 rounded-xl p-1 lg:py-0 px-3 lg:px-2 text-xl `}><span className="text-[9px] lg:text-[7px] mr-3">11:52</span><span className="">sad</span> </p></div>
                <div className="flex items-center justify-end"><p className={`bg-white border-[1px] border-gray-300 rounded-xl p-1 lg:py-0 px-3 lg:px-2 text-xl `}><span className="">sad</span><span className="text-[9px] lg:text-[7px] ml-3">11:52</span> </p></div> */}
              {talkerMsgs?.map((mes: any) => (
                <div key={mes._id} className="mt-3  overflow-wrap break-word flex items-center justify-end">
                  <p className={`bg-white border-[1px] border-gray-300 rounded-xl p-1 lg:py-0 px-3 lg:px-2 text-xl overflow-wrap break-word`}>
                  <span className="text-[9px] lg:text-[9px] mr-3">{moment(mes.createdAt).format('HH:mm')}</span>
                  <span className="">{mes.message}</span> </p>
                </div>
              ))}
              {currentMsg != "" &&
                <div className="mt-3  overflow-wrap break-word flex items-center justify-end">
                <p className={`bg-white border-[1px] border-gray-300 rounded-xl p-1 lg:py-0 px-3 lg:px-2 text-xl overflow-wrap break-word`}>
                <span className="">{currentMsg}</span> </p>
              </div>
              }
            </div>
            {/*admin 65abfe9d0c89cba45c3be6ba */}
            {/* for input send */}
            <div className="mb-2">
            <MessagefForm />
            </div>
          </div>
       
      </div>
    </div>
  )
}

export default MessageSection;