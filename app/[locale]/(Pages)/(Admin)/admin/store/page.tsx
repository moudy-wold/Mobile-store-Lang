import Store from '@/app/[locale]/components/page/Admin/Store/PageContent'
import React from 'react'

async function Page({ params: { locale } }: LocaleParams) {
  return (
    <div>
      <Store locale={locale} />
    </div>
  )
}

export default Page
