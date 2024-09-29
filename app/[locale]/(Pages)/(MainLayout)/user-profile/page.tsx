import React from 'react'
import dynamic from 'next/dynamic'

const UserProfile = dynamic(() => import("@/app/[locale]/components/page/User-Profile/page"),{ssr:false})
async function Page({ params: { locale } }: LocaleParams) {
       
  return (
    <div>
      <UserProfile  locale={locale}  />
    </div>
  )
} 

export default Page
