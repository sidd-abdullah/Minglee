"use client"

import { sidebarLinks } from "@/constants";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Bottombar() {
  const pathname = usePathname();
  const { userId } = useAuth();
  
  return (
    <section className="fixed bottom-0 z-10 w-full rounded-t-3xl dark:bg-[#121417] p-4 backdrop-blur-lg xs:px-7 md:hidden">
      <div className="flex items-center justify-between gap-3 xs:gap-5">
      {sidebarLinks.map((link) => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
          if (link.route === '/profile') link.route = `${link.route}/${userId}`;

          return (
            <Link 
              href={link.route}
              key={link.label}
              className={`relative flex flex-col items-center gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5 ${isActive && 'bg-purple-500'}`}
            >
              <link.icon 
                className="w-6 h-6"
              />

              <p className="text-medium max-sm:hidden">
                {link.label.split(/\s+/)[0]}
                </p>
            </Link>
          )}
        )}
      </div>
    </section>
  )
}

export default Bottombar;