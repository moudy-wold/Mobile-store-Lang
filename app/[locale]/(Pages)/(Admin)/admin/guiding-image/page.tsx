import React from "react";
import GuidingImage from "@/app/[locale]/components/page/Admin/GuidingImage/PageContent";
import { GetGuidingImage } from "@/app/[locale]/api/guidingImage";
async function Page() {
  const data = await GetGuidingImage();

  return (
    <div className="">
      <GuidingImage data={data.data} />
    </div>
  );
}

export default Page;
