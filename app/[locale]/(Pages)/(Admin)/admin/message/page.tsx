import { GetUsers } from "@/app/[locale]/api/message";
import PageContent from "@/app/[locale]/components/page/Admin/Message/PageContent";
import React from "react";
 
async function Page({ params: { locale } }: LocaleParams) {
 
  const users = await GetUsers();
  return (
    <div>
      <PageContent users={users.data.data} locale={locale} />
    </div>
  );
}

export default Page;
