import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { GlobalColors } from "./../../constants/color";

const GroupMemberListItem = ({ data, groupId, callRejectMember, host }) => {
  return (
    <View style={styles.userContainer}>
      <View style={styles.userInfo}>
        <Image source={{ uri: data?.memberImageUrl }} style={styles.image} />
        <Text style={styles.userNickname}>{data?.nickname}</Text>
      </View>
      {host && (
        <Pressable
          style={styles.dropButton}
          onPress={() => {
            callRejectMember(groupId, data?.memberId);
          }}
        >
          <Text style={styles.dropText}>내보내기</Text>
        </Pressable>
      )}
    </View>
  );
};

export default GroupMemberListItem;

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

  dropButton: {
    width: 80,
    height: 30,
    backgroundColor: GlobalColors.colors.red500,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },

  dropText: {
    fontFamily: "KoddiUDOnGothic-Regular",
    color: GlobalColors.colors.white500,
  },
});
