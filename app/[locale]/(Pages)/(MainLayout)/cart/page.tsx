import React from 'react'
import CartContent from '@/app/[locale]/components/page/Cart/PageContent'

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
