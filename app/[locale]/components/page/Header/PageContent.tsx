import React from 'react'
import MainSlider from './MainSlider'
import StatusSlider from './StatusSlider'
import { GetAllStatussForCustomer } from '@/app/[locale]/api/status'
import GuidingImages from './Guiding_images/PageContent'

async function Header() {
  const data = await GetAllStatussForCustomer()

  return (
    <main >
      <MainSlider />
      <StatusSlider data={data.data}/>
      <GuidingImages />
    </main>
  )
}

export default Header
