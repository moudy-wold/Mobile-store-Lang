import React from "react";
import PageContent from "@/app/[locale]/components/page/Employee/Customer/DynamicCustomerPAge/PageContent"
import { GetCustomerByIdEmployees } from "@/app/[locale]/api/ForEmployee";

type Props = {
    params: { id: string };
};
export default async function Page({ params: { id } }: Props) {    
    const data = await GetCustomerByIdEmployees(id);
    return (
        <div>
            <PageContent data={data.data} />
        </div>
    )
}