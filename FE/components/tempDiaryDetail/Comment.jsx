import CommentList from "./CommentList";

const comment = [
  {
    children: [
      {
        commentId: 3,
        memberId: 1,
        parentId: 1,
        memberImageUrl: "회원1.jpg",
        nickname: "닉넴",
        datetime: "2023-03-24T02:00:00",
        content: "댓글1",
        children: null,
      },
    ],
    commentId: "1",
    content: "댓글이지",
    datetime: "2023-03-23T13:47:02.140Z",
    memberId: 0,
    memberImageUrl: "",
    nickname: "닉네임임",
    parentId: 1,
  },
  {
    children: [
      {
        commentId: 3,
        memberId: 1,
        parentId: 1,
        memberImageUrl: "회원1.jpg",
        nickname: "닉넴",
        datetime: "2023-03-24T02:00:00",
        content: "댓글2",
        children: null,
      },
    ],
    commentId: "2",
    content: "두번째 댓글임",
    datetime: "2023-03-23T13:47:02.140Z",
    memberId: 1,
    memberImageUrl: "",
    nickname: "닉네임임",
    parentId: 2,
  },
  {
    children: [
      {
        commentId: 3,
        memberId: 1,
        parentId: 1,
        memberImageUrl: "회원1.jpg",
        nickname: "닉넴",
        datetime: "2023-03-24T02:00:00",
        content: "댓글3",
        children: null,
      },
    ],
    commentId: "3",
    content: "세번째 댓글임",
    datetime: "2023-03-23T13:47:02.140Z",
    memberId: 2,
    memberImageUrl: "",
    nickname: "닉네임임",
    parentId: 3,
  },
  {
    children: null,
    commentId: "1",
    content: "댓글이지",
    datetime: "2023-03-23T13:47:02.140Z",
    memberId: 0,
    memberImageUrl: "",
    nickname: "닉네임임",
    parentId: 1,
  },

  {
    children: [
      {
        commentId: 3,
        memberId: 1,
        parentId: 1,
        memberImageUrl: "회원1.jpg",
        nickname: "닉넴",
        datetime: "2023-03-24T02:00:00",
        content: "댓글1",
        children: null,
      },
    ],
    commentId: "1",
    content: "댓글이지",
    datetime: "2023-03-23T13:47:02.140Z",
    memberId: 0,
    memberImageUrl: "",
    nickname: "닉네임임",
    parentId: 1,
  },
];

const Comment = () => {
  return <CommentList comment={comment} />;
};

export default Comment;
