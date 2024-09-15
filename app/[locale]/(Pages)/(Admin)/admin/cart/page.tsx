import React from 'react'
import CartContent from '@/app/[locale]/components/page/Admin/Cart/PageContent'

type Props = {
    params: { id: string }
}
async function Page({ params: { id } }: Props) {
 
    return (
        <div>
            <CartContent />
        </div>
    )
}

export default Page
