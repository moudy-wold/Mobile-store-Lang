import React from 'react'
import CategoriesSlider from "./CategoriesSlider/CategoriesSlider"
import OfferCard from './OfferProducts/OfferCard'

function Store({locale} : LocaleProps){
  return (
    <div className=''>

       <CategoriesSlider locale={locale} />
        {/* <OfferCard locale={locale} /> */}
      {/* <ProductsPage locale={locale} id={"554b9aad-2e2d-432d-b452-637cb3226b35"} title={"شاشات"} store={true} /> */}
      
    </div>
  )
}

export default Store
