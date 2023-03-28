import { FlatList, KeyboardAvoidingView, StyleSheet } from "react-native";
import DiaryItem from "../diary/DiaryItem";
import { DATA } from "../../model/DataDiary";
const SearchDiary = () => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <DiaryItem id={item.id} hashtags={item.hashtags} date={item.date} />
        )}
        keyExtractor={(item) => item.id}
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
