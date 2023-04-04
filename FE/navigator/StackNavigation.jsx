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
import MakingInput from "../components/diaryDetail/MakingInput";
import { BottomTabContextProvider } from "../context/BottomTabContext";
import SearchScreen from "./../screens/SearchScreen";
import CompleteButton from "../components/making/CompleteButton";

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
          initialRouteName="Login"
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
            name="searchModal"
            component={SearchScreen}
            options={{
              presentation: "containedModal",
              animation: "fade_from_bottom",
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
              headerRight: (props) => (
                <CompleteButton {...props} navigation={navigation} />
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
            name="Notification"
            component={NotificationScreen}
            options={{
              headerTitle: "알림",
              headerTitleAlign: "center",
              headerShown: true,
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Invite"
            component={InviteScreen}
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="MakingInput"
            component={MakingInput}
            options={{
              headerTitle: "댓글 달기",
              headerShown: true,
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
        </Stack.Navigator>
      </NavigationContainer>
    </BottomTabContextProvider>
  );
};
export default StackNavigation;
