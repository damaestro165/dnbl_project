"use client";

import React, { useState, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ButtonPrimary from "./ButtonPrimary";
import { Button } from "./ui/button";
import { signIn, useSession } from "next-auth/react";

const primaryNavigation = [
  { title: "Home", link: "/" },
  { title: "About Us", link: "/about" },
  { title: "Products", link: "/products" },
  { title: "Favourites", link: "/favourites" },
];

export default function Header() {
  const { data: session } = useSession(); // Use the `useSession` hook to get the session data

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu on any screen size change
  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper function for navigation items
  const NavItem = ({ title, link }: { title: string; link: string }) => (
    <li
      className={`font-open-sans text-xl font-normal p-[10px] cursor-pointer ${
        pathname === link ? "text-[#231867]" : "text-[#292D32]"
      } hover:text-[#B47B2B]`}
    >
      <Link href={link} onClick={closeMenu}>
        {title}
      </Link>
    </li>
  );

  // Helper function for icon buttons
  const IconButton = ({
    href,
    iconSrc,
    notificationCount = null,
  }: {
    href: string;
    iconSrc: string;
    notificationCount?: null | number;
  }) => (
    <button onClick={closeMenu} className="relative">
      <Link href={href}>
        <Image src={iconSrc} width={32} height={32} alt="" />
        {notificationCount !== null && (
          <span className="w-[16.5px] h-[16.5px] rounded-[33px] p-[4.4px] flex items-center justify-center flex-col bg-[#C51818] font-inter text-[11px] font-normal text-white text-center tracking-[-0.33px] absolute top-0 right-0">
            {notificationCount}
          </span>
        )}
      </Link>
    </button>
  );

  return (
    <header className="px-[5%] py-5 2xl:px-[6.25rem] bg-white shadow-header-shadow relative">
      <div className="flex items-center justify-between xl:gap-[6.25rem]">
        <Link href={"/"} className="shrink-0" onClick={closeMenu}>
          <Image
            src="/assets/logo-black.svg"
            width={138}
            height={60}
            alt="DNBL logo"
          />
        </Link>

        {/* Navigation for larger screens */}
        <nav className="flex items-center gap-[54px] lg:gap-20 xl:gap-12 2xl:gap-[54px] shrink-0">
          {/* Primary navigation */}
          <ul className="max-xl:hidden flex items-center gap-5">
            {primaryNavigation.map((item) => (
              <NavItem key={item.title} {...item} />
            ))}
          </ul>

          {/* Icons Menu */}
          <div className="flex justify-center items-center gap-4 sm:gap-8">
            <ul className="max-sm:hidden flex gap-8">
              <IconButton
                href="/searchProducts"
                iconSrc="/assets/search-normal.svg"
              />
              <IconButton
                href="/notifications"
                iconSrc="/assets/notification.svg"
                notificationCount={0}
              />
              <IconButton
                href="/cart"
                iconSrc="/assets/bytesize_cart.svg"
                notificationCount={0}
              />
            </ul>
            {session ? (
                  <>
                      <Link href='/profile'>
                        <FaRegUserCircle className="hover:text-[#B47B2B] text-4xl duration-200" />
                      </Link>
                        
                  </>
                ) : (
               
                   <Link href='/sign-in'>
                        <FaRegUserCircle className="hover:text-[#B47B2B] text-4xl duration-200" />
                      </Link>
                )}

            

            <Link href={"/contact"} className="max-md:hidden">
              <ButtonPrimary onClick={closeMenu} label="Contact Us" />
            </Link>

            <div className="xl:hidden relative">
              <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="outline-none flex items-center justify-center rounded focus:ring-2 focus:ring-gold-text"
                  >
                    <IoMenu size={32} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white mt-[30px] md:mt-[15%] mr-5 flex flex-col items-center justify-center py-6 gap-4">
                  {primaryNavigation.map(({ title, link }) => (
                    <DropdownMenuItem
                      key={title}
                      className={`font-open-sans text-xl font-normal cursor-pointer px-14 ${
                        pathname === link
                          ? "text-[#231867]"
                          : "text-[#292D32]"
                      } hover:text-[#B47B2B]`}
                    >
                      <Link href={link} onClick={closeMenu}>
                        {title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
