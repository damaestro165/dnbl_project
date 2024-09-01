'use client'
import AdminSidebar from '@/components/AdminSidebar'
import { adminSidebarLinks, navLinkItems } from '@/constants'
import { cn } from "@/lib/utils"
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from "next/navigation"
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Icon from '@/components/DynamicIcon'
import Footer from '@/components/Footer'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
      <main className="relative flex">
        <div className="md:hidden flex items-center absolute right-0 p-5" >
                 <Sheet>
                    <SheetTrigger><Menu className='w-20 h-8'/></SheetTrigger>
                    <SheetContent className='flex flex-col gap-8 pt-14'>
                        <div className='flex flex-1 flex-col gap-5'>
                            {adminSidebarLinks.map((link) => {
                                const isActive = pathname === link.route
                                return(
                                <Link 
                                href={link.route}
                                key={link.label}
                                className={cn('flex gap-4 p-3 rounded-lg  lg:justify-start', {'bg-[#3E3E3E] text-white ' : isActive, })}
                                >
                                  <Icon name={ link.icon} />
                                  <p className=''> {link.label}</p>
                                </Link>   
                                )
                            })}
                        </div>
                    </SheetContent>
                </Sheet>
        </div>
      <AdminSidebar/>
        <section className=' flex min-h-screen flex-1 flex-col'>
          <div>
             {children}
          </div>
        </section>
      
     </main>
  );
}