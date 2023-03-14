import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { GlobalColors } from "./../../constants/color";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import ProgressBar from "../../ui/ProgressBar";

const deviceWidth = Dimensions.get("window").width - 50;

const DiaryItem = ({ id, hashtags, date }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [count, setCount] = useState(0);
  const handleStartPlay = () => setIsPlaying(true);
  const handleStopPlay = () => setIsPlaying(false);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/SAMPLE1.png")}
        style={styles.image}
      />
      <View style={styles.diaryInfo}>
        <Text style={styles.hashtag}>{hashtags}</Text>
        <Text style={styles.date}>{date}</Text>
        {/* 
          time : 음성 재생 시간
          isPlaying : 재생 여부 true면 재생중 false면 재생중 아님
          handleStopPlay: Progressbar에서 재생이 모두 끝나면 처음으로 되돌리기 위한 함수 포인터

          ProgressBar에 time을 넘기면 1초마다 time까지 애니메이션이 진행됨
        */}
        <ProgressBar
          count={count}
          setCount={setCount}
          time={2}
          isPlaying={isPlaying}
          handleStopPlay={handleStopPlay}
        />
      </View>

      {isPlaying ? (
        <Pressable style={styles.circle} onPress={handleStopPlay}>
          <View>
            <Ionicons name="ios-stop" size={16} />
          </View>
        </Pressable>
      ) : (
        <Pressable style={styles.circle} onPress={handleStartPlay}>
          <View>
            <Ionicons name="play" size={16} />
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default DiaryItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: deviceWidth,
    height: 90,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    backgroundColor: GlobalColors.colors.white500,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 24,
    marginBottom: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  diaryInfo: {
    justifyContent: "center",
    marginLeft: 15,
  },
  hashtag: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    fontSize: 12,
    color: GlobalColors.colors.black500,
    marginBottom: 8,
  },
  date: {
    fontFamily: "KoddiUDOnGothic-Regular",
    fontSize: 12,
    color: GlobalColors.colors.gray500,
    marginBottom: 8,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: GlobalColors.colors.primary500,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 25,
  },
});
