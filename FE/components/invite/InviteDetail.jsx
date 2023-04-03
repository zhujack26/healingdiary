import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { getInviteGroupMemberList } from "../../api/group";
import { GlobalColors } from "./../../constants/color";

const Item = ({ item }) => {
  const [backgroundColor, setBackgroundColor] = useState("blue");

  const toggleBackgroundColor = () => {
    setBackgroundColor((prevColor) => (prevColor === "blue" ? "gray" : "blue"));
  };

  return (
    <View style={styles.item}>
      <Image style={styles.image} source={{ uri: item.memberImageUrl }} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.nickname}</Text>
      </View>
      <TouchableOpacity
        style={[styles.inviteButton, { backgroundColor: backgroundColor }]}
        onPress={toggleBackgroundColor}
      >
        <Text style={styles.inviteButtonText}>초대하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const InviteDetail = ({ groupId }) => {
  const [data, setData] = useState([]);

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
        <Item key={item.memberId} item={item} />
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
