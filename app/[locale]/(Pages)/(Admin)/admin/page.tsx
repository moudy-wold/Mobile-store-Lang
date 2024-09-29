import React from 'react'
import dynamic from 'next/dynamic'

const HomePage = dynamic(() => import("@/app/[locale]/components/page/Admin/HomePage"), { ssr: false })
async function Page({ params: { locale } }: LocaleParams) {
  return (
    <div>
      <HomePage locale={locale} />
    </div>
  )
}

export default Page
