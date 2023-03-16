import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalColors } from "../constants/color";
import BottomTabs from "./BottomTabs";
import LoginScreen from "./../screens/LoginScreen";
import DiaryDetail from "./../components/diaryDetail/DiaryDetail";
import Date from "../ui/Date";
import WriteScreen from "../screens/WriteScreen";
import {
  Button, Text, Pressable, StyleSheet, TouchableOpacity
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
        <Stack.Screen
          name="Write"
          component={WriteScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
              onPress={() => navigation.navigate("Write2")}
              >
              <Text
              style={{fontSize: 16, fontWeight: "bold"}}
              >
              다음  
              </Text>  
              </TouchableOpacity>
              ),
            headerTitle: () => <Date />,
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: GlobalColors.colors.primary500,
            },
            })} 
        />
        <Stack.Screen
          name="Write2"
          component={WriteSecondScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
              onPress={() => navigation.navigate("Write2")}
              >
              <Text
              style={{fontSize: 16, fontWeight: "bold"}}
              >
              완료  
              </Text>  
              </TouchableOpacity>
              ),
            headerTitle: () => <Date />,
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: GlobalColors.colors.primary500,
            },
            })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigation;
