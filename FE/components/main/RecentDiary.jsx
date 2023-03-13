import { View, Image, StyleSheet, Text } from "react-native";
import Title from "../../ui/Title";
import { GlobalColors } from "./../../constants/color";

const RecentDiary = () => {
  return (
    <View>
      <Title>최근 일기</Title>
      <View style={styles.recentDiaries}>
        <View style={styles.recentDiary}>
          <Image
            source={require("../../assets/images/SAMPLE4.png")}
            style={styles.image}
          />
          <View style={styles.hashtag}>
            <Text style={styles.tagText}>#해시태그</Text>
          </View>
        </View>
        <View style={styles.recentDiary}>
          <Image
            source={require("../../assets/images/SAMPLE4.png")}
            style={styles.image}
          />
          <View style={styles.hashtag}>
            <Text style={styles.tagText}>#해시태그</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RecentDiary;

const styles = StyleSheet.create({
  image: {
    position: "relative",
    width: 150,
    height: 160,
    borderRadius: 12,
  },
  hashtag: {
    minWidth: 75,
    height: 25,
    borderRadius: 16,
    backgroundColor: GlobalColors.colors.white500,
    position: "absolute",
    top: 10,
    left: 10,
  },
  tagText: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    fontSize: 12,
    color: GlobalColors.colors.primary500,
    textAlign: "center",
    marginTop: 5,
  },
  recentDiaries: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 8,
  },
  recentDiary: {
    marginRight: 30,
  },
});
