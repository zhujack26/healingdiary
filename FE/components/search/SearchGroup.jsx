import { Text, View, StyleSheet } from "react-native";

const SearchGroup = () => {
  return (
    <View style={styles.container}>
      <Text>소모임 검색 결과</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default SearchGroup;
