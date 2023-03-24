import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HeaderRightButtons = ({ navigation }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
        <MaterialCommunityIcons
          name="bell"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("userinform")}>
        <View>
          <Image
            style={styles.img}
            source={require("../assets/images/SAMPLE1.png")}
          />
        </View>
      </TouchableOpacity>
    </View>
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

export default HeaderRightButtons;
