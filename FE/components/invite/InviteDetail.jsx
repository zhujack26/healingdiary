import React from "react";
import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { DATA } from "../../model/DataInvite";

const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours < 1) {
    return `${minutes}분 전`;
  } else if (hours >= 1 && hours < 24) {
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(hours / 24);
    return `${days}일 전`;
  }
};

const Item = ({ name, time }) => (
  <View style={styles.item}>
    <Image
      style={styles.image}
      source={require("../../assets/images/SAMPLE1.png")}
    />
    <View style={styles.textContainer}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.time}>{formatTime(time)}</Text>
    </View>
    <TouchableOpacity style={styles.inviteButton}>
      <Text style={styles.inviteButtonText}>초대하기</Text>
    </TouchableOpacity>
  </View>
);
const InviteDetail = () => {
  const [data, setData] = React.useState(DATA);
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
    backgroundColor: "blue",
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
