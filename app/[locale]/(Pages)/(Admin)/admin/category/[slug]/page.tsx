import React from "react";
import dynamic from 'next/dynamic'

const ProductsList = dynamic(() => import("@/app/[locale]/components/page/Admin/Category/CrudProducts/ProductsList"), { ssr: false })
type Props = {
  params: { locale: string; slug: string };
};

function Page({ params: { locale, slug } }: Props) {
  return (
    <div className="!w-[390px] sm:!w-[640px] md:!w-[768px] lg:!w-full ">
      <ProductsList path={slug} locale={locale} />
    </div>
  );
}

export default Page;
