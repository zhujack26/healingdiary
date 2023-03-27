import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Platform, StyleSheet } from "react-native";
import { GlobalColors } from "../constants/color";
import { useTabMenu } from "../context/BottomTabContext";

import CalendarScreen from "../screens/CalendarScreen";
import GroupScreen from "../screens/GroupScreen";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import HeaderRightButtons from "../ui/HeaderRightButtons";
import AddButton from "./../ui/AddButton";

const Tab = createBottomTabNavigator();
const BottomTabs = () => {
  const { opened, toggleOpened } = useTabMenu();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "relative",
          bottom: 0,
          height: 70,
          backgroundColor: GlobalColors.colors.white500,
          borderTopRightRadius: Platform.OS === "ios" ? 0 : 24,
          borderTopLeftRadius: Platform.OS === "ios" ? 0 : 24,
          borderColor: GlobalColors.colors.gray400,
          borderWidth: 1,
        },
        headerStyle: {
          backgroundColor: GlobalColors.colors.background500,
        },
        headerTintColor: GlobalColors.colors.black500,
        headerTitleStyle: {
          fontFamily: "KoddiUDOnGothic-ExtraBold",
          fontSize: 24,
        },
        tabBarActiveTintColor: GlobalColors.colors.secondary500,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightButtons navigation={navigation} />,
          headerShadowVisible: false,
          title: "메인",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        })}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-sharp" color={color} size={size} />
          ),
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />

      <Tab.Screen
        name="Add"
        component={HomeScreen}
        options={{
          tabBarItemStyle: { height: 0 },
          tabBarButton: ({ keyboardHidesTabBar }) => (
            <AddButton
              keyboardHidesTabBar={keyboardHidesTabBar}
              opened={opened}
              toggleOpened={toggleOpened}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Group"
        component={GroupScreen}
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightButtons navigation={navigation} />,
          title: "소모임",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-people-outline" color={color} size={size} />
          ),
        })}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitle: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-search" color={color} size={size} />
          ),
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  img: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginRight: 30,
  },
});
export default BottomTabs;
