import HomePage from "@/app/[locale]/components/page/Employee/HomePage";
import React from "react";

async function Page({ params: { locale } }: LocaleParams) {

  return (
    <div className=" ">
      <HomePage  locale={locale} />
    </div>
  );
}

export default Page;
