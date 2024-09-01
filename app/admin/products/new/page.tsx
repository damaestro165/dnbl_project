'use client'

import GlobalApi from '@/app/_utils/GlobalApi'
import AddProductForm from '@/components/AddProductForm'
import React from 'react'

const AddProductpage = () => {
  
  const createProduct = GlobalApi.createProduct

  return (
     <section>
      <div className='bg-white'>
        <AddProductForm createProduct={createProduct}  />
      </div>
    </section>
  )
}

export default AddProductpage