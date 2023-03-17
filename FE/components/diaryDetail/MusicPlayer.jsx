import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

import Slider from "@react-native-community/slider";

const MusicPlayer = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const audio = {
    uri: require("../../assets/sounds/SAMPLE1.mp3"),
    // 또는 require('./song.mp3') 형태로 파일 경로를 지정할 수도 있습니다.
  };

  const onSliderValueChange = (value) => {
    if (sound !== null) {
      sound.setPositionAsync(value * duration);
      setPosition(value * duration);
    }
  };

  const playSound = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(audio.uri);
    setSound(sound);
    setDuration(sound.durationMillis);
    setIsPlaying(true);
    sound.setOnPlaybackStatusUpdate((status) => {
      setDuration(status.durationMillis);
      setPosition(status.positionMillis);
    });
    await sound.playAsync();
  };

  const pauseSound = async () => {
    if (sound !== null) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const stopSound = async () => {
    if (sound !== null) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Music Player</Text>
      <Slider
        style={styles.progressContainer}
        value={duration ? position / duration : 0}
        step={0.01}
        minimumValue={0}
        maximumValue={1}
        thumbTintColor="#EDAD79"
        minimumTrackTintColor="#EDAD79"
        maximumTrackTintColor="#D3D3D3"
        onValueChange={onSliderValueChange}
      />
      <View style={styles.controlsContainer}>
        {isPlaying ? (
          <Pressable onPress={pauseSound}>
            <Ionicons name="ios-pause-circle" size={25} />
          </Pressable>
        ) : (
          <Pressable onPress={playSound}>
            <Ionicons name="ios-pause-circle" size={25} />
          </Pressable>
        )}
        <Pressable onPress={stopSound}>
          <Ionicons name="ios-pause-circle" size={25} />
        </Pressable>
      </View>
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  progressContainer: {
    width: 250,
    height: 40,
  },
  controlsContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
});
