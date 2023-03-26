import { View, Text, Image, StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/color";

const ReplyListItem = ({ item }) => {
  return (
    <View style={styles.replyContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/images/SAMPLE3.png")}
        />
      </View>
      <View style={styles.replyCommentContainer}>
        <Text style={[styles.bold, styles.text]}>
          {item.nickname}{" "}
          <Text style={[styles.regular, styles.text]}>{item.content}</Text>
        </Text>
      </View>
    </View>
  );
};

export default ReplyListItem;

const styles = StyleSheet.create({
  bold: {
    fontFamily: "KoddiUDOnGothic-Bold",
  },
  regular: {
    fontFamily: "KoddiUDOnGothic-Regular",
  },

  replyContainer: {
    width: "80%",
    flexDirection: "row",
    marginTop: 8,
  },

  imageContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
  },

  replyCommentContainer: {
    flexDirection: "row",
  },

  text: {
    color: GlobalColors.colors.black500,
    fontSize: 12,
  },
});
