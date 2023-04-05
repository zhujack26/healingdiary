import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { GlobalColors } from "../../constants/color";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { timeAgo } from "../../util/time";
import ReplyListItem from "./ReplyListItem";

const CommentListItem = ({
  diaryId,
  comment,
  callDeleteComment,
  callReplyDeleteComment,
  memberId,
}) => {
  const navigation = useNavigation();

  const navigateToMakingInput = () => {
    navigation.navigate("MakingInput", {
      diaryId: diaryId,
      parentId: comment?.commentId,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.container2}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: comment?.memberImageUrl }}
            />
          </View>
          <View style={styles.commentContainer}>
            <Text style={[styles.bold, styles.text]}>{comment?.nickname}</Text>
            <Text style={[styles.regular, styles.text2]}>
              {comment?.content}
            </Text>
          </View>
        </View>
        <View style={styles.etc}>
          <Text style={[styles.regular, styles.time]}>
            {timeAgo(comment?.datetime)}
          </Text>
          <Pressable onPress={navigateToMakingInput}>
            <Text style={[styles.regular, styles.reply]}>답글 달기</Text>
          </Pressable>
          {memberId === comment?.memberId.toString() && (
            <Pressable
              style={styles.trash}
              onPress={() => callDeleteComment(comment?.commentId)}
            >
              <AntDesign name="delete" size={12} color="gray" />
            </Pressable>
          )}
        </View>
      </View>
      {/* 대댓글 */}
      <View style={styles.replyList}>
        <FlatList
          data={comment?.children}
          renderItem={({ item }) => (
            <ReplyListItem
              reply={item}
              diaryId={diaryId}
              callReplyDeleteComment={callReplyDeleteComment}
              memberId={memberId}
            />
          )}
          keyExtractor={(item) => item.commentId}
        />
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
    fontFamily: "KoddiUDOnGothic-ExtraBold",
  },
  container: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  container1: {},
  container2: {
    flexDirection: "row",
  },
  container3: {
    paddingLeft: 50,
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
  },
  reply: {
    color: GlobalColors.colors.gray500,
    fontSize: 10,
    paddingLeft: 15,
  },
  replyList: {
    paddingLeft: 50,
  },
  trash: {
    paddingLeft: 15,
  },
});
