import { ThemedText } from "./themed-text";
import { View } from "react-native";
import { Copy } from "./clipboard";

export function Reply({reply}: {reply: string}) {
    if (reply === "") {
        return (
            <View className="border-border border bg-surface rounded-lg">
              <View className="flex-row items-center justify-between gap-1 p-3">
                  <ThemedText type="subtitle">Reply</ThemedText>
              </View>
              <View className="p-4 border-t border-border">
                  <ThemedText>No reply yet</ThemedText>
              </View>
            </View>
        )
    }
    return (
        <View className="border-border border rounded-lg bg-surface ">
          <View className="flex-row items-center justify-between gap-1 p-3">
              <ThemedText type="subtitle">Reply</ThemedText>
              <Copy text={reply} icon={true}/>
          </View>
          <View className="p-4 border-t border-border">
              <ThemedText>{reply}</ThemedText>
          </View>
        </View>
    )
}