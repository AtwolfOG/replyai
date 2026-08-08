import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme, View, StyleSheet } from 'react-native';

import AppTabs from '@/components/app-tabs';

SplashScreen.preventAutoHideAsync();

export default function TabLayout({children}: {children: React.ReactNode}) {
  SplashScreen.hideAsync();
  const colorScheme = useColorScheme();
  return (
    <>
    <View style={styles.container}>
      {children}
      <AppTabs />
    </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});