import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Container({children}: {children: React.ReactNode}) {
  const insets = useSafeAreaInsets();
  return (
    <View className="bg-background dark:bg-background-dark flex-1">
      <ScrollView
        contentContainerClassName="px-4"
        style={{
          paddingHorizontal: 16,
        }}
        contentContainerStyle={{
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 80,
        }}
      >
        {children}
      </ScrollView>
    </View>
  );
}