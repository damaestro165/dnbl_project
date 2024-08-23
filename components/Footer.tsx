"use client";


import React from 'react'
import { usePathname } from "next/navigation";
import Link from "next/link";
import NewsletterForm from './NewsletterForm';
import { RiInstagramLine, RiFacebookFill, RiTwitterXFill, RiTiktokFill } from "react-icons/ri";
import Image from 'next/image';

const footerProduct = [
	{ title: "All Products", link:"/products" },
	{ title: "Category", link: "/category" },
	{ title: "Men", link: "/men" },
	{ title: "Kids", link: "/kids" },
  { title: "women", link: "/women" },
];

const footerAboutus = [
	{ title: "About DNBL", link:"/about" },
	{ title: "Contact Us", link: "/contact" },
  { title: "Terms & Conditions", link: "/terms/conditions" },
];

// Work on this
function Footer() {
  const pathname = usePathname();

  return (
    <footer className='bg-[#1E1E1E] px-[5%] lg:pt-[68px] py-10 lg:pb-[113px] xl:px-[105px] relative'>
      <div className='flex flex-col lg:flex-row gap-16 2xl:gap-[156px] xl:items-center mb-5'>
        <div className='grid gap-8 lg:gap-0 xl:gap-8'>
        <Link href={"/"} className="shrink-0">
					<Image
						src="/assets/logo-white.svg"
						width={138}
						height={60}
						alt="DNBL logo"
					/>
				</Link>

          <div className="flex items-start gap-4">
          <a href="https://www.instagram.com/d.n.b.l_fashion?igsh=Ym8yaDBxZXZ0emJj&utm_source=qr" target="_blank" className='hover:-translate-y-1 duration-200 text-white border-[1.5px] border-border-gray text-xl p-[6px] rounded-full'>
            <RiInstagramLine />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61560331935864&mibextid=LQQJ4d" target="_blank" className='hover:-translate-y-1 duration-200 text-white border-[1.5px] border-border-gray text-xl p-[6px] rounded-full'>
            <RiFacebookFill />
          </a>
          <a href="https://x.com/dnbl_fashion" target="_blank" className='hover:-translate-y-1 duration-200 text-white border-[1.5px] border-border-gray text-xl p-[6px] rounded-full'>
            <RiTwitterXFill />
          </a>
          <a href="https://www.tiktok.com/@d.n.b.l_fashion?_t=8oUbZxlw4XS&_r=1 " target="_blank" className='hover:-translate-y-1 duration-200 text-white border-[1.5px] border-border-gray text-xl p-[6px] rounded-full'>
            <RiTiktokFill />
          </a>
          </div>
        </div>

        <div className='flex flex-col items-start gap-8 md:flex-row xl:gap-[87px]'>
        <div className="md:w-[140px]">
          <h2 className='pb-3 text-gold-text text-lg font-semibold font-open-sans'>Products</h2>
          <ul className="flex flex-col items-start gap-1">
						{footerProduct.map(({ title, link }) => (
							<li
								key={title}
								className={`font-roboto text-base font-normal ${
									pathname === link ? "text-[#231867]" : "text-[#B6B6B6]"
								} hover:text-[#B47B2B]`}
							> <Link href={link}>
								{title}
								</Link>
							</li>
						))}
					</ul>
        </div>

        <div className='lg:pr-8 xl:pr-0'>
          <h2 className='pb-3 text-gold-text text-lg font-semibold font-open-sans'>About Us</h2>
          <ul className="flex flex-col items-start gap-1">
						{footerAboutus.map(({ title, link }) => (
							<li
								key={title}
								className={`font-roboto text-base font-normal ${
									pathname === link ? "text-[#231867]" : "text-[#B6B6B6]"
								} hover:text-[#B47B2B]`}
							> <Link href={link}>
								{title}
								</Link>
							</li>
						))}
					</ul>
        </div>

        <div className='grid gap-3'>
          <h2 className='text-gold-text font-open-sans text-lg font-normal'>Subscribe to our newsletter</h2>
          <p className="text-[#B6B6B6] text-base font-open-sans font-normal">Stay in touch with latest updates from DNBL.</p>
          <NewsletterForm />
        </div>
        </div>
      </div>

      <hr className="absolute left-0 right-0 bottom-38 h-[0.682px] border-b-4 border-dark-brown bg-dark-brown" />

      <p className="pt-3 text-white text-base text-center font-semibold font-open-sans">© 2024 DNBL. All rights reserved</p>
    </footer>
  )
}

export default Footer