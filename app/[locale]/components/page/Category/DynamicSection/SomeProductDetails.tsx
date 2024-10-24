"use client";
import { useTranslation } from "@/app/i18n/client";

type Props = {
  data: any;
  locale: LocaleProps | string;
};

function ProductDetails({ data, locale }: Props) {
  const { t } = useTranslation(locale, "common");

  const onScroll = () => {
    window.scrollTo({ top: 1200, behavior: "smooth" });
  };

  return (
    <div className="h-full mt-2">
      <div className="w-full ">
        <div className="bg-[#f6f6f6]  border-2 border-[#f6f6f6]">
          <div>
            <div className="text-xl p-2 font-semibold mx-auto">
              {t("product_specs")}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[310px] overflow-y-auto p-1 px-2">{data?.description}</div>
      <div className="">
        <button
          onClick={() => onScroll()}
          className="w-full flex items-center justify-center p-4 text-white text-xl lg:text-xl bg-[#006496] hover:bg-[#004169] rounded-md lg:mt-3 mx-auto"
        >
          {t("view_more")}
        </button>
      </div>
    </div>
  );
}
export default ProductDetails;
