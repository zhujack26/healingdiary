import { FlatList } from "react-native";
import CommentListItem from "./CommentListItem";

const CommentList = ({ comments }) => {
  return <FlatList renderItem={CommentListItem} data={comments} />;
};

export default CommentList;
