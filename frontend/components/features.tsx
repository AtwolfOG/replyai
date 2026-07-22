"use client"
import { cn } from "@/lib/utils";
import { Mic } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";


const howItWorks = [
    {
        icon: <Mic size={80} />,
        title: "Record",
        description: "Simply press the mic button and speak your unfiltered thoughts into the browser or mobile app.",
    },
    {
        icon: <Mic size={80} />,
        title: "Review and Edit",
        description: "Review the transcribed draft, edit as needed and send with total confidence.",
    },
    {
        icon: <Mic size={80} />,
        title: "Generate",
        description: "Hit the generate button and watch our AI structure your speech, pulls relevant fact and drafts a response in seconds.",
    }
]

export function Features(){
    return (
        <section className="section my-16">
            <div className="container">
                <div className="text-center">
                  <h2>Magic in three steps</h2>
                  <p className="text-(--text-muted)!">Optimized for clarity and speed</p>
                </div>
                <div className="flex flex-col justify-center items-center py-12">
                 {howItWorks.map((item, index) => (
                    <HowItWorksCard key={index} icon={item.icon} title={item.title} description={item.description} index={index + 1} />
                 ))}
                </div>
            </div>
        </section>
    )
}

function HowItWorksCard({icon, title, description, index}: {icon: React.ReactNode, title: string, description: string, index: number}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px"})
    const isEven = index % 2 === 0

    return (
        <div ref={ref} className="grid grid-cols-2 gap-16 relative max-w-[650px] p-8">
            <motion.div variants={iconVariants} initial="initial" animate={isInView ? "animate" : "initial"} transition={{duration: .2}} className={cn("flex items-center justify-center", isEven && "col-2 row-1")}>{icon}</motion.div>
            <motion.div variants={lineVariants} initial="initial" animate={isInView ? "animate" : "initial"} transition={{duration: .2}} className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full"></motion.div>
            <div className={cn(isEven && "text-right")}>
                <motion.div animate={isInView ? {backgroundColor: "var(--primary)"} : {}} transition={{duration: .2}} className={cn("size-12 my-4 bg-(--primary)/60 text-(--primary-foreground) rounded-full flex items-center justify-center", isEven && "place-self-end")}>{index}</motion.div>
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
        </div>
    )
}

const iconVariants = {
    initial: {
        color: "var(--border)",
    },
    animate: {
        color: "var(--primary)",
        opacity: .8,
    },
}

const lineVariants = {
    initial: {
        backgroundColor: "var(--border)",
    },
    animate: {
        backgroundColor: "var(--primary)",
    },
}