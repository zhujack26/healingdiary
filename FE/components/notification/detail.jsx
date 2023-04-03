import React, { useEffect } from "react";
import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { DATA } from "../../model/DataNotification";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/color";

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
  const [data, setData] = React.useState(DATA);
  const [notice, setNotice] = useState([]);
  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const getNotice = useCallback(async () => {
    const res = await getNotification();
    setNotice(res ? res : []);
  }, []);

  useEffect(() => {
    getNotice();
  }, []);

  const renderItem = ({ item }) => (
    <Item
      name={item.name}
      location={item.location}
      action={item.action}
      time={item.time}
    />
  );

  const renderHiddenItem = (rowData, rowMap) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => {
        rowMap[rowData.item.id].closeRow();
        handleDelete(rowData.item.id);
      }}
    >
      <MaterialCommunityIcons name="trash-can" size={24} color="white" />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <SwipeListView
        data={data}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        disableRightSwipe
        keyExtractor={(item) => item.id}
        stopLeftSwipe={75}
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
  deleteButton: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 20,
    bottom: 0,
    right: 0,
    width: 75,
  },
});

export default Detail;
