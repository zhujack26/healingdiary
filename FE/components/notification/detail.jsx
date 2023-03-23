import React from "react";
import { Image, Text, StyleSheet, FlatList, View } from "react-native";

const DATA = [
  {
    id: "1",
    name: "누구",
    comment: "내 댓글에 대댓글을 작성했습니다.",
    time: "53",
  },
  {
    id: "2",
    name: "누구",
    comment: "내 일기에 댓글을 작성했습니다. ",
    time: "53",
  },
];

const Item = ({ name, comment, time }) => (
  <View style={styles.item}>
    <Image
      style={styles.image}
      source={require("../../assets/images/SAMPLE1.png")}
    />
    <View style={styles.textContainer}>
      <Text style={styles.text}>
        {name}님이 {comment}
      </Text>
      <Text style={styles.time}>{time}분 전</Text>
    </View>
  </View>
);

const Detail = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item name={item.name} comment={item.comment} time={item.time} />
        )}
        keyExtractor={(item) => item.id}
      />
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
});

export default Detail;
