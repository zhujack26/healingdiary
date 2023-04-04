import { Text, View, StyleSheet } from "react-native";

const SearchTag = () => {
  return (
    <View style={styles.container}>
      <Text>해시태그 검색 결과</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default SearchTag;
