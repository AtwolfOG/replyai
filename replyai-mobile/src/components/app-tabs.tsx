import { Tabs } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Lucide } from "@react-native-vector-icons/lucide";
import { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs";
import { ThemedText } from "./themed-text";
import { defaultStyles } from "@/lib/styles";
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
];

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabBarOuter}>
        <BlurView intensity={10} tint="systemMaterialLight" style={styles.tabBarBlur}>
      <View style={styles.tabBar}>
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
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          style={styles.tab}
        >
          <View style={styles.tabIconContainer}>
            <Lucide name={tabs[index].icon} size={24} color={isFocused ? defaultStyles.colors.primary : defaultStyles.colors.muted} />
            <ThemedText type="small" style={[styles.tabLabel, { color: isFocused ? defaultStyles.colors.primary : defaultStyles.colors.muted }]}>{label}</ThemedText>
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

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabBarOuter: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: defaultStyles.colors.border,
    borderRadius: defaultStyles.radius.full,
  },
  tabBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: defaultStyles.spacing["4xl"],
  },
  tabBarBlur: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  tab: {
  },
  tabIconContainer: {
    alignItems: 'center',
    gap: 8,
  },
  tabLabel: {
    
  },
  tabIcon: {
    
  }
})