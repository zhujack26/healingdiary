import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import { GlobalColors } from "../../constants/color";

const { width } = Dimensions.get("window");

const RecommendDiaryListItem = ({ item }) => {
  return (
    <View style={styles.diaries}>
      <View style={styles.diary}>
        <Image source={item?.image} style={styles.image} />
        <View style={styles.hashtag}>
          <Text style={styles.hashtagText}>#{item?.hashtags}</Text>
        </View>
      </View>
    </View>
  );
};

export default RecommendDiaryListItem;

const styles = StyleSheet.create({
  diaries: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  diary: {
    marginBottom: 8,
    marginRight: 8,
  },

  image: {
    width: width / 3,
    height: width / 2.5,
    borderRadius: 12,
  },

  hashtag: {
    position: "absolute",
    top: 8,
    left: 8,
    minWidth: 65,
    height: 25,
    backgroundColor: GlobalColors.colors.white500,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },

  hashtagText: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    fontSize: 12,
    color: GlobalColors.colors.primary500,
  },
});
