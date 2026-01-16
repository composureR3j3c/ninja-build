import 'react-native-reanimated';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import "../global.css"
import { DarkTheme, DefaultTheme,ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import GlobalProvider from '@/lib/global-provider';
import { SafeAreaView } from 'react-native-safe-area-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
   const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <GlobalProvider>
          <Stack screenOptions={{ headerShown: false }}>
          </Stack>
          
        </GlobalProvider>
     </ThemeProvider>
  );
}
