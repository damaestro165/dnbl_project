'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { navLinkItems } from '@/constants'
import { cn } from "@/lib/utils"
import { Menu, SearchIcon, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from "next/navigation"
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"



const NavBar = () => {
    const pathname = usePathname();
  return (
    <nav className=' relative bg-white h-fit flex justify-between max-sm:px-5 py-5 px-20 w-full items-center shadow-md text-[#292d32]'>
        <Link href='/'>
        <Image src='dnbl.svg' width={24} height={24} alt='dnbl logo' className='max-sm:w-24 w-28'/>
        </Link>
        <div className='max-lg:hidden flex gap-6 xl:gap-10 '>
            {navLinkItems.map((link)=> {
                const isActive = pathname === link.route
                return (         
                    <Link href={link.route}  key={link.label}  className={cn('hover:text-[#B47B2B] hover:border-b-4 hover:border-b-[#B47B2B]', {'text-[#B47B2B] border-b-4 border-b-[#B47B2B] pb-2 ' : isActive, })} >
                    <p>{link.label}</p>
                    </Link>
                )
            })}
        </div>
        <div className='flex flex-row items-center max-sm:gap-4 gap-8'>
            <SearchIcon className='max-md:hidden'/>
            <ShoppingCart />
            <Link href='/user'>
                <Avatar>
                    <AvatarImage src="/" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </Link>
            <div className="lg:hidden flex items-center" >
                 <Sheet>
                    <SheetTrigger><Menu/></SheetTrigger>
                    <SheetContent className='flex flex-col gap-8 pt-14'>
                        <div className='flex flex-col gap-8'>
                            {navLinkItems.map((link)=> {
                                const isActive = pathname === link.route
                                    return (         
                                        <Link href={link.route}  key={link.label}  className={cn('hover:text-[#B47B2B] hover:border-b-4 hover:border-b-[#B47B2B] hover:pb-2', {'text-[#B47B2B] border-b-4 border-b-[#B47B2B] pb-2 ' : isActive, })} >
                                            <p>{link.label}</p>
                                            </Link>
                                        )
                                    })}
                        </div>
                        <div className="md:hidden"><Button className="bg-[#B47B2B] text-white font-medium py-4 px-6">Contact Us</Button></div>
                    </SheetContent>
                </Sheet>

            </div>
            <div className="max-md:hidden"><Button className="bg-[#B47B2B] text-white font-medium py-4 px-6">Contact Us</Button></div>
        </div>
        
    </nav>
  )
}

export default NavBar