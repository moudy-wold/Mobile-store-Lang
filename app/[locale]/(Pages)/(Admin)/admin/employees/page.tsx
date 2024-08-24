import PageContent from "@/app/[locale]/components/page/Admin/Employee/EmployeeList/PageContent";
import React from "react";
import {GetAllEmployees} from "@/api/employees"

async function AdminList() {
  
  
   
  const data = await GetAllEmployees()
  return (
    <div className="!w-[390px] sm:!w-[640px] md:!w-[768px] lg:!w-full " >   
      <PageContent data={data.data.data} />
    </div>
  )
}

export default AdminList
