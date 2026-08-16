import { Tabs } from "expo-router";
import { View, Pressable, Platform, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Lucide from "@react-native-vector-icons/lucide";
import { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs";
import { ThemedText } from "./themed-text";
import { BlurView } from "expo-blur";
import { LinearGradient } from "@/components/ui/linear-gradient";

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
  const isIos = Platform.OS === 'ios';
  const isDark = useColorScheme() === 'dark';

  return (
    <View
      className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center"
      style={{ paddingBottom: insets.bottom }}
    >
      <View className="inset-0 absolute ">
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, .25)']}
          // colors={['#8637CF', '#0F55A1']}
          // start={[0, 1]}
          // end={[1, 0]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1 absolute inset-0"
        />
      </View>
      <View className="flex-row w-[90%] justify-around items-center overflow-hidden border border-border dark:border-border-dark rounded-full">
        <BlurView intensity={30} tint={isDark ? 'dark' : 'light'} className="flex-1 flex-row" >
        {!isIos && <View style={{ filter: 'blur(10px)' }} className="absolute inset-0 bg-background/50 dark:bg-background-dark/50" />}
          <View className="flex-1 flex-row justify-around items-center py-1">
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
                  <View className="items-center gap-2">
                    <Lucide name={tabs[index].icon} size={24} className={isFocused ? "text-primary! dark:text-primary!" : "text-muted! dark:text-muted-dark!"} />
                    <ThemedText type="small" className={isFocused ? "text-primary! dark:text-primary!" : "text-muted dark:text-muted-dark"}>{label}</ThemedText>
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