import React from 'react'
import { GetWishList } from '@/app/[locale]/api/wishlist'
import dynamic from 'next/dynamic'

const WishListPage = dynamic(() => import("@/app/[locale]/components/page/WishList/pageContent"), { ssr: false })
async function Page({ params: { locale } }: LocaleParams) {
  const data = await GetWishList();
  return (
    <div>
      <WishListPage data={data.data.data} locale={locale} />
    </div>
  )
}

export default Page
