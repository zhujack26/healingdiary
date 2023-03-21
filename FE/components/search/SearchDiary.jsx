import { Text, View, StyleSheet } from "react-native";

const SearchDiary = () => {
  return (
    <View style={styles.container}>
      <Text>일기 검색 결과 </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default SearchDiary;
