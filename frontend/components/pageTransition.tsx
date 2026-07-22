"use client"
import { motion, useAnimationControls } from "motion/react"
import { useEffect } from "react";

export default function Transition({children}: {children: React.ReactNode}) {
  const controls = useAnimationControls();

useEffect(() => {
    async function play() {
        await controls.start({
            scaleY: 1,
            transformOrigin: "top",
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1]  }
        });

        await controls.start({
            scaleX: 0,
            transformOrigin: "right",
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1]  }
        });
    }

    play();
}, [controls]);
    return (
      <>
      <motion.div
      initial={{scaleY: 0,}}
      animate={controls}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-0 left-0 w-full h-full bg-(--primary) z-50 "
      />
      {children}
      </>
    )
}
