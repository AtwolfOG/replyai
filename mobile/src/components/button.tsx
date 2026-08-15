import { cn } from "@/src/lib/utils"
import { Text, TouchableOpacity } from "react-native"

const containerVariants = {
  primary: "bg-primary border-primary",
  secondary: "bg-secondary border-secondary",
  accent: "bg-accent border-accent",
  destructive: "bg-destructive border-destructive",
  outline: "bg-transparent",
}

const textVariants = {
  primary: "text-primary-foreground",
  secondary: "text-secondary-foreground",
  accent: "text-accent-foreground",
  destructive: "text-primary-foreground",
  outline: "text-text-body",
}

export function Button({children, ref, onPress, variant = "outline"}: {children: React.ReactNode, ref?: React.RefObject<TouchableOpacity>, onPress: () => void, variant?: "primary" | "secondary" | "accent" | "destructive" | "outline"}) {
    return (
        <TouchableOpacity
          ref={ref}
          onPress={onPress}
          className={cn(
            "p-3 border border-border rounded-lg justify-center items-center",
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
          className={cn("p-3 border border-border rounded-lg justify-center items-center", className)}
        >
            {children}
        </TouchableOpacity>
    )
}
