import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { GlobalColors } from "../../constants/color";
import Title from "../../ui/Title";

const { width, height } = Dimensions.get("window");
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
    width: width - 30,
    marginBottom: 26,
  },
  wrapper: {},
  diaries: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  image: {
    width: width / 3.5,
    height: width / 2.5,
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
