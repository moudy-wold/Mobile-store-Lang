"use client";
// import { SendMessage } from '@/api/message';
// import React, { useEffect, useState } from 'react'
// import { IoMdSend } from "react-icons/io";
// import { io } from "socket.io-client";
// import { useDispatch, useSelector } from "react-redux";
// import { setCurrentMsg, setSendedtMsg } from '@/lib/todosSlice';

// import Cookies from 'js-cookie';


// type ObjProps = {
//   receiver: string,
//   message: string
// }
function MessagefForm() {

  
//   const dispatch = useDispatch();
//   // const [socket, setSocket] = useState<any>();
//   const { talker } = useSelector((state: any) => state.counter)
//   const { currentMsg } = useSelector((state: any) => state.counter)
//   const [messageText, setMessageText] = useState("");
//   const [obj, setObj] = useState({});
//   let token = Cookies.get("token");
//   const socket = io("https://mobilestore-vwav.onrender.com/api/messages", {transports: ["websocket"],extraHeaders: {authorization: `bearer ${token}`}});


//   useEffect(() => {
//     // استماع للرسائل الواردة
//     socket.on("recive-msg", (message) => {
//       console.log(message)
//     });

//     // استماع للأخطاء
//     socket.on("error", (error) => {
//       console.log(error);
//     });

//     // تسجيل الغاء الاشتراك عندما يتم إزالة المكون
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const onFinish = async (e: any) => {
//     e.preventDefault();
//     { messageText != "" && dispatch(setCurrentMsg(messageText)) }    
//     socket.emit("msg", obj)
//     setMessageText("")  
//     dispatch(setSendedtMsg(true))      
//   };

//   useEffect(() => {
//     setObj((prev) => ({ ...prev, receiver: talker._id }))
//   }, [talker])

  return (
    <div className="" >
{/* 
      <div className="p-2">
        <form onSubmit={(e) => onFinish(e)} className="grid grid-cols-[92%_5%] gap-1 lg:gap-1 items-center ">
          <input className="!rounded-[8px] p-[6px] text-lg outline-none border-[2px] border-gray-300 " placeholder="أكتب رسالة..." value={messageText} onChange={(e: any) => { setObj(prev => ({ ...prev, message: e.target.value })); setMessageText(e.target.value) }} />

          <div className="">
            <button
              type="submit" className={`p-2 rounded-full flex items-center justify-center ${messageText ? "text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496]" : "text-white bg-gray-200 cursor-no-drop"}`}
            >
              <IoMdSend />
            </button>
          </div>
        </form>
      </div> */}
    </div>
  )
}

export default MessagefForm
