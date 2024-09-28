import Link from 'next/link';
import { FaLessThan } from "react-icons/fa6";
type Props = {
  title: string;
  breadcrumb: { title: string; url: string; id: number }[];
  locale:LocaleProps | string
};

function PageHero({ title, breadcrumb,locale }: Props) {
  return (
    <div className="p-2 flex items-center">
      <Link href="/">
      <p className=" text-[#8c8c8c] text-xs md:text-xl font-light px-[2px] flex items-center">{title}<FaLessThan className="mx-[8px] mt-[4px] text-xs font-thin text-[#8c8c8c]" /></p>
      </Link>
      <ul className="flex">
        {breadcrumb.map((item, index) => (
          <li key={item.id} className="font-light flex items-center">
            <Link href={item.url} className="text-xs md:text-xl text-[#8c8c8c]">
              {item.title}
            </Link>
            {breadcrumb.length - 1 !== index && <span className="px-[2px] text-white">
              <FaLessThan className="mx-[8px] mt-[4px] text-xs font-thin text-[#8c8c8c]" />
            </span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PageHero;
