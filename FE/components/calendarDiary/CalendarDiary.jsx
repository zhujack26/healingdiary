import { SafeAreaView, StyleSheet, Dimensions, FlatList } from "react-native";
import CalendarDiaryListItem from "./CalendarDiaryListItem";

const { width } = Dimensions.get("window");

const DATA = {
  content: [
    {
      diaryId: 4,
      imageUrl: require("../../assets/images/SAMPLE2.png"),
      createdDate: "2023-03-21 00:00:00",
      emotion: {
        emotionCode: 2,
        value: "슬픔",
      },
      tags: ["태그3", "태그1"],
    },
    {
      diaryId: 7,
      imageUrl: require("../../assets/images/SAMPLE1.png"),
      createdDate: "2023-03-20 12:00:00",
      emotion: {
        emotionCode: 2,
        value: "슬픔",
      },
      tags: [],
    },
    {
      diaryId: 5,
      imageUrl: require("../../assets/images/SAMPLE3.png"),
      createdDate: "2023-03-20 11:00:00",
      emotion: {
        emotionCode: 2,
        value: "슬픔",
      },
      tags: [],
    },
    {
      diaryId: 6,
      imageUrl: require("../../assets/images/SAMPLE5.png"),
      createdDate: "2023-03-20 10:00:00",
      emotion: {
        emotionCode: 1,
        value: "기쁨",
      },
      tags: [],
    },
    {
      diaryId: 3,
      imageUrl: require("../../assets/images/SAMPLE6.png"),
      createdDate: "2023-03-20 00:00:00",
      emotion: {
        emotionCode: 1,
        value: "기쁨",
      },
      tags: ["태그2"],
    },
  ],
};

const CalendarDiary = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA.content}
        renderItem={({ item }) => <CalendarDiaryListItem content={item} />}
      />
    </SafeAreaView>
  );
};

export default CalendarDiary;
const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
    alignItems: "center",
  },
});
