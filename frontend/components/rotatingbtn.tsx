"use client"
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function RotatingBtn({children, className}: {children: React.ReactNode, className?: string}) {
  const [isHovered, setIsHovered] = useState(false);
    return (
    <motion.div
    className={cn("relative overflow-hidden p-0 w-fit border rounded-full z-10", className)}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
        <motion.div className="relative">
          <AnimatePresence mode="popLayout">
            {!isHovered ? <motion.small className="px-(--space-2) inline-block" initial={{y: "-100%"}}  animate={{y: 0}} exit={{y: "-100%"}} transition={{duration: .01, type: "spring", stiffness: 100}} key="first">
              {children}
            </motion.small> : <motion.small className="px-(--space-2) inline-block" initial={{y: "100%"}} animate={{y: 0}} exit={{y: "100%"}} transition={{duration: .01, type: "spring", stiffness: 100}} key="second">
              {children}
            </motion.small>}
          </AnimatePresence>
        </motion.div>
    </motion.div>
    )
}