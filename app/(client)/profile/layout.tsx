import UserSiderBar from "@/components/UserSiderBar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="relative flex w-full lg:px-[70px] lg:gap-28 lg:py-14">
        <UserSiderBar/>
        <section className=''>
             {children}
        </section>
     </main>
  );
}