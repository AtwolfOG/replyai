import { Stack } from "expo-router";
import { GluestackUIProvider } from '@/src/components/ui/gluestack-ui-provider';
import '@/src/global.css';
import { View } from "react-native";
import AppTabs from "@/src/components/app-tabs";
import Lucide from "@react-native-vector-icons/lucide";

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
  return (
    <GluestackUIProvider mode="light">
      <View className="flex-1">
        {children}
        <AppTabs />
      </View>
    </GluestackUIProvider>
  );
}