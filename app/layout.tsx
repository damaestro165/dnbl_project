// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DNBL Fashion House",
  description:
    "Discover the latest fashion trends at D'Nobles Fashion House, your premier online destination for high-quality, stylish apparel. Shop our curated collection of children's, women's and men's traditional clothing. Enjoy fast, reliable shipping and exceptional customer service. Elevate your look with DNBL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}