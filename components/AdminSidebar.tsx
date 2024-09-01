'use client'
import Image from 'next/image'
import React from 'react'
import {adminSidebarLinks} from '@/constants'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

import Icon from './DynamicIcon';

const AdminSidebar = () => {
    const pathname = usePathname();
  return (
    <section  className='sticky left-0 top-0 flex h-screen  w-fit flex-col items-center gap-20 p-6 max-sm:hidden lg:w-64 border-r-[1px] border-r-[#B47B2B] bg-[#fdfdfd]'>
    <Image src='dnbl.svg' width={24} height={24} alt='dnbl logo' className='w-28'/>
    <div className=' text-[#3E3E3E] flex flex-col gap-8 '>
        <h2>MAIN MENU</h2>
        <div className='flex flex-1 flex-col gap-5'>
            {adminSidebarLinks.map((link) => {
                const isActive = pathname === link.route
                return(
                 <Link 
                 href={link.route}
                 key={link.label}
                 className={cn('flex gap-4 p-3 items-center rounded-lg justify-center lg:justify-start', {'bg-[#3E3E3E] text-white ' : isActive, })}
                 >
                  <Icon name={link.icon} />
                  <p className='max-lg:hidden'> {link.label}</p>
                 </Link>   
                )
            })}
        </div>
    </div>
    </section>
  )
}

export default AdminSidebar