import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { GlobalColors } from "./../../constants/color";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const GroupIntroduction = ({
  navigation,
  groupData,
  groupId,
  signupGroup,
  isMember,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const handleSignupGroup = () => {
    setIsDisabled(true);
    signupGroup(groupId);
    Alert.alert("가입 신청이 완료되었습니다.");
  };
  return (
    <>
      <View style={styles.groupInfo}>
        <View>
          <Text style={styles.groupName}>{groupData.name}</Text>
          <View style={styles.groupInviteContainer}>
            {groupData.host && (
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
            )}
            {groupData.host && <Text style={styles.inviteText}>초대</Text>}
          </View>
        </View>
        {isMember ? (
          <Pressable style={styles.buttonContainer} onPress={() => {}}>
            <Text style={styles.buttonText}>글쓰기</Text>
          </Pressable>
        ) : (
          <Pressable
            style={[
              styles.buttonContainer,
              isDisabled && styles.disabledButton,
            ]}
            onPress={handleSignupGroup}
            disabled={isDisabled}
          >
            <Text style={styles.buttonText}>가입하기</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.groupIntrocutionContainer}>
        <Text style={styles.groupIntrocutionText}>{groupData.description}</Text>
      </View>
      <View style={styles.hashtags}>
        {groupData.tags?.map((tag, index) => (
          <View key={index} style={styles.hashtag}>
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
    width: width,
  },

  groupName: {
    width: 200,
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    fontSize: 24,
    marginBottom: 16,
    flexWrap: "wrap",
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
    flexDirection: "row",
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
    marginRight: 36,
  },

  disabledButton: {
    opacity: 0.5,
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
