import { Text, View } from "react-native"

export function AccentButton({text}: {text: string}) {
    return (
        <View className="p-2 bg-surface-muted border border-border rounded-full">
            <Text>{text}</Text>
        </View>
    )
}
