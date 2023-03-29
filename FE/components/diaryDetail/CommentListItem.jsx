import { View, StyleSheet, Text, Image, FlatList } from "react-native";
import { GlobalColors } from "../../constants/color";
import ReplyListItem from "./ReplyListItem";

const CommentListItem = ({ comment }) => {
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
          {/* 닉네임 */}
          <Text style={[styles.bold, styles.text]}>{comment?.nickname}</Text>
          {/* 댓글 */}
          <Text style={[styles.regular, styles.text2]}>{comment?.content}</Text>
        </View>
      </View>
      {/* 시간경과, 답글달기 */}
      <View style={styles.container3}>
        <View style={styles.etc}>
          <Text style={[styles.regular, styles.time]}>1일전</Text>
          <Text style={[styles.regular, styles.reply]}>답글 달기</Text>
        </View>
        {/* 대댓글 */}
        <View>
          {comment.children && (
            <FlatList renderItem={ReplyListItem} data={comment?.children} />
          )}
        </View>
      </View>
    </View>
  );
};

export default CommentListItem;

const styles = StyleSheet.create({
  deleteButton: {
    position: "absolute",
    right: 0,
    width: 70,
    justifyContent: "center",
    backgroundColor: "red",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  // regular: {
  //   fontFamily: "KoddiUDOnGothic-Regular",
  // },
  bold: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
  },

  container: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  container2: {
    flexDirection: "row",
  },
  container3: {
    paddingLeft: 50,
  },
  etc: {
    flexDirection: "row",
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
  // replyList: {
  //   marginLeft: 100,
  // },
});
