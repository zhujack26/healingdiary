import { View, Text, Image, StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/color";

const ReplyListItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/images/SAMPLE3.png")}
          />
        </View>
        <View style={styles.commentContainer}>
          <Text style={[styles.bold, styles.text]}>{item.nickname} </Text>
          <Text style={[styles.regular, styles.text]}>{item.content}</Text>
        </View>
      </View>
      <View style={styles.etc}>
        <Text style={[styles.regular, styles.time]}>1일전</Text>
        <Text style={[styles.regular, styles.reply]}>답글 달기</Text>
      </View>
    </View>
  );
};

export default ReplyListItem;

const styles = StyleSheet.create({
  regular: {
    fontFamily: "KoddiUDOnGothic-Regular",
  },

  bold: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
  },

  container: {
    paddingTop: 10,
  },
  container2: {
    flexDirection: "row",
  },
  etc: {
    flexDirection: "row",
    paddingLeft: 50,
  },
  imageContainer: {
    width: 42,
    height: 42,
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
  },

  commentContainer: {
    // width: "80%",
    paddingTop: 3,
    paddingBottom: 3,
    justifyContent: "space-around",
  },

  IconContainer: {
    position: "absolute",
    top: 0,
    right: 0,
  },

  text: {
    color: GlobalColors.colors.black500,
    fontSize: 12,
  },
  text2: {
    fontSize: 14,
  },

  time: {
    color: GlobalColors.colors.gray500,
    fontSize: 10,
    paddingRight: 15,
  },
  reply: {
    color: GlobalColors.colors.gray500,
    fontSize: 10,
  },
});
