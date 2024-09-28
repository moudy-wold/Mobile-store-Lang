import PageContent from "@/app/[locale]/components/page/Admin/Employee/EmployeeList/PageContent";
import React from "react";
import {GetAllEmployees} from "@/app/[locale]/api/employees"

async function Page({ params: { locale } }: LocaleParams) {
  
  
   
  const data = await GetAllEmployees()
  return (
    <div className="!w-[390px] sm:!w-[640px] md:!w-[768px] lg:!w-full " >   
      <PageContent data={data.data.data} locale={locale} />
    </div>
  )
}

export default Page
