import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Text } from "react-native";

import StackNavigation from "./navigator/StackNavigation";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

export default function App() {
  const [fontsLoaded] = useFonts({
    "KoddiUDOnGothic-Bold": require("./assets/fonts/KoddiUDOnGothic-Bold.ttf"),
    "KoddiUDOnGothic-ExtraBold": require("./assets/fonts/KoddiUDOnGothic-ExtraBold.ttf"),
    "KoddiUDOnGothic-Regular": require("./assets/fonts/KoddiUDOnGothic-Regular.ttf"),
  });

  if (!fontsLoaded) return <StatusBar style="dark" />;

  return (
    <>
      <StatusBar style="dark" />
      <StackNavigation />
    </>
  );
}
