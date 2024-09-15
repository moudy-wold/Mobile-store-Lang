import React from "react";
import {GetTicketById} from "@/app/[locale]/api/ticket"
import Ticket from "@/app/[locale]/components/page/Admin/Support/Ticket/PageContent"
type Props = {
    params: { id: string };
};
async function Page ({params : {id}}:Props){
    const data : any = await GetTicketById(id);
    
    return (
        <div className="">
            <Ticket data={data.data?.data} id={id}/>
        </div>
    )
}
export default Page