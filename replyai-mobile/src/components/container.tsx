import { useTheme } from "@/src/hooks/use-theme";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Container({children}: {children: React.ReactNode}) {
  const insets = useSafeAreaInsets();
    return (
        <ScrollView 
            className="px-2xl bg-background " 
            contentContainerClassName="flex-grow"
            contentContainerStyle={{
                paddingBottom: insets.bottom + 80, 
                paddingTop: insets.top + 12
            }}
        >
            {children}
        </ScrollView>
    )
}