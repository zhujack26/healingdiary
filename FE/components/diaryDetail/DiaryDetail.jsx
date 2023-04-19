import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Audio } from "expo-av";
import Hashtag from "./Hashtag";
import DiaryDetailThumbAndPlayer from "./DiaryDetailThumbAndPlayer";
import CommentListItem from "./CommentListItem";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { deleteComment, getDiaryComment } from "../../api/comment";
import { getDiaryDetail } from "../../api/diary";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DiaryDetail = ({ diaryId, refreshKey }) => {
  const navigation = useNavigation();
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [comments, setComments] = useState([]);
  const [diary, setDiary] = useState({});
  const [memberId, setMemberId] = useState("");

  const navigationGoBack = () => {
    navigation.goBack();
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync({ uri: diary.recordUrl });
    setSound(sound);
    await sound.playAsync();
    setIsPlaying(true);
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    });
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const navigateToMakingInput = () => {
    navigation.navigate("MakingInput", {
      diaryId: diaryId,
    });
  };

  const callGetDiaryDetail = async () => {
    const res = await getDiaryDetail(diaryId);
    setDiary(res);
  };

  const callGetDiaryComment = async () => {
    const res = await getDiaryComment(diaryId);
    setComments(res.data.content);
  };

  const callDeleteComment = async (commentId) => {
    const res = await deleteComment(commentId);
    if (res.status === 200) {
      Alert.alert("댓글이 삭제됐습니다.");
      const updatedComments = comments.filter(
        (comment) => comment.commentId !== commentId
      );
      setComments(updatedComments);
    } else {
      Alert.alert("댓글 삭제에 실패했습니다.");
    }
  };

  const callReplyDeleteComment = async (commentId) => {
    const res = await deleteComment(commentId);
    if (res.status === 200) {
      Alert.alert("댓글이 삭제됐습니다.");
      callGetDiaryComment();
    } else {
      Alert.alert("댓글 삭제에 실패했습니다.");
    }
  };

  const getMemberID = async () => {
    setMemberId(await AsyncStorage.getItem("id"));
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    callGetDiaryComment();
    callGetDiaryDetail();
    getMemberID();
  }, []);

  useEffect(() => {
    callGetDiaryComment();
  }, [refreshKey]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.container}
        data={comments}
        renderItem={({ item }) => (
          <CommentListItem
            comment={item}
            diaryId={diaryId}
            callDeleteComment={callDeleteComment}
            callReplyDeleteComment={callReplyDeleteComment}
            memberId={memberId}
          />
        )}
        ListHeaderComponent={
          <>
            <DiaryDetailThumbAndPlayer
              navigationGoBack={navigationGoBack}
              playSound={playSound}
              stopSound={stopSound}
              isPlaying={isPlaying}
              diary={diary}
            />
            <Hashtag tags={diary?.tags} />
            <TouchableOpacity onPress={navigateToMakingInput}>
              <Text style={styles.reply}>댓글 달기</Text>
            </TouchableOpacity>
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
  reply: {
    paddingLeft: 10,
    paddingBottom: 10,
    color: "gray",
  },
});
