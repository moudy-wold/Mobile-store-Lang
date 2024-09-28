import React from "react";
import GuidingImage from "@/app/[locale]/components/page/Admin/GuidingImage/PageContent";
import { GetGuidingImage } from "@/app/[locale]/api/guidingImage";
async function Page({ params: { locale } }: LocaleParams) {
  const data = await GetGuidingImage();

  return (
    <div className="">
      <GuidingImage data={data.data} locale={locale}  />
    </div>
  );
}

export default Page;
