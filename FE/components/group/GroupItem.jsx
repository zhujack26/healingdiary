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

const { width, height } = Dimensions.get("window");

const GroupItem = ({ content, navigation }) => {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("groupDetail", { groupId: content.clubId })
      }
    >
      <View style={styles.container}>
        <View>
          <Image
            source={{ uri: content?.clubImageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.hashtags}>
            {content?.tags.map((hashtag, index) => (
              <View style={styles.hashtag} key={index}>
                <Text style={styles.tagText}>#{hashtag}</Text>
              </View>
            ))}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{content?.name}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default GroupItem;

const styles = StyleSheet.create({
  container: {
    width: width,
    marginBottom: 26,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: width - 35,
    height: height / 4,
    borderRadius: 12,
    marginRight: 4,
  },

  hashtags: {
    minWidth: 75,
    height: 25,
    flexDirection: "row",
    position: "absolute",
    top: 10,
    left: 15,
    justifyContent: "center",
  },

  hashtag: {
    backgroundColor: GlobalColors.colors.white500,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },

  tagText: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    fontSize: 12,
    color: GlobalColors.colors.primary500,
    paddingHorizontal: 10,
    textAlign: "center",
    textAlignVertical: "center",
  },

  infoContainer: {
    position: "absolute",
    bottom: 10,
    left: 15,
  },

  title: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    fontSize: 16,
    color: GlobalColors.colors.white500,
  },

  description: {
    fontFamily: "KoddiUDOnGothic-Regular",
    fontSize: 12,
    color: GlobalColors.colors.white500,
  },
});
