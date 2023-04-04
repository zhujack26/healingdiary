import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { GlobalColors } from "./../../constants/color";

const { width } = Dimensions.get("window");

const GroupDiaryListItem = ({ data }) => {
  console.log("data", data);
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/SAMPLE1.png")}
        style={styles.image}
      />
      <View>
        <View style={styles.groupDiaryInfo}>
          <Text>{}</Text>
        </View>
        <View style={styles.hashtags}>
          {/* {hashtags.map((hashtag, index) => (
            <Text key={index} style={styles.hashtag}>
              {hashtag}
            </Text>
          ))} */}
        </View>
      </View>
    </View>
  );
};

export default GroupDiaryListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: width - 50,
    height: 90,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    backgroundColor: GlobalColors.colors.white500,
    alignItems: "center",
    padding: 24,
    marginBottom: 16,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },

  groupDiaryInfo: {
    marginBottom: 20,
  },

  hashtags: {
    flexDirection: "row",
    justifyContent: "center",
  },

  hashtag: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    fontSize: 12,
    color: GlobalColors.colors.primary500,
  },

  text: {
    fontSize: 24,
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    color: GlobalColors.colors.primary500,
  },
});
