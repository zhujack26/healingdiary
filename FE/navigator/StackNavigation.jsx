import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalColors } from "../constants/color";
import BottomTabs from "./BottomTabs";
import LoginScreen from "./../screens/LoginScreen";
import WriteScreen from "../screens/WriteScreen";
import {
  Button, Pressable
} from "react-native";
import WriteSecondScreen from "../screens/WriteSecondScreen";

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
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Write"
          component={WriteScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button 
              onPress={() => navigation.navigate("Write2")}
              title="다음"
              />
              ),
          })} 
        />
        <Stack.Screen
          name="Write2"
          component={WriteSecondScreen}
          options={{
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
