import React from "react";
import { Image, Text, StyleSheet, FlatList, View } from "react-native";
import { DATA } from "../../model/DataNotification";

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

const Item = ({ name, location, action, time }) => (
  <View style={styles.item}>
    <Image
      style={styles.image}
      source={require("../../assets/images/SAMPLE1.png")}
    />
    <View style={styles.textContainer}>
      <Text style={styles.text}>
        {name}님이 {location}에서 {action}
      </Text>
      <Text style={styles.time}>{formatTime(time)}</Text>
    </View>
  </View>
);
const Detail = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            name={item.name}
            location={item.location}
            action={item.action}
            time={item.time}
          />
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
