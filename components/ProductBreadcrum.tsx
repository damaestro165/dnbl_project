'use client'
import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from 'next/link'


const ProductBreadcrum = () => {
  
  return (
    <Breadcrumb  className='py-5 px-3 '>
            <BreadcrumbList>
              <BreadcrumbItem >
                <BreadcrumbLink href="/admin/products" className='text-xl' >
                All Products
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='text-xl'>
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink  asChild>
                <Link href="/admin/products/new" className='text-xl'>Add Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
  )
}

export default ProductBreadcrum