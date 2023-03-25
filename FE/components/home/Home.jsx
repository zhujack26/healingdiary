import { ScrollView, StyleSheet, Dimensions } from "react-native";

import RecommendDiary from "./RecommendDiary";
import RecommendGroup from "./RecommendGroup";
import RecentDiary from "./RecentDiary";

const { width, height } = Dimensions.get("window");

const GROUP = [
  {
    id: 0,
    name: "소모임 제목",
    hashtags: ["해시태그", "해해태그"],
    image: require("../../assets/images/SAMPLE6.png"),
    description: "소모임 설명 설명 설명",
  },
  {
    id: 1,
    name: "소모임 제목2",
    hashtags: ["해시그", "해태그"],
    image: require("../../assets/images/SAMPLE5.png"),
    description: "소모임 명명설설",
  },
  {
    id: 2,
    name: "소모임 제목2",
    hashtags: ["해시그", "해태그"],
    image: require("../../assets/images/SAMPLE4.png"),
    description: "소모임 명명설설",
  },
];

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <RecommendGroup groups={GROUP} />
      <RecommendDiary />
      <RecentDiary />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    paddingHorizontal: 16,
  },
});
