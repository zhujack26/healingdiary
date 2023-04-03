import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { DATA } from "../../model/DataInvite";
import { useState, useEffect } from "react";
import { getInviteGroupMemberList } from "../../api/group";

const Item = ({ name }) => {
  const [backgroundColor, setBackgroundColor] = useState("blue");

  const toggleBackgroundColor = () => {
    setBackgroundColor((prevColor) => (prevColor === "blue" ? "gray" : "blue"));
  };

  return (
    <View style={styles.item}>
      <Image
        style={styles.image}
        source={require("../../assets/images/SAMPLE1.png")}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{name}</Text>
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

  console.log(data);
  const getInviteMemebr = async () => {
    const res = getInviteGroupMemberList(groupId);
    setData(res);
  };

  useEffect(() => {
    getInviteMemebr();
  }, []);
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <Item key={item.id} name={item.name} time={item.time} />
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
    backgroundColor: "white",
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
