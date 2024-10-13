import React from 'react'
import ProductPage from "@/app/[locale]/components/page/Category/DynamicSection/ProductPage"

type  Props ={
  locale:string,
  data:any
}
function PageContent({locale,data} : Props) {

  return (
    <div>
      <ProductPage locale={locale} data={data} store={true} />
    </div>
  )
}

export default PageContent
