import { ScrollView, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

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

const DIARYIES = [
  {
    id: 0,
    hashtags: "감정1",
    image: require("../../assets/images/SAMPLE6.png"),
  },
  {
    id: 1,
    hashtags: "감정2",
    image: require("../../assets/images/SAMPLE5.png"),
  },
  {
    id: 2,
    hashtags: "감정3",
    image: require("../../assets/images/SAMPLE4.png"),
  },
  {
    id: 3,
    hashtags: "감정4",
    image: require("../../assets/images/SAMPLE3.png"),
  },
  {
    id: 4,
    hashtags: "감정5",
    image: require("../../assets/images/SAMPLE1.png"),
  },
];
const Home = () => {
  const navigation = useNavigation();
  const navigateToScreen = (screen, id) => {
    navigation.navigate(screen, { id: id });
  };

  return (
    <ScrollView style={styles.container}>
      <RecommendGroup groups={GROUP} navigateToScreen={navigateToScreen} />
      <RecommendDiary diaries={DIARYIES} navigateToScreen={navigateToScreen} />
      <RecentDiary diaries={DIARYIES} navigateToScreen={navigateToScreen} />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    paddingHorizontal: 16,
  },
});
