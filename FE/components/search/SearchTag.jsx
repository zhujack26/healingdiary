import { View, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { getSearchTagDiary } from "../../api/diary";
import DiaryItem from "../diary/DiaryItem";

const SearchTag = ({ search }) => {
  const navigation = useNavigation();
  const [diaries, setDiaries] = useState([]);

  const callSearchDiary = async () => {
    const res = await getSearchTagDiary(search);
    setDiaries(res.data);
  };

  useEffect(() => {
    callSearchDiary();
  }, [search]);
  return (
    <View style={styles.container}>
      <FlatList
        data={diaries.content}
        renderItem={({ item }) => (
          <DiaryItem content={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.diaryId}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default SearchTag;
