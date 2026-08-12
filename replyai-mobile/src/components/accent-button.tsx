import { Text, View } from "react-native"

export default function AccentButton({text}: {text: string}) {
    return (
        <View className="p-lg bg-surface-muted border border-border rounded-full">
            <Text className="text-text-body">{text}</Text>
        </View>
    )
}

