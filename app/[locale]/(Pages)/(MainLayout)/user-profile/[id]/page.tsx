import React from 'react'
import {GetCustomerById} from "@/app/[locale]/api/customer";
import CustomerPage from '@/app/[locale]/components/page/User-Profile/CustomerPage/PageContent';
 

type Props = {
  params: { id: string };
};
async function Page({ params: { id } }: Props) {
       const data = await GetCustomerById(id);
  return (
    <div> 
      <CustomerPage  data={data?.data?.data} customerIdFromServer={id}/>
    </div>
  )
} 

export default Page
