import { defaultStyles } from "@/lib/styles"
import { StyleSheet, Text, View } from "react-native"

export default function AccentButton({text}: {text: string}) {
    return (
        <View style={styles.container}>
            <Text>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: defaultStyles.spacing.lg,
        backgroundColor: defaultStyles.colors.surfaceMuted,
        borderWidth: 1,
        borderColor: defaultStyles.colors.border,
        borderRadius: defaultStyles.radius.full,
    }
})
