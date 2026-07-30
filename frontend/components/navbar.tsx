"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"
import { Landmark, LayoutDashboard, Settings } from "lucide-react"
import { cloneElement } from "react"

const navLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "History",
    href: "/history",
  },
  {
    title: "Settings",
    href: "/settings",
  },
  // {
  //   title: "Logout",
  //   href: "/logout",
  // },
]

const navIcons = {
  dashboard: <LayoutDashboard />,
  history: <Landmark />,
  settings: <Settings />,
}

export function TopNavbar() {
  const pathname = usePathname()
    return (
        <nav className="flex max-sm:hidden gap-18 items-center px-6 py-4 h-20 border-b">
        <header className="">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
            <h3 >Reply AI</h3>
          </div>
        </header>
        <div className="flex items-center gap-2">
          {navLinks.map((link) => (
            <div key={link.href} className="relative">
              <Link href={link.href}>
                <p className={pathname.startsWith(link.href) ? "text-primary!" : "text-(--text-muted)!"}>{link.title}</p>
              </Link>
              {pathname.startsWith(link.href) && <motion.div layout layoutId="active-top" transition={{duration: .2}} className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></motion.div>}
            </div>
          ))}
        </div>
        </nav>
    )
}

export function BottomNavBar() {
  const pathname = usePathname()
    return (
        <nav className="sm:hidden fixed z-999 bottom-0 left-0 right-0 h-12 bg-(--surface-muted) border-t">
          <div className="flex items-center justify-between gap-(--space-8) py-(--space-1) m-auto w-fit h-full">
           {navLinks.map((link) => (
            <div key={link.href} className="relative h-full flex items-center justify-center">
              <Link href={link.href} className="p-(--space-4)">
                { cloneElement(navIcons[link.title.toLowerCase() as keyof typeof navIcons], { className: pathname.startsWith(link.href) ? "text-primary!" : "text-(--text-muted)!"})}
              </Link>
              {pathname.startsWith(link.href) && <motion.div layout layoutId="active-bottom" transition={{duration: .2}} className="absolute inset-0 bg-primary/20 rounded-md"></motion.div>}
            </div>
          ))} 
          </div>
        </nav>
    )
}