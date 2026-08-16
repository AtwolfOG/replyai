import { Stack } from "expo-router";
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { View } from "react-native";
import AppTabs from "@/components/app-tabs";
import Lucide from "@react-native-vector-icons/lucide";
import { useColorScheme } from "react-native";

// @ts-ignore
// import { cssInterop } from "nativewind";

// cssInterop(Lucide, {
//   className: {
//     target: "style",
//     nativeStyleToProp: {
//       color: true,
//     },
//   },
// });

export default function RootLayout({children}: {children: React.ReactNode}) {
  const colorScheme = useColorScheme();
console.log(colorScheme);
  return (
    <GluestackUIProvider mode={colorScheme}>
      <View className="flex-1">
        {children}
        <AppTabs />
      </View>
    </GluestackUIProvider>
  );
} 