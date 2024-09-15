import React from 'react'
import UserProfile  from '@/app/[locale]/components/page/User-Profile/page'
import {GetCustomerByIdForCustomer} from "@/app/[locale]/api/customer";

async function Page() {
       
  return (
    <div>
      <UserProfile  />
    </div>
  )
} 

export default Page
