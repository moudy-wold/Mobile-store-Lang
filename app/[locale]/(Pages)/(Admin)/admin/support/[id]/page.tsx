import React from "react";
import { GetTicketById } from "@/app/[locale]/api/ticket"
import dynamic from 'next/dynamic'

const Ticket = dynamic(() => import("@/app/[locale]/components/page/Admin/Support/Ticket/PageContent"), { ssr: false })
type Props = {
    params: { locale: string, id: string };
};
async function Page({ params: { locale, id } }: Props) {
    const data = await GetTicketById(id);

    return (
        <div className="">
            <Ticket data={data.data?.data} id={id} locale={locale} />
        </div>
    )
}
export default Page