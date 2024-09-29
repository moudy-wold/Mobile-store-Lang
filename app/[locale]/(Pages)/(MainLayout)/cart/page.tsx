import React from 'react'
import dynamic from 'next/dynamic'
const CartContent = dynamic(() => import('@/app/[locale]/components/page/Cart/PageContent'),{ssr:false})

type Props = {
    params: { locale:string,id: string }
}
async function Page({ params: {locale, id } }: Props) {
 
    return (
        <div>
            <CartContent  locale={locale} />
        </div>
    )
}

export default Page
