import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { GlobalColors } from "../../constants/color";
import { Ionicons } from "@expo/vector-icons";

const comment = [
  {
    children: ["별론데?", "별로인데?", "별로네"],
    commentId: "1",
    content: "댓글이지",
    datetime: "2023-03-23T13:47:02.140Z",
    memberId: 0,
    memberImageUrl: "",
    nickname: "닉네임임",
    parentId: 1,
  },
  {
    children: null,
    commentId: "2",
    content: "두번째 댓글임",
    datetime: "2023-03-23T13:47:02.140Z",
    memberId: 1,
    memberImageUrl: "",
    nickname: "닉네임임",
    parentId: 2,
  },
];

const { width } = Dimensions.get("window");

const Comment = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.commentInfoContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/images/SAMPLE3.png")}
            />
          </View>
          <View style={styles.commentHeader}>
            <View>
              <Text style={[styles.nickname, styles.bold]}>닉네임</Text>
              <Text style={styles.time}>1일전</Text>
            </View>

            <View>
              <Ionicons
                name="ellipsis-horizontal-sharp"
                size={24}
                color={GlobalColors.colors.black500}
              />
            </View>
          </View>
        </View>
        <View style={styles.commentContainer}>
          <Text style={styles.comment}>
            댓글이깁니다.댓글이깁니다.댓글이깁니다.댓글이깁니다.댓글이깁니다.댓글이깁니다.댓글이깁니다.댓글이깁니다.
            댓글이깁니다.댓글이깁니다.댓글이깁니다.
          </Text>
        </View>
        <View style={styles.repleContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/images/SAMPLE4.png")}
            />
          </View>
          <View style={styles.repleInfoContainer}>
            <View style={styles.nicknameContainer}>
              <Text style={[styles.nickname, styles.bold]}>
                닉네임­˘
                <Text style={styles.comment}>글내용댓글내용댓글내용</Text>
              </Text>
            </View>
            <Text style={styles.time}>
              2일전 <Text style={styles.nestedReply}>댓글</Text>
            </Text>
          </View>
        </View>

        <View style={styles.repleContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/images/SAMPLE4.png")}
            />
          </View>
          <View style={styles.repleInfoContainer}>
            <View style={styles.nicknameContainer}>
              <Text style={[styles.nickname, styles.bold]}>
                닉네임­˘
                <Text style={styles.comment}>글내용댓글내용댓글내용</Text>
              </Text>
            </View>
            <Text style={styles.time}>
              2일전 <Text style={styles.nestedReply}>댓글</Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.commentInfoContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/images/SAMPLE3.png")}
            />
          </View>
          <View style={styles.commentHeader}>
            <View>
              <Text style={[styles.nickname, styles.bold]}>닉네임</Text>
              <Text style={styles.time}>1일전</Text>
            </View>

            <View>
              <Ionicons
                name="ellipsis-horizontal-sharp"
                size={24}
                color={GlobalColors.colors.black500}
              />
            </View>
          </View>
        </View>
        <View style={styles.commentContainer}>
          <Text style={styles.comment}>
            댓글이깁니다.댓글이깁니다.댓글이깁니다.댓글이깁니다.댓글이깁니다.댓글이깁니다.댓글이깁니다.댓글이깁니다.
            댓글이깁니다.댓글이깁니다.댓글이깁니다.
          </Text>
        </View>
        <View style={styles.repleContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/images/SAMPLE4.png")}
            />
          </View>
          <View style={styles.repleInfoContainer}>
            <View style={styles.nicknameContainer}>
              <Text style={[styles.nickname, styles.bold]}>
                닉네임­˘
                <Text style={styles.comment}>글내용댓글내용댓글내용</Text>
              </Text>
            </View>
            <Text style={styles.time}>
              2일전 <Text style={styles.nestedReply}>댓글</Text>
            </Text>
          </View>
        </View>

        <View style={styles.repleContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/images/SAMPLE4.png")}
            />
          </View>
          <View style={styles.repleInfoContainer}>
            <View style={styles.nicknameContainer}>
              <Text style={[styles.nickname, styles.bold]}>
                닉네임­˘
                <Text style={styles.comment}>글내용댓글내용댓글내용</Text>
              </Text>
            </View>
            <Text style={styles.time}>
              2일전 <Text style={styles.nestedReply}>댓글</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingHorizontal: 16,
  },

  wrapper: {
    marginBottom: 16,
  },

  commentInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  imageContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
  },

  commentHeader: {
    width: width - 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nickname: {
    fontFamily: "KoddiUDOnGothic-Regular",
    fontSize: 12,
    marginBottom: 3,
  },

  time: {
    fontFamily: "KoddiUDOnGothic-Regular",
    fontSize: 10,
    color: GlobalColors.colors.gray500,
  },

  commentContainer: {
    width: "65%",
    marginLeft: 44,
    marginBottom: 8,
  },

  comment: {
    fontFamily: "KoddiUDOnGothic-Regular",
    fontSize: 12,
    color: GlobalColors.colors.black500,
  },

  repleContainer: {
    width: "60%",
    marginLeft: 44,
    flexDirection: "row",
    marginBottom: 16,
  },

  repleInfoContainer: {},

  bold: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
  },

  nestedReply: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    fontSize: 10,
  },
});
