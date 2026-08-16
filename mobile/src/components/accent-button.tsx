import { View } from "react-native"
import { ThemedText } from "./themed-text"

export function AccentButton({text}: {text: string}) {
    return (
        <View className="p-2 bg-surface-muted dark:bg-surface-muted-dark border border-border dark:border-border-dark rounded-full">
            <ThemedText type="small">{text}</ThemedText>
        </View>
    )
}
