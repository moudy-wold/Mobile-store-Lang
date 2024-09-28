import HomePage from '@/app/[locale]/components/page/Admin/HomePage'
import React from 'react'

async function Page({ params: { locale } }: LocaleParams) {
  return (
    <div>
      <HomePage locale={locale} />
    </div>
  )
}

export default Page
