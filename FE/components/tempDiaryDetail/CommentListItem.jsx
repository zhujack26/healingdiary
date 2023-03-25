import { View, StyleSheet, Text, Image, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/color";
import ReplyListItem from "./ReplyListItem";

const CommentListItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/images/SAMPLE3.png")}
        />
      </View>
      <View style={styles.commnetContainer}>
        <View>
          <Text style={[styles.regular, styles.text]}>{item?.nickname}</Text>
          <Text style={[styles.regular, styles.time]}>1일전</Text>
          <View>
            <Text style={[styles.regular, styles.text]}>{item?.content}</Text>
            {item.children && (
              <View>
                <FlatList renderItem={ReplyListItem} data={item?.children} />
              </View>
            )}
          </View>
        </View>

        <View style={styles.IconContainer}>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </View>
      </View>
    </View>
  );
};

export default CommentListItem;

const styles = StyleSheet.create({
  regular: {
    fontFamily: "KoddiUDOnGothic-Regular",
  },

  bold: {
    fontFamily: "KoddiUDOnGothic-Bold",
  },

  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 12,
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

  commnetContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

  time: {
    color: GlobalColors.colors.gray500,
    fontSize: 10,
  },
});
