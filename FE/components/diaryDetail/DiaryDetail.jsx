import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import { Audio } from "expo-av";

import Hashtag from "./Hashtag";
import DiaryDetailThumbAndPlayer from "./DiaryDetailThumbAndPlayer";
import CommnetListItem from "./CommentListItem";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const DATA = {
  createdDate: "2023-03-23T13:47:02.140Z",
  diaryId: 0,
  emotion: {
    code: 0,
    value: "string",
  },
  imageUrl: require("../../assets/images/SAMPLE1.png"),
  recordUrl: require("../../assets/sounds/SAMPLE1.mp3"),
  tags: ["해시태그", "해그태시", "해해해시"],
};

const comments = [
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
    content: "안녕하세요 ssafy 입니다. 잘부탁드립니다.",
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
        content: "댓글",
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

const DiaryDetail = ({ route }) => {
  const navigation = useNavigation();
  const id = route.params.id;

  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const navigationGoBack = () => {
    navigation.goBack();
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(DATA.recordUrl);
    setSound(sound);
    await sound.playAsync();
    setIsPlaying(true);
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.container}
        data={comments}
        renderItem={({ item }) => <CommnetListItem comment={item} />}
        ListHeaderComponent={
          <>
            <DiaryDetailThumbAndPlayer
              navigationGoBack={navigationGoBack}
              playSound={playSound}
              stopSound={stopSound}
              isPlaying={isPlaying}
            />
            <Hashtag tags={DATA.tags} />
          </>
        }
      />
    </SafeAreaView>
  );
};

export default DiaryDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
