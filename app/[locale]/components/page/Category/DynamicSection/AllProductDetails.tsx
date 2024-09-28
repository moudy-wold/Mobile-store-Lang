"use client";
import { useTranslation } from "@/app/i18n/client";
import { useEffect, useState } from "react";
type Props = {
  data: any;
  locale: LocaleProps | string;
};
function AllProductDetails({ data, locale }: Props) {
  const { t } = useTranslation(locale, "common");
  const [arrayOfObjects, setArrayOfObjects] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      let newArrayOfObjects: any[] = [];
      for (let key in data.details) {
        let newObject: any = { label: key, value: data.details[key] };
        newArrayOfObjects.push(newObject);
      }
      setArrayOfObjects(newArrayOfObjects);
    }
  }, []);
  return (
    <div>
      <table className="w-full">
        <thead className="bg-[#eee] border-2 border-[#f6f6f6]">
          <tr className=" ">
            <th colSpan={2} className="text-xl lg:text-xl font-bold p-3 ">
              {t("specifications")}
            </th>
          </tr>
        </thead>
        <tbody className="">
          {arrayOfObjects.map((item) => {
            const values = item?.value?.content?.includes("|")
              ? item.value?.content?.split("|")
              : [item.value.content];
            return (
              <>
                {item.value.title !== "" && (
                  <tr className="bg-white" key={item.id}>
                    <td className="w-1/4 p-2 px-5 text-lg lg:text-xl text-[#006496] border-2 border-[#eee]">
                      {item.value.title}
                    </td>
                    <td className="p-2 text-base lg:text-lg border-2 border-[#eee]">
                      {values.map((value: any, index: number) => {
                        const rep = value?.trim().replace("!", "");
                        return (
                          <span
                            key={index}
                            className="m-1 p-2 text-black rounded "
                          >
                            {rep}
                          </span>
                        );
                      })}
                      {/* {item.value} */}
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default AllProductDetails;
