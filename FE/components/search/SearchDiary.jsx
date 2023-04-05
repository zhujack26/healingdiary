import { FlatList, KeyboardAvoidingView, StyleSheet } from "react-native";
import DiaryItem from "../diary/DiaryItem";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getSearchDiary } from "../../api/diary";

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
      tags: ["태그5"],
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

const SearchDiary = ({ search }) => {
  const navigation = useNavigation();
  const [diaries, setDiaries] = useState([]);

  const callSearchDiary = async () => {
    const res = await getSearchDiary(search);
    setDiaries(res.data);
  };

  useEffect(() => {
    callSearchDiary();
  }, [search]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <FlatList
        data={diaries.content}
        renderItem={({ item }) => (
          <DiaryItem content={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.diaryId}
      />
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
export default SearchDiary;
