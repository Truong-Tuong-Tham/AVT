import React from 'react'
import HeaderDetail from '../page/DetailJob/Component/Header'
import { Outlet } from 'react-router-dom'
import ListTypeJobsDetail from '../page/DetailJob/Component/ListType'

const DetailTemPlate = () => {
  return (
    <div className='w-full'>
<HeaderDetail/>
<ListTypeJobsDetail/>
<Outlet/>

    </div>
  )
}

export default DetailTemPlate