import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalColors } from "../constants/color";
import BottomTabs from "./BottomTabs";
import LoginScreen from "./../screens/LoginScreen";

import Date from "../ui/Date";
import MakingScreen from "../screens/MakingScreen";
import { Text, TouchableOpacity } from "react-native";
import MakingDetailScreen from "../screens/MakingDetailScreen";
import GroupDetailScreen from "../screens/GroupDetailScreen";
import UserInformScreen from "../screens/UserInformScreen";
import GroupInfoUpdateScreen from "./../screens/GroupInfoUpdateScreen";
import GroupMemberScreen from "./../screens/GroupMemberScreen";
import NotificationScreen from "../screens/NotificationScreen";
import KakaoWebView from "../components/login/KakaoWebView";
import ModifyingInformScreen from "../screens/ModifyingInformScreen";
import GroupMemberAllow from "./../components/groupMemberAllow/GroupMemberAllow";
import NextButton from "../components/making/NextButton";
import DiaryDetailScreen from "../screens/DiaryDetailScreen";
import CalendarDiaryListScreen from "../screens/CalendarDiaryListScreen";
import InviteScreen from "../screens/InviteScreen";
import { BottomTabContextProvider } from "../context/BottomTabContext";

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <BottomTabContextProvider>
      <NavigationContainer>
        {/* <Stack.Navigator
        initialRouteName="userinform"
        component= {UserInformScreen}
        > */}
        <Stack.Navigator
          initialRouteName="diaryBottmTab"
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
            name="kakaoLoginWebView"
            component={KakaoWebView}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="diaryDetail"
            component={DiaryDetailScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="calendarDiaryList"
            component={CalendarDiaryListScreen}
            options={{
              title: "",
              headerTitle: () => <Date />,
              headerTitleAlign: "center",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: GlobalColors.colors.background500,
              },
            }}
          />
          <Stack.Screen
            name="Making"
            component={MakingScreen}
            options={({ navigation }) => ({
              headerTitle: "",
              headerBackTitleVisible: false,
              headerRight: (props) => (
                <NextButton {...props} navigation={navigation} />
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
            name="MakingDetail"
            component={MakingDetailScreen}
            options={({ navigation }) => ({
              title: "",
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("MakingDetail")}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>완료</Text>
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
            name="groupDetail"
            component={GroupDetailScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="groupInfoUpdate"
            component={GroupInfoUpdateScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="groupMember"
            component={GroupMemberScreen}
            options={{
              title: "",
              headerTitle: () => <Date />,
              headerTitleAlign: "center",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: GlobalColors.colors.background500,
              },
            }}
          />

          <Stack.Screen
            name="groupMemberAllow"
            component={GroupMemberAllow}
            options={{
              title: "",
              headerTitle: () => <Date />,
              headerTitleAlign: "center",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: GlobalColors.colors.background500,
              },
            }}
          />

          <Stack.Screen
            name="userinform"
            component={UserInformScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ModifyingInform"
            component={ModifyingInformScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Notification"
            component={NotificationScreen}
            options={{
              headerTitle: "알림",
              headerTitleAlign: "center",
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Invite"
            component={InviteScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BottomTabContextProvider>
  );
};
export default StackNavigation;
