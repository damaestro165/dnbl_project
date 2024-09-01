// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";

import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/authOptions';
import Provider from "./_utils/Provider"

export const metadata: Metadata = {
  title: "DNBL Fashion House",
  description:
    "Discover the latest fashion trends at D'Nobles Fashion House, your premier online destination for high-quality, stylish apparel. Shop our curated collection of children's, women's and men's traditional clothing. Enjoy fast, reliable shipping and exceptional customer service. Elevate your look with DNBL",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      
      <body>
        
         <Provider session={session}>
          <div className="">
          {children}
          </div>
         </Provider>
        
      </body>
    </html>
  );
}