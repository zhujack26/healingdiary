import { View, Text, Image, StyleSheet } from "react-native";
import Title from "../../ui/Title";
import { GlobalColors } from "./../../constants/color";

const RecommendDiary = () => {
  return (
    <View style={styles.container}>
      <Title>요즘 뜨는 일기</Title>
      <View style={styles.wrapper}>
        <View style={styles.diaries}>
          <View style={styles.diary}>
            <Image
              source={require("../../assets/images/SAMPLE1.png")}
              style={styles.image}
            />
            <Text style={styles.name}>소모임 이름</Text>
            <Text style={styles.hashtag}>#해시태그</Text>
          </View>
          <View style={styles.diary}>
            <Image
              source={require("../../assets/images/SAMPLE2.png")}
              style={styles.image}
            />
            <Text style={styles.name}>소모임 이름</Text>
            <Text style={styles.hashtag}>#해시태그</Text>
          </View>
          <View style={styles.diary}>
            <Image
              source={require("../../assets/images/SAMPLE3.png")}
              style={styles.image}
            />
            <Text style={styles.name}>소모임 이름</Text>
            <Text style={styles.hashtag}>#해시태그</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RecommendDiary;

const styles = StyleSheet.create({
  container: {
    marginBottom: 26,
  },
  wrapper: {
    marginLeft: 8,
  },
  diaries: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  diary: {
    marginRight: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  name: {
    fontFamily: "KoddiUDOnGothic-Regular",
    marginBottom: 3,
  },
  hashtag: {
    fontFamily: "KoddiUDOnGothic-Regular",
    fontSize: 10,
    color: GlobalColors.colors.gray600,
  },
});
