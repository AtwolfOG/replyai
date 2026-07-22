"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"

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
  {
    title: "Logout",
    href: "/logout",
  },
]

export default function Navbar() {
  const pathname = usePathname()
    return (
        <nav className="flex  gap-18 items-center px-6 py-4 h-20 border-b border-(--border)">
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
                <p className={pathname.startsWith(link.href) ? "text-(--primary)!" : "text-(--text-muted)!"}>{link.title}</p>
              </Link>
              {pathname.startsWith(link.href) && <motion.div layout layoutId="active" transition={{duration: .2}} className="absolute bottom-0 left-0 w-full h-0.5 bg-(--primary)"></motion.div>}
            </div>
          ))}
        </div>
        </nav>
    )
}

