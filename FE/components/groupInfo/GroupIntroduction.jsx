import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { GlobalColors } from "./../../constants/color";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const GroupIntroduction = () => {
  return (
    <>
      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>소모임</Text>
      </View>
      <View style={styles.groupIntrocutionContainer}>
        <Text style={styles.groupIntrocutionText}>
          소모임 소개입니다.소모임 소개입니다.소모임 소개입니다.소모임
          소개입니다.소모임 소개입니다.
        </Text>
      </View>
      <View style={styles.hashtags}>
        <View style={styles.hashtag}>
          <Text style={styles.hashtagText}>#해시태그</Text>
        </View>

        <View style={styles.hashtag}>
          <Text style={styles.hashtagText}>#해시태그</Text>
        </View>

        <View style={styles.hashtag}>
          <Text style={styles.hashtagText}>#해시태그</Text>
        </View>
      </View>
    </>
  );
};

export default GroupIntroduction;

const styles = StyleSheet.create({
  groupName: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    fontSize: 24,
    marginBottom: 16,
  },

  groupIntrocutionContainer: {
    maxWidth: width - 40,
    marginTop: 16,
  },

  groupIntrocutionText: {
    fontFamily: "KoddiUDOnGothic-Regular",
    fontSize: 12,
    color: GlobalColors.colors.gray500,
  },

  hashtags: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 32,
  },

  hashtag: {
    width: 85,
    height: 30,
    borderRadius: 16,
    backgroundColor: GlobalColors.colors.primary500,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  hashtagText: {
    fontFamily: "KoddiUDOnGothic-Regular",
    color: GlobalColors.colors.white500,
    fontSize: 13,
    textAlign: "center",
  },
});
