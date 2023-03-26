import { View, Text, StyleSheet, FlatList } from "react-native";
import { GlobalColors } from "../../constants/color";

const renderHashTagItem = ({ item }) => {
  return (
    <View style={styles.hashtag}>
      <Text style={styles.hashtagText}>#{item}</Text>
    </View>
  );
};

const Hashtag = ({ tags }) => {
  return (
    <View style={styles.container}>
      <FlatList data={tags} renderItem={renderHashTagItem} horizontal />
    </View>
  );
};

export default Hashtag;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: 16,
    marginVertical: 12,
  },

  hashtag: {
    alignItems: "center",
    justifyContent: "center",
    width: 85,
    height: 30,
    backgroundColor: GlobalColors.colors.primary500,
    borderRadius: 12,
    marginRight: 8,
  },

  hashtagText: {
    fontFamily: "KoddiUDOnGothic-Regular",
    fontSize: 12,
    color: GlobalColors.colors.white500,
  },
});
