import React from 'react'
import UserProfile  from '@/app/[locale]/components/page/User-Profile/page'
import {GetCustomerByIdForCustomer} from "@/app/[locale]/api/customer";

async function Page({ params: { locale } }: LocaleParams) {
       
  return (
    <div>
      <UserProfile  locale={locale}  />
    </div>
  )
} 

export default Page
