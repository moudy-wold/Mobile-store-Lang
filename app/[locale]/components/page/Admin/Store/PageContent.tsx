import React from 'react'
import ProductsPage from '@/app/[locale]/components/global/ProductsPage/ProductsPage'

function Store({locale} : LocaleProps){
  return (
    <div className=''>
      <ProductsPage locale={locale} id={"554b9aad-2e2d-432d-b452-637cb3226b35"} title={"شاشات"} store={true} />
      
    </div>
  )
}

export default Store
