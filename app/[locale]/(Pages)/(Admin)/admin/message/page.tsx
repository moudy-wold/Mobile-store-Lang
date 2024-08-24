import { GetUsers } from "@/app/[locale]/api/message";
import PageContent from "@/app/[locale]/components/page/Admin/Message/PageContent";
import React from "react";
 
async function Message() {
 
  const users = await GetUsers();
  return (
    <div>
      <PageContent users={users.data.data} />
    </div>
  );
}

export default Message;
