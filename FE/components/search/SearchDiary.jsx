import { FlatList, View, StyleSheet } from "react-native";
import DiaryItem from "../diary/DiaryItem";
import { DATA } from "../../model/DataDiary";
const SearchDiary = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <DiaryItem id={item.id} hashtags={item.hashtags} date={item.date} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
export default SearchDiary;
