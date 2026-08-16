import { Text, View } from "react-native"

export function AccentButton({text}: {text: string}) {
    return (
        <View className="p-2 bg-surface-muted dark:bg-surface-muted-dark border border-border dark:border-border-dark rounded-full">
            <Text>{text}</Text>
        </View>
    )
}
