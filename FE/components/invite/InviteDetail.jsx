import { useState, useEffect } from "react";
import { Image, Text, StyleSheet, View, Pressable } from "react-native";
import { getInviteGroupMemberList, inviteGroupMember } from "../../api/group";
import { GlobalColors } from "./../../constants/color";

const Item = ({ item, groupId }) => {
  const [backgroundColor, setBackgroundColor] = useState(
    GlobalColors.colors.primary500
  );

  const inviteMember = async () => {
    const res = await inviteGroupMember(groupId, item.memberId);
    return res;
  };

  const toggleBackgroundColor = async () => {
    if (backgroundColor === GlobalColors.colors.gray400) return;

    setBackgroundColor((prevColor) =>
      prevColor === GlobalColors.colors.primary500
        ? GlobalColors.colors.gray400
        : GlobalColors.colors.primary500
    );
    inviteMember();
  };

  return (
    <View style={styles.item}>
      <Image style={styles.image} source={{ uri: item.memberImageUrl }} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.nickname}</Text>
      </View>
      <Pressable
        style={[styles.inviteButton, { backgroundColor: backgroundColor }]}
        onPress={toggleBackgroundColor}
      >
        <Text style={styles.inviteButtonText}>초대하기</Text>
      </Pressable>
    </View>
  );
};

const InviteDetail = ({ groupId }) => {
  const [data, setData] = useState([]);

  // 초대할 수 있는 멤버 가져오기
  const getInviteMemebr = async () => {
    const res = await getInviteGroupMemberList(groupId);
    setData(res);
  };

  useEffect(() => {
    getInviteMemebr();
  }, []);
  return (
    <View style={styles.container}>
      {data?.map((item) => (
        <Item key={item.memberId} item={item} groupId={groupId} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: GlobalColors.colors.background500,
    marginBottom: 10,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 15,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
  },
  time: {
    fontSize: 14,
    color: "gray",
  },
  inviteButton: {
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 15,
  },
  inviteButtonText: {
    color: "white",
    fontSize: 14,
  },
});

export default InviteDetail;
