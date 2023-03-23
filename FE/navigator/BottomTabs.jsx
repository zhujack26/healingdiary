import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Platform, TouchableOpacity, View } from "react-native";
import { GlobalColors } from "../constants/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CalendarScreen from "../screens/CalendarScreen";
import GroupScreen from "../screens/GroupScreen";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          height: 80,
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
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Notification")}
              >
                <MaterialCommunityIcons
                  name="bell"
                  size={24}
                  color="black"
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Notification")}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 50,
                    borderWidth: 1,
                    marginRight: 30,
                    marginTop: 3,
                  }}
                ></View>
              </TouchableOpacity>
            </View>
          ),
          title: "메인",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Group"
        component={GroupScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-people-outline" color={color} size={size} />
          ),
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
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
