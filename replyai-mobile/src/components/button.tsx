import { Text, TouchableOpacity } from "react-native"

type ButtonVariant = "primary" | "secondary" | "accent" | "destructive" | "outline";

const baseContainerClass = "p-xl bg-surface-muted border border-border rounded-lg";

const containerClasses: Record<ButtonVariant, string> = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
    destructive: "bg-destructive",
    outline: "",
};

const textClasses: Record<ButtonVariant, string> = {
    primary: "text-primary-foreground",
    secondary: "text-secondary-foreground",
    accent: "text-accent-foreground",
    destructive: "text-primary-foreground",
    outline: "text-text-body",
};

export default function Button({children, onPress, variant = "outline"}: {children: React.ReactNode, onPress: () => void, variant?: ButtonVariant}) {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            className={`${baseContainerClass} ${containerClasses[variant]}`}
        >
            <Text className={textClasses[variant]}>{children}</Text>
        </TouchableOpacity>
    )
}


