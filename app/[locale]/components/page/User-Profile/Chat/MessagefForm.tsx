"use client";
// import { SendMessage } from '@/api/message';
// import { notification } from 'antd';
// import React, { useEffect, useState } from 'react' 
// import { IoMdSend } from "react-icons/io";
// import { io } from "socket.io-client";
// import { useDispatch, useSelector } from "react-redux";
// import { setCurrentMsg } from '@/lib/todosSlice';
// import Cookies from 'js-cookie';
 

function MessagefForm() {
//   const dispatch = useDispatch();
//   //  const [socket ,setSocket ] = useState<any>();
 
//   const {currentMsg} = useSelector((state:any)=>state.counter)
//   const [messageText, setMessageText] = useState("");
  
//   const [obj, setObj] = useState({receiver: "65abfe9d0c89cba45c3be6ba"});
//   let token = Cookies.get("token");
//   const socket = io("https://mobilestore-vwav.onrender.com/api/messages", {transports: ["websocket"],extraHeaders: {authorization: `bearer ${token}`}});
//   // setObj((prev) => ({ ...prev, receiver: "65abfe9d0c89cba45c3be6ba" }));
  

//   const onFinish = async (e:any) => {
//     e.preventDefault();    
//     {messageText != "" && dispatch(setCurrentMsg(messageText)) }
//     socket.emit("msg", obj)                   
//     setMessageText("")    
//     socket.connect();
//     socket.on('error', (err:any) => console.log('error', err));
//     socket.on('connect', () => console.log('connect'));
//   };
//   socket.on("msg-received", (data:any) => {console.log("تم إرسال الرسالة بنجاح:", data); });

  
  return (
    <div className="" >
{/* //       <div className="p-2 ">
//         <form onSubmit={(e) => onFinish(e)} className="grid grid-cols-[92%_5%] sm:grid-cols-[95%_5%] gap-1 items-center ">
//           <input className="!rounded-[8px] p-[6px] text-lg outline-none border-[2px] border-gray-300 " placeholder="أكتب رسالة..." value={messageText} onChange={(e: any) => { setObj(prev => ({ ...prev, message: e.target.value })); setMessageText(e.target.value) }} />

//           <div className="">
//             <button
//               type="submit" className={`p-2 rounded-full flex items-center justify-center ${messageText ? " text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496]" : "text-white bg-gray-200 cursor-no-drop pointer-events-none"}`}
//             >
//               <IoMdSend />
//             </button>
//           </div>
//         </form>
//       </div> */}
    </div>
  )
}

export default MessagefForm
