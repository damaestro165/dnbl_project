import StatsCard from '@/components/StatsCard'
import React from 'react'

const AdminDashboard = () => {
  return (
    <section>
      <div className='bg-[#fdfdfd] p-5 h-fit'>
        <h1 className='font-bold text-xl max-md:text-2xl'>Dashboard</h1>
      </div>
      <div className='mt-3 flex gap-2 lg:gap-0 px-5 lg:px-0  flex-col lg:flex-row'>
        <StatsCard/>
        <StatsCard/>
        <StatsCard/>
      </div>
    
    </section>
  )
}

export default AdminDashboard