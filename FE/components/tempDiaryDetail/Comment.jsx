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
      <Text>댓글창</Text>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({});
