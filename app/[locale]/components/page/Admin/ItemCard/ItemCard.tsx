"use client"
import Link from "next/link";

const ItemCard = ({ item }: { item: any }) => {
    return(
    <div className="border-2 border-gray-300 rounded-3xl p-2 hover:scale-110 relative z-10 transition-all duration-200 flex flex-row items-center justify-center">
        {typeof item.label == "string" ?
      <Link href={item.url}>
        <span className="w-fit mx-auto block">{item.icon}</span>
        <span className="w-fit mx-auto">{item.label}</span>
      </Link>
      :
      <p className="" >
      <span className="w-fit mx-auto block ">{item.icon}</span>
      <span className="w-fit mx-auto">{item.label}</span>
    </p>

    }
    </div>
  )};
export default   ItemCard