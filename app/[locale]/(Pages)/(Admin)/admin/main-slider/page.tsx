import React from "react";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
import { GetMainSlider } from "@/app/[locale]/api/slider";
import MainSliderList from "@/app/[locale]/components/page/Admin/Slider/MainSlider/MainList/PageContent";
import { Button } from "antd";
import { useTranslation } from "@/app/i18n"; // استيراد الترجمة

// هذا المكون سيعمل على السيرفر مباشرة
async function SliderList({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await useTranslation(locale, "common"); // تحميل الترجمة بناءً على locale

  // جلب البيانات من الـ API
  const data = (await GetMainSlider()).data;

  return (
    <div className="!w-[390px] sm:!w-[640px] md:!w-[768px] lg:!w-full ">
      <div className="grid grid-cols-[50%_50%]">
        <div className="flex items-center">
          <Button className="mb-3">
            <Link
              href="/admin/main-slider/create"
              className="flex items-center justify-between gap-3"
            >
              {t("add_slider")}
              <CiCirclePlus />
            </Link>
          </Button>
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <MainSliderList data={data.sliders} pageName="main" locale={locale} />
      </div>
    </div>
  );
}

export default SliderList;
