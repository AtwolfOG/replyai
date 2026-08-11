import { defaultStyles } from "@/lib/styles";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Container({children}: {children: React.ReactNode}) {
  const insets = useSafeAreaInsets();
    return (
        <ScrollView contentContainerStyle={{paddingBottom: insets.bottom + 80, paddingInline: 16, paddingTop: insets.top + defaultStyles.spacing.xl}}>
            {children}
        </ScrollView>
    )
}