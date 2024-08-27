import React from 'react'
import { Outlet } from 'react-router-dom'

import HeaderPage from '../page/Component/HeaderPage'

const HomeTemPlate = () => {
  return (
    <div>
      <HeaderPage/>
      <Outlet/>
    </div>
  )
}

export default HomeTemPlate
