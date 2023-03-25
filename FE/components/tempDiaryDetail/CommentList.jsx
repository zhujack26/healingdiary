import React from "react";
import { FlatList } from "react-native";
import CommentListItem from "./CommentListItem";

const CommentList = ({ comment }) => {
  return <FlatList renderItem={CommentListItem} data={comment} />;
};

export default CommentList;
