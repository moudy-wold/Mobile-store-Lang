import React from 'react'
import { MdDone } from 'react-icons/md'

function Page() {
  return (
    <div className="relative">

      <div className="bg-[#006496] h-[30vh]" ></div>
      <div className="bg-[#f1f7fc] h-[70vh]" ></div>
      <div className='w-3/5 p-7 bg-white rounded-lg absolute z-50 top-32 left-1/2 -translate-x-1/2'>
        <h1 className='text-center text-2xl mx-auto'>
          Welcome !
        </h1>
        <div className='mx-auto my-5 w-fit p-3 border-2 border-[#2f9d4180] rounded-lg flex items-center justify-center'>
          <MdDone className="font-bold text-3xl text-[#2f9d4180]" />
        </div>
        <p className='text-center text-2xl font-semibold'>تمت عملية التحقق من الحساب بنجاح </p>
        
      </div>
    </div>
  )
}

export default Page
