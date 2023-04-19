import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { GlobalColors } from "../../constants/color";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { timeAgo } from "../../util/time";

const ReplyListItem = ({
  reply,
  diaryId,
  memberId,
  callReplyDeleteComment,
}) => {
  const navigation = useNavigation();

  const navigateToMakingInput = () => {
    navigation.navigate("MakingInput", {
      diaryId: diaryId,
      parentId: reply?.parentId,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: reply?.memberImageUrl }} />
        </View>
        <View style={styles.commentContainer}>
          <Text style={[styles.bold, styles.text]}>{reply?.nickname} </Text>
          <Text style={[styles.regular, styles.text]}>{reply?.content}</Text>
        </View>
      </View>
      <View style={styles.etc}>
        <Text style={[styles.regular, styles.time]}>
          {timeAgo(reply?.datetime)}
        </Text>
        <Pressable onPress={navigateToMakingInput}>
          <Text style={[styles.regular, styles.reply]}>답글 달기</Text>
        </Pressable>
        {memberId === reply?.memberId.toString() && (
          <Pressable
            style={styles.trash}
            onPress={() => {
              callReplyDeleteComment(reply?.commentId);
            }}
          >
            <AntDesign name="delete" size={12} color="gray" />
          </Pressable>
        )}
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
  },
  reply: {
    color: GlobalColors.colors.gray500,
    fontSize: 10,
    paddingLeft: 15,
  },
  trash: {
    paddingLeft: 15,
  },
});
