import React from 'react'
import MainSlider from './MainSlider'
import StatusSlider from './StatusSlider'
import { GetAllStatussForCustomer } from '@/app/[locale]/api/status'
import {GetGuidingImageForCustomer} from "@/app/[locale]/api/guidingImage"
import GuidingImages from './Guiding_images/PageContent'

async function Header() {
  const data = await GetAllStatussForCustomer()
  const guindingImage = await GetGuidingImageForCustomer();
  return (
    <main >
      <MainSlider />
      <StatusSlider data={data.data}/>
      <GuidingImages  data={guindingImage.data} />
    </main>
  )
}

export default Header
