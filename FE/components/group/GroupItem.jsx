import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { GlobalColors } from "../../constants/color";

const deviceWidth = Dimensions.get("window").width - 50;

const GroupItem = ({ title, hashtag, navigation }) => (
  <Pressable
    style={styles.item}
    onPress={() => {
      navigation.navigate("groupDetail");
    }}
  >
    <Image
      source={require("../../assets/images/SAMPLE1.png")}
      style={styles.image}
    />
    <View style={styles.body}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.hashtag}>{hashtag}</Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    width: deviceWidth,
    height: 90,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    backgroundColor: GlobalColors.colors.white500,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 24,
    marginBottom: 16,
  },
  body: {
    justifyContent: "center",
    marginLeft: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  title: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 14,
  },
  hashtag: {
    color: GlobalColors.colors.primary500,
    paddingTop: 10,
    marginLeft: 10,
  },
});

export default GroupItem;
