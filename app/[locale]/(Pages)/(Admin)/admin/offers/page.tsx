import React from 'react'
import OffersPage from '@/app/[locale]/components/page/Admin/Offers/PageContent';

type Params = {
    params: {
        locale: string;
      };}
async function Page({ params: { locale } }:Params) {
  return (
    <div>
      <OffersPage locale={locale} />
    </div>
  )
}

export default Page
