import React from "react";
import CartContent from "@/app/[locale]/components/page/Admin/Cart/PageContent";


async function Page({ params: { locale } }: LocaleParams) {
  return (
    <div>
      <CartContent locale={locale} />
    </div>
  );
}

export default Page;
