import React from 'react'
import {GetCustomerById} from "@/app/[locale]/api/customer";
import CustomerPage from '@/app/[locale]/components/page/User-Profile/CustomerPage/PageContent';
 

type Props = {
  params: {locale:string, id: string };
};
async function Page({ params: {locale, id } }: Props) {
       const data = await GetCustomerById(id);
  return (
    <div> 
      <CustomerPage  data={data?.data?.data} customerIdFromServer={id} locale={locale}  />
    </div>
  )
} 

export default Page
