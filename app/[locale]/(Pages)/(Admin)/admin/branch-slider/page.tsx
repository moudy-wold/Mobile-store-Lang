import React from "react";
import Link from "next/link";
import Search from "@/app/[locale]/components/global/Search/SearchUser/SearchUser";
import { CiCirclePlus } from "react-icons/ci";
import { GetBranchSlider } from "@/app/[locale]/api/slider";
import BranchList from "@/app/[locale]/components/page/Admin/Slider/BranchSlider/BranchList/PageContent";
import { Button } from "antd";
import { useTranslation } from "@/app/i18n";

type Props = {
  params: {
    locale: string;
  };
};
async function SliderList({ params: { locale } }: Props) {
  const data = (await GetBranchSlider()).data;
  const { t } = await useTranslation(locale, "common");

  return (
    <div className="!w-[390px] sm:!w-[640px] md:!w-[768px] lg:!w-full ">
      <div className="grid grid-cols-[50%_50%]">
        <div className="flex items-center">
          <Button className="mb-3">
            <Link
              href="/admin/branch-slider/create"
              className="flex items-center justify-beetwen gap-3"
            >
             {t("add_slider")}
             <CiCirclePlus />
            </Link>
          </Button>
        </div>
        <div className="p-4">
          <Search />
        </div>
      </div>
      <BranchList data={data.sliders} pageName="branch" locale={locale} />
    </div>
  );
}

export default SliderList;
