import React from 'react'
import WishListPage from "@/app/[locale]/components/page/WishList/pageContent"
import { GetWishList } from '@/app/[locale]/api/wishlist'

async function Page({ params: { locale } }: LocaleParams) {
const data = await GetWishList();
  return (
    <div>      
      <WishListPage data={data.data.data} locale={locale} />
    </div>
  )
}

export default Page
