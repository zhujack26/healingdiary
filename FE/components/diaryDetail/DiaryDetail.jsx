import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import Hashtag from "./Hashtag";
import DiaryDetailThumbAndPlayer from "./DiaryDetailThumbAndPlayer";
import CommentListItem from "./CommentListItem";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getDiaryComment } from "../../api/comment";
import { getDiaryDetail } from "../../api/diary";

const DiaryDetail = ({ diaryId }) => {
  const navigation = useNavigation();
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [comments, setComments] = useState([]);
  const [diary, setDiary] = useState({});

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

  const handleDeleteComment = (commentId) => {
    console.log(`댓글 ID ${commentId}가 삭제되었습니다.`);
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
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.container}
        data={comments}
        renderItem={({ item }) => (
          <CommentListItem comment={item} onDelete={handleDeleteComment} />
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
