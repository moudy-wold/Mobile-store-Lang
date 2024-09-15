import React from 'react'
import MainSlider from './MainSlider'
import StatusSlider from './StatusSlider'
import { GetAllStatussForCustomer } from '@/app/[locale]/api/status'

async function Header() {
  const data = await GetAllStatussForCustomer()

  return (
    <main >
      <MainSlider />
      <StatusSlider data={data.data}/>
    </main>
  )
}

export default Header
