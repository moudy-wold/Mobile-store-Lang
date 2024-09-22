
type Props = {
  data: any;
};
function AllProductDetails({ data }: Props) {
  const table = [
    {id:data?._id, lablel: "الشاشة", value: data?.details.screen },
    {id:data?._id, lablel: "نوع الشاشة", value: data?.details.screenType },
    {id:data?._id, lablel: "الذاكرة", value: data?.details.memory },
    {id:data?._id, lablel: "الكاميرا", value: data?.details.camera },
    {id:data?._id, lablel: "البطارية", value: data?.details.battery },
    {id:data?._id, lablel: "الرام", value: data?.details.ram },
    {id:data?._id, lablel: "الشركة", value: data?.details.brand },
    {id:data?._id, lablel: "الشبكة", value: data?.details.network },
    {id:data?._id, lablel: "عدد الشرائح", value: data?.details.numberOfSim },
    {id:data?._id, lablel: "نظام التشغيل", value: data?.details.operatingSystem },
    {id:data?._id, lablel: "مدخل السماعات", value: data?.details.headPhonePort }
  ]
  return (
    <div>
        <table className="w-full">
        <thead className="bg-[#eee] border-2 border-[#f6f6f6]">
          <tr className=" ">
            <th colSpan={2} className="text-xl lg:text-xl font-bold p-3 ">
              المواصفات
            </th>
          </tr>
        </thead>
        <tbody className="">
          {table.map((item) => (
            <tr className="bg-white" key={item.id}>
              <td className="p-2 px-5 text-lg lg:text-xl text-[#006496] border-2 border-[#eee]">
                {item.lablel}
              </td>
              <td className="p-2 text-base lg:text-lg border-2 border-[#eee]">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>    
    </div>
  );
}
export default AllProductDetails;
