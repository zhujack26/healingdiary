import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/color";

const Timer = ({ onToggleNextButtonVisibility }) => {
  const [time, setTime] = useState(180); // 타이머의 시간을 저장하는 상태를 초기화. 기본값은 180초
  const [intervalId, setIntervalId] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false); // 타이머가 실행 중인지를 나타냄
  const [showAlert, setShowAlert] = useState(false);

  // 시간이 0이 되면 타이머를 멈추고 실행 상태를 변경
  useEffect(() => {
    if (time === 0) {
      clearInterval(intervalId);
      setTimerRunning(false);
      setTime(180);
      onToggleNextButtonVisibility(true); // 타이머가 끝났을 때 '다음' 버튼이 보이도록 변경
    }
  }, [time, timerRunning]);

  // 타이머를 시작하는 함수
  const startTimer = () => {
    const id = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    setIntervalId(id);
    setTimerRunning(true);
  };

  // 타이머를 일시정지하는 함수
  const pauseTimer = () => {
    clearInterval(intervalId);
    setTimerRunning(false);
  };

  // 완료를 누르면 타이머를 초기 시간으로 되돌리는 함수
  const complete = () => {
    clearInterval(intervalId);
    setTime(180);
    setTimerRunning(false);
    onToggleNextButtonVisibility(true);
  };
  // 완료를 눌렀을 때 완료 alert 띄워주는 함수
  const showCompletionAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };
  // 시간을 mm:ss 형태로 포맷팅하는 함수
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(time)}</Text>
      {!timerRunning ? (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={startTimer}>
            <MaterialCommunityIcons
              name="record-circle-outline"
              size={48}
              color={GlobalColors.colors.primary500}
            />
          </TouchableOpacity>
          {time < 180 && (
            <TouchableOpacity
              onPress={() => {
                complete();
                showCompletionAlert();
              }}
            >
              <View style={styles.complete}>
                <Text style={styles.text}>완료</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={pauseTimer}>
            <Ionicons
              name="pause-circle-outline"
              size={48}
              color={GlobalColors.colors.primary500}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              complete();
              showCompletionAlert();
            }}
          >
            <View style={styles.complete}>
              <Text style={styles.text}>완료</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {showAlert && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>녹음이 완료되었습니다</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    padding: 0,
    margin: 0,
  },
  complete: {
    margin: 5,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: GlobalColors.colors.primary500,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: GlobalColors.colors.primary500,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  alertContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  alertText: {
    color: GlobalColors.colors.white500,
    fontWeight: "bold",
  },
});

export default Timer;
