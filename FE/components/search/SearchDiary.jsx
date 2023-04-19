import { FlatList, KeyboardAvoidingView, StyleSheet } from "react-native";
import DiaryItem from "../diary/DiaryItem";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getSearchDiary } from "../../api/diary";

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
