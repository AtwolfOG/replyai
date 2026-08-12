import { Tabs } from "expo-router";
import { View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Lucide } from "@react-native-vector-icons/lucide";
import { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs";
import { ThemedText } from "./themed-text";
import { BlurView } from "expo-blur";

const tabs = [
  {
    name: "index",
    label: "Home",
    icon: "home",
  },
  {
    name: "history",
    label: "History",
    icon: "history",
  },
  {
    name: "settings",
    label: "Settings",
    icon: "settings",
  },
] as const;

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View 
      className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center"
      style={{ paddingBottom: insets.bottom, backdropFilter: [{blur: 10}] } as any}
    >
      <View className="flex-row w-[90%] justify-around items-center overflow-hidden border border-border rounded-full">
        <BlurView intensity={10} tint="systemMaterialLight" className="flex-1 flex-row bg-white/10">
          <View className="flex-1 flex-row justify-around items-center py-md">
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key]
              const label = options.title !== undefined ? options.title : route.name
              const isFocused = state.index === index

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                })

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name)
                }
              }

              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                })
              }

              return (
                <Pressable
                  key={route.key}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={(options as any).tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                >
                  <View className="items-center gap-lg">
                    <Lucide name={tabs[index].icon} size={24} color={isFocused ? "#004ac6" : "#434655"} />
                    <ThemedText type="small" style={{ color: isFocused ? "#004ac6" : "#434655" }}>{label}</ThemedText>
                  </View>
                </Pressable>
              )
            })}
          </View>
        </BlurView>
      </View>
    </View>
  );
}



export default function AppTabs() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  )
}