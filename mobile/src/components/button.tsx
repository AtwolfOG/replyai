import { cn } from "@/lib/utils"
import { Text, TouchableOpacity } from "react-native"

const containerVariants = {
  primary: "bg-primary dark:bg-primary border-primary dark:border-primary",
  secondary: "bg-secondary dark:bg-secondary-dark border-secondary dark:border-secondary-dark",
  accent: "bg-accent dark:bg-accent-dark border-accent dark:border-accent-dark",
  destructive: "bg-destructive dark:bg-destructive-dark border-destructive dark:border-destructive-dark",
  outline: "bg-transparent",
}

const textVariants = {
  primary: "text-primary-foreground dark:text-primary-foreground",
  secondary: "text-secondary-foreground dark:text-secondary-foreground-dark",
  accent: "text-accent-foreground dark:text-accent-foreground-dark",
  destructive: "text-primary-foreground dark:text-primary-foreground",
  outline: "text-text-body dark:text-text-body-dark",
}

export function Button({children, ref, onPress, variant = "outline"}: {children: React.ReactNode, ref?: React.RefObject<TouchableOpacity>, onPress: () => void, variant?: "primary" | "secondary" | "accent" | "destructive" | "outline"}) {
    return (
        <TouchableOpacity
          ref={ref}
          onPress={onPress}
          className={cn(
            "p-3 border border-border dark:border-border-dark rounded-lg justify-center items-center",
            containerVariants[variant]
          )}
        >
            <Text className={cn("font-medium text-base", textVariants[variant])}>{children}</Text>
        </TouchableOpacity>
    )
}

export function CButton({children, ref, onPress, className}: {children: React.ReactNode, ref?: React.RefObject<TouchableOpacity>, onPress: () => void, className?: string}) {
    return (
        <TouchableOpacity
          ref={ref}
          onPress={onPress}
          className={cn("p-3 border border-border dark:border-border-dark rounded-lg justify-center items-center", className)}
        >
            {children}
        </TouchableOpacity>
    )
}
