import React from "react";
import PageContent from "@/app/[locale]/components/page/Admin/Customer/DynamicCustomerPAge/PageContent"
import { GetCustomerById } from "@/app/[locale]/api/customer";

type Props = {
    params: { id: string };
};
export default async function Page({ params: { id } }: Props) {

    
    const data = await GetCustomerById(id);
    return (
        <div>
            <PageContent data={data.data} />
        </div>
    )
}