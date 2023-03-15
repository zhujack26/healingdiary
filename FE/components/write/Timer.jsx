import React, { useState, useEffect  } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/color";

const Timer = () => {
  const [time, setTime] = useState(180); // 3 minutes in seconds
  const [intervalId, setIntervalId] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (time === 0) {
      clearInterval(intervalId);
      setTimerRunning(false);
    }
  }, [time]);

  const startTimer = () => {
    const id = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    setIntervalId(id);
    setTimerRunning(true);
  };

  const pauseTimer = () => {
    clearInterval(intervalId);
    setTimerRunning(false);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setTime(180);
    setTimerRunning(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(time)}</Text>
      {!timerRunning ? (
        <TouchableOpacity style={styles.button} onPress={startTimer}>
          <MaterialCommunityIcons name="record-circle-outline" size={48} color={GlobalColors.colors.primary500} />
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={pauseTimer}>
            <Ionicons name="pause-circle-outline" size={48} color={GlobalColors.colors.primary500} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={stopTimer}>
            <Ionicons name="stop-circle-outline" size={48} color={GlobalColors.colors.primary500} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    padding: 0,
    margin: 0,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
});

export default Timer;