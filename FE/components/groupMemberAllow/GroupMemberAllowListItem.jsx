import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { GlobalColors } from "./../../constants/color";

const GroupMemberAllowListItem = ({
  data,
  groupId,
  callApprovalMember,
  callRejectMember,
}) => {
  return (
    <View style={styles.userContainer}>
      <View style={styles.userInfo}>
        <Image source={{ uri: data?.memberImageUrl }} style={styles.image} />
        <Text style={styles.userNickname}>{data?.nickname}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.allow, styles.button]}
          onPress={() => {
            callApprovalMember(data?.clubMemberId);
          }}
        >
          <Text style={styles.buttonText}>승인</Text>
        </Pressable>
        <Pressable
          style={[styles.refuse, styles.button]}
          onPress={() => {
            callRejectMember(groupId, data?.memberId);
          }}
        >
          <Text style={styles.buttonText}>거절</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default GroupMemberAllowListItem;

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },

  userNickname: {
    fontFamily: "KoddiUDOnGothic-Regular",
    fontSize: 16,
  },

  buttonContainer: {
    flexDirection: "row",
  },

  allow: {
    backgroundColor: GlobalColors.colors.primary500,
  },

  refuse: {
    backgroundColor: GlobalColors.colors.red500,
    marginLeft: 8,
  },

  button: {
    width: 60,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },

  buttonText: {
    fontFamily: "KoddiUDOnGothic-Regular",
    color: GlobalColors.colors.white500,
  },
});
