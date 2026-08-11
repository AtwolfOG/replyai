import { defaultStyles } from "@/lib/styles"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

export default function Button({children, onPress, variant = "outline"}: {children: React.ReactNode, onPress: () => void, variant: "primary" | "secondary" | "accent" | "destructive" | "outline"}) {
    return (
        <TouchableOpacity onPress={onPress} style={[containerStyles.container, containerStyles[variant]]}>
            <Text style={textStyles[variant]}>{children}</Text>
        </TouchableOpacity>
    )
}

const containerStyles = StyleSheet.create({
    container: {
        padding: defaultStyles.spacing.xl,
        backgroundColor: defaultStyles.colors.surfaceMuted,
        borderWidth: 1,
        borderColor: defaultStyles.colors.border,
        borderRadius: defaultStyles.radius.lg,
    },
    primary: {
        backgroundColor: defaultStyles.colors.primary,
    },
    secondary: {
        backgroundColor: defaultStyles.colors.secondary,
    },
    accent: {
        backgroundColor: defaultStyles.colors.accent,
    },
    destructive: {
        backgroundColor: defaultStyles.colors.destructive,
    },
    outline: {
        // backgroundColor: defaultStyles.colors.surface,
    },
})

const textStyles = StyleSheet.create({
    primary: {
        color: defaultStyles.colors.primaryForeground,
    },
    secondary: {
        color: defaultStyles.colors.secondaryForeground,
    },
    accent: {
        color: defaultStyles.colors.accentForeground,
    },
    destructive: {
        color: defaultStyles.colors.primaryForeground,
    },
    outline: {
        color: defaultStyles.colors.textBody,
    },
})
