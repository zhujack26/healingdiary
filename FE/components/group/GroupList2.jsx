import {
  StatusBar,
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
} from "react-native";
import { GlobalColors } from "../../constants/color";

import Title from "../../ui/Title";
const deviceWidth = Dimensions.get("window").width - 50;

const DATA = [
  {
    id: "a",
    title: "소모임 이름",
    hashtag: "#해시태그",
  },
  {
    id: "b",
    title: "소모임 이름",
    hashtag: "#해시태그",
  },
  {
    id: "c",
    title: "소모임 이름",
    hashtag: "#해시태그",
  },
];


const Item = ({ title, hashtag }) => (
  <View style={styles.item}>
    <Image
      source={require("../../assets/images/SAMPLE1.png")}
      style={styles.image}
    />
    <View style={styles.body}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.hashtag}>{hashtag}</Text>
    </View>
  </View>
);

const GroupList2 = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Title>내 소모임 </Title>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item title={item.title} hashtag={item.hashtag} />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: GlobalColors.colors.white500,
    padding: 30,
    marginVertical: 12,
    borderRadius: 12,
    flexDirection: "row",
  },
  body: {
    flexDirection: "column",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  title: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 14,
  },
  hashtag: {
    color: GlobalColors.colors.primary500,
    paddingTop: 10,
    marginLeft: 10,
  },
});
export default GroupList2;
