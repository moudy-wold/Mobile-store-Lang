import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import Link from "next/link";
import SearchUser from "@/app/[locale]/components/global/Search/SearchUser/SearchUser";
import CustomerList from "@/app/[locale]/components/page/Admin/Customer/CustomerList/CustomerList";

export default async function Page() {
  return (
    <div className="!w-[390px] sm:!w-[640px] md:!w-[768px] lg:!w-full " >
      <div className="grid grid-cols-[50%_50%] items-center px-4 lg-px-0">

        <div className="">
          <button className="border-2 border-gray-300 rounded-lg p-1 pr-2">
            <Link
              href="/admin/customer/create"
              className="flex items-center justify-beetwen text-xl"
            >
              أضف زبون <CiCirclePlus className="mr-2" />
            </Link>
          </button>
        </div>

        <div className="p-4">
          <SearchUser />
        </div>

      </div>

      <div style={{ overflowX: 'auto' }}>

        <CustomerList />

      </div>
    </div>
  );
}

