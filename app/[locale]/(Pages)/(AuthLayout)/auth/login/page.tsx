import Login from '@/app/[locale]/components/page/Auth/Login/PageContent'
import React from 'react'

async function Page({ params: { locale } }: LocaleParams) {
  return (
    <div>
      <Login locale={locale} />
    </div>
  )
}

export default Page
