import ProductBreadcrum from '@/components/ProductBreadcrum'
import React from 'react'

const Productslayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
     <section>
      <div className='bg-[#fdfdfd] p-5 h-fit'>
        <h1 className='font-bold text-xl max-md:text-2xl'>Products</h1>
      </div>
      <div >
          <ProductBreadcrum/>
      </div>
        {children}
    </section>
  )
}

export default Productslayout