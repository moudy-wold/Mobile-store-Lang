"use client";
import Image from 'next/image';
import Form from './Form';
import { useSelector } from "react-redux";

 function Login({locale}:LocaleProps) {
  const {infoData} = useSelector((state:any) => state.counter)
  
  return (

    <main className="py-5 md:px-9">
      <div className=" bg-no-repeat bg-contain bg-bottom max-lg:pb-44  ">
        <div className="container relative py-5">

          <div className="mb-6 flex justify-center">
            <Image
              src={infoData?.data?.logo}
              width={95}
              height={159}
              alt="logoa"
            />
          </div>

          <div className="max-w-xl mx-auto shadow-xl px-11 py-5 bg-white rounded-md">
            <div className="md:px-5">
              <Form locale={locale}/>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}

export default Login;
