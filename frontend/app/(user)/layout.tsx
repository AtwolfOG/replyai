import Navbar from "@/components/navbar";
import { AnimatePresence } from "motion/react";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <main className="flex flex-col min-h-screen">
            <Navbar />
            <div className="relative flex-1">
              <AnimatePresence mode="wait">
                {children}
              </AnimatePresence>
            </div>
        </main>
    )
}