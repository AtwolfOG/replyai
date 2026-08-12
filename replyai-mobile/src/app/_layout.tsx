import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

import AppTabs from '@/src/components/app-tabs';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/src/global.css';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  SplashScreen.hideAsync();
  return (
    
    <GluestackUIProvider mode="dark">
      <View className="flex-1">
        <AppTabs />
      </View>
    </GluestackUIProvider>
  
  );
}