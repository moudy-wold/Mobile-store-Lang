import React from "react";
import CreateTicket from "@/app/[locale]/components/page/Admin/Support/Create Ticket/PageContent";
async function Page({ params: { locale } }: LocaleParams) {
  return (
    <div className="">
      <CreateTicket locale={locale} />
    </div>
  );
}

export default Page;
