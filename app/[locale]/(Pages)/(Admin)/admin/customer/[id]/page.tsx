import React from "react";
import { GetCustomerById } from "@/app/[locale]/api/customer";
import dynamic from 'next/dynamic'

const PageContent = dynamic(() => import("@/app/[locale]/components/page/Admin/Customer/DynamicCustomerPAge/PageContent"), { ssr: false })
type Props = {
    params: { locale: string, id: string };
};
export default async function Page({ params: { locale, id } }: Props) {


    const data = await GetCustomerById(id);
    return (
        <div>
            <PageContent data={data.data} locale={locale} />
        </div>
    )
}