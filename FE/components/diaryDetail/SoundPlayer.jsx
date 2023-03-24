import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  Animated,
} from "react-native";
import { useEffect, useRef, useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/color";
import { Audio } from "expo-av";

import Slider from "@react-native-community/slider";
import songs from "../../model/data";

const { width, height } = Dimensions.get("window");

const SoundPlayer = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const soundSlider = useRef(null);
  const [soundIndex, setSoundIndex] = useState(0);

  const [sound, setSound] = useState();
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const callBackSetIsPlaying = useCallback(
    (isPlaying) => {
      setIsPlaying(isPlaying);
    },
    [setIsPlaying]
  );

  const sliderValueChange = (value) => {
    if (sound) {
      sound.setPositionAsync(value * duration);

      requestAnimationFrame(() => {
        setPosition(value * duration);
      });
    }
  };

  const skipToNext = async () => {
    //다음곡으로 이동
    const nextSoundIndex = soundIndex < songs.length - 1 ? soundIndex + 1 : 0;
    soundSlider.current.scrollToOffset({
      offset: nextSoundIndex * width,
      animated: true,
    });
    if (soundIndex < songs.length - 1) {
      const { sound: nextSound } = await Audio.Sound.createAsync(
        songs[nextSoundIndex].url
      );
      callBackSetIsPlaying(true);
      nextSound.setOnPlaybackStatusUpdate((status) => {
        //플레이시 실행
        if (!status.isLoaded) return;
        setDuration(status.durationMillis);
        setPosition(status.positionMillis);
        if (status.didJustFinish) {
          setSoundIndex(nextSoundIndex); // 다음 곡 인덱스로 업데이트
          nextSound.unloadAsync(); // 현재 재생 중인 음악 언로드
          skipToNext(); // 다음 곡으로 재귀 호출
        }
      });
      setSound(nextSound);
      await nextSound.playAsync();
      callBackSetIsPlaying(true);
    } else {
      setSoundIndex(0);
      const { sound } = await Audio.Sound.createAsync(songs[0].url);
      setSound(sound);
      await sound.playAsync();
    }
  };

  const skipToPrevious = async () => {
    //이전 곡으로 이동
    const previousSoundIndex =
      soundIndex > 0 ? soundIndex - 1 : songs.length - 1;
    soundSlider.current.scrollToOffset({
      offset: previousSoundIndex * width,
      animated: true,
    });
    if (soundIndex > 0) {
      const { sound: previousSound } = await Audio.Sound.createAsync(
        songs[previousSoundIndex].url
      );
      callBackSetIsPlaying(true);
      previousSound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        setDuration(status.durationMillis);
        setPosition(status.positionMillis);
        if (status.didJustFinish) {
          setSoundIndex(previousSoundIndex);
          previousSound.unloadAsync();
          skipToPrevious();
        }
      });
      setSound(previousSound);
      await previousSound.playAsync();
      callBackSetIsPlaying(true);
    } else {
      const { sound: previousSound } = await Audio.Sound.createAsync(
        songs[songs.length - 1].url
      );
      setSound(previousSound);
      await previousSound.playAsync();
      setSoundIndex(songs.length - 1);
    }
  };
  const playSound = async (audio) => {
    //재생버튼 누르는 동시에 실행
    callBackSetIsPlaying(true);
    if (!sound) {
      const { sound } = await Audio.Sound.createAsync(audio[soundIndex].url);
      setSound(sound);
      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        setDuration(status.durationMillis);
        setPosition(status.positionMillis);

        if (status.didJustFinish) {
          skipToNext();
          setPosition(0);
          sound.unloadAsync();
        }
      });
      await sound.playAsync();
    } else if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const pauseSound = async () => {
    callBackSetIsPlaying(false);
    if (sound) {
      await sound.stopAsync();
      await sound.setPositionAsync(0);
    }
  };

  const renderSounds = ({ item }) => {
    return (
      <View
        style={{
          width: width,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.artworkWrapper}>
          <Image source={item.image} style={styles.artwork} />
        </View>
      </View>
    );
  };

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / width);
      setSoundIndex(index);
    });
    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  useEffect(() => {
    const playCurrentSound = async () => {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        songs[soundIndex].url
      );
      setSound(newSound);
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        setDuration(status.durationMillis);
        setPosition(status.positionMillis);

        if (status.didJustFinish) {
          if (soundIndex === songs.length - 1) skipToNext(0);
          else setSoundIndex(soundIndex + 1);
        }
      });
      await newSound.playAsync();
      callBackSetIsPlaying(true);
    };
    playCurrentSound();
  }, [soundIndex]);

  return (
    <View style={styles.playlist}>
      <View style={styles.emotionContainer}>
        <Text> 　</Text>
        <Image
          source={require("../../assets/images/icons/cursing.png")}
          style={styles.emotion}
        />
        <Ionicons name="ellipsis-horizontal" size={24} color="black" />
      </View>
      <View style={styles.soundContainer}>
        <View style={{ width: width }}>
          <Animated.FlatList
            style={{
              width: width,
            }}
            ref={soundSlider}
            data={songs}
            renderItem={renderSounds}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { x: scrollX },
                  },
                },
              ],
              { useNativeDriver: true }
            )}
          />
        </View>
        <View style={styles.hashtags}>
          {songs[soundIndex].hashtags.map((hashtag, index) => (
            <View style={styles.hashtag} key={index}>
              <Text style={styles.hashtagText}>{hashtag}</Text>
            </View>
          ))}
        </View>
        <View>
          <Slider
            style={styles.progressContainer}
            value={duration ? position / duration : 0} //프로그레스 바 진행 위치 설정
            minimumValue={0}
            maximumValue={1}
            thumbTintColor="#EDAD79"
            minimumTrackTintColor="#EDAD79"
            maximumTrackTintColor={GlobalColors.colors.gray400}
            onValueChange={sliderValueChange}
          />
          <View style={styles.progressLabelContainer}>
            <Text style={styles.progressLabelText}></Text>
            <Text style={styles.progressLabelText}></Text>
          </View>
        </View>
        <View style={styles.soundControlls}>
          <Pressable onPress={skipToPrevious}>
            <Ionicons
              name="play-skip-back-outline"
              size={35}
              color={GlobalColors.colors.secondary500}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              isPlaying ? pauseSound() : playSound(songs);
            }}
          >
            <Ionicons
              name={isPlaying ? "ios-pause-circle" : "ios-play-circle"}
              size={75}
              color={GlobalColors.colors.secondary500}
            />
          </Pressable>
          <Pressable onPress={skipToNext}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color={GlobalColors.colors.secondary500}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SoundPlayer;

const styles = StyleSheet.create({
  playlist: {
    flex: 6,
    backgroundColor: GlobalColors.colors.white500,
    width: "100%",
    borderTopRightRadius: 62,
    borderTopLeftRadius: 62,
    alignItems: "center",
  },
  emotionContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
  },
  emotion: {
    width: 35,
    height: 35,
  },
  soundContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  artworkWrapper: {
    width: 260,
    height: 260,
    marginBottom: 25,
    borderRadius: 15,
    backgroundColor: GlobalColors.colors.white500,
    elevation: 5,
    shadowColor: GlobalColors.colors.black500,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
  },
  artwork: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  hashtags: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  hashtag: {
    minWidth: 85,
    height: 30,
    borderRadius: 16,
    backgroundColor: GlobalColors.colors.primary500,
    alignItems: "center",
    justifyContent: "center",
  },
  hashtagText: {
    fontFamily: "KoddiUDOnGothic-Regular",
    color: GlobalColors.colors.white500,
    fontSize: 12,
    padding: 4,
  },
  progressContainer: {
    width: width - 50,
    height: 40,
    marginTop: 25,
    flexDirection: "row",
  },
  progressLabelContainer: {
    width: width - 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabelText: {
    fontFamily: "KoddiUDOnGothic-Regular",
    color: GlobalColors.colors.black500,
  },
  soundControlls: {
    width: width - 170,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
