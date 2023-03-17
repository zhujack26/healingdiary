import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  Animated,
  FlatList,
} from "react-native";
import { useEffect, useRef, useState } from "react";
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

  const silderValueChange = (value) => {
    if (sound !== null) {
      console.log(("value", value));
      console.log(("duration", duration));
      sound.setPositionAsync(value * duration);
      setPosition(value * duration);
    }
  };

  const playSound = async (audio) => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(audio[soundIndex].url);
    setSound(sound);
    setDuration(sound.durationMillis);
    setIsPlaying(true);
    sound.setOnPlaybackStatusUpdate((status) => {
      setDuration(status.durationMillis);
      setPosition(status.positionMillis);
    });
    await sound.playAsync();
  };

  const paseuSound = async () => {
    if (sound !== null) {
      await sound.pauseSync();
      setIsPlaying(false);
    }
  };

  const skiptoNext = () => {
    soundSlider.current.scrollToOffset({
      offset: (soundIndex + 1) * width,
    });
  };

  const skipToPrevious = () => {
    soundSlider.current.scrollToOffset({
      offset: (soundIndex - 1) * width,
    });
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
            value={duration ? position / duration : 0}
            step={0.01}
            minimumValue={0}
            maximumValue={1}
            thumbTintColor="#EDAD79"
            minimumTrackTintColor="#EDAD79"
            maximumTrackTintColor={GlobalColors.colors.gray400}
            onValueChange={silderValueChange}
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
              isPlaying ? paseuSound() : playSound(songs);
            }}
          >
            <Ionicons
              name={isPlaying ? "ios-pause-circle" : "ios-play-circle"}
              size={75}
              color={GlobalColors.colors.secondary500}
            />
          </Pressable>
          <Pressable onPress={skiptoNext}>
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
