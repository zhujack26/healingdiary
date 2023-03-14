import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { GlobalColors } from "../constants/color";
import BottomTabs from "./BottomTabs";


const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="diaryBottomTab"
        screenOptions={{
          headerStyle: {
            backgroundColor: GlobalColors.colors.background500,
          },
          headerTintColor: GlobalColors.colors.black500,
        }}
      >
        <Stack.Screen
          name="diaryBottomTab"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
