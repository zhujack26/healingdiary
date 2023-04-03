import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { GlobalColors } from "./../../constants/color";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const GroupIntroduction = ({ navigation, groupData, groupId }) => {
  return (
    <>
      <View style={styles.groupInfo}>
        <View>
          <Text style={styles.groupName}>{groupData.name}</Text>
          <View style={styles.groupInviteContainer}>
            <Text style={styles.groupMemberCount}>멤버 12</Text>
            <Pressable
              style={styles.circle}
              onPress={() =>
                navigation.navigate("Invite", { groupId: groupId })
              }
            >
              <Ionicons
                name="add"
                color={GlobalColors.colors.white500}
                size={16}
              />
            </Pressable>
            <Text style={styles.inviteText}>초대</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>글쓰기</Text>
        </View>
      </View>
      <View style={styles.groupIntrocutionContainer}>
        <Text style={styles.groupIntrocutionText}>{groupData.description}</Text>
      </View>
      <View style={styles.hashtags}>
        {groupData.tags?.map((tag) => (
          <View key={tag.id} style={styles.hashtag}>
            <Text style={styles.hashtagText}>#{tag}</Text>
          </View>
        ))}
      </View>
    </>
  );
};

export default GroupIntroduction;

const styles = StyleSheet.create({
  groupInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  groupName: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    fontSize: 24,
    marginBottom: 16,
  },

  groupInviteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  groupMemberCount: {
    fontFamily: "KoddiUDOnGothic-Regular",
    fontSize: 12,
    marginRight: 8,
  },

  circle: {
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: GlobalColors.colors.primary500,
    marginRight: 5,
  },

  inviteText: {
    fontSize: 12,
    color: GlobalColors.colors.primary500,
  },
  buttonContainer: {
    width: 85,
    height: 35,
    borderRadius: 16,
    backgroundColor: GlobalColors.colors.primary500,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontFamily: "KoddiUDOnGothic-Regular",
    color: GlobalColors.colors.white500,
    fontSize: 12,
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
