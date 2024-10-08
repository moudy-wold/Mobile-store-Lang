import Talab from '@/app/[locale]/components/page/Admin/Talab/PageContent'
import React from 'react'

async function Page({ params: { locale } }: LocaleParams) {
  return (
    <div>
      <Talab locale={locale} />
    </div>
  )
}

export default Page
