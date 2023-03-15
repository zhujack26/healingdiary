import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalColors } from "../constants/color";
import BottomTabs from "./BottomTabs";
import LoginScreen from "./../screens/LoginScreen";
import DiaryDetail from "./../components/diaryDetail/DiaryDetail";
import Date from "../ui/Date";

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
          name="diaryDetail"
          component={DiaryDetail}
          options={{
            headerTitle: () => <Date />,
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: GlobalColors.colors.primary500,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
