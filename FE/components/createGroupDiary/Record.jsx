import { useRef, useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/color";
import { Audio } from "expo-av";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Record = ({ onResponse }) => {
  const [time, setTime] = useState(180);
  const [intervalId, setIntervalId] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [recording, setRecording] = useState(null);

  useEffect(() => {
    if (time === 0) {
      clearInterval(intervalId);
      setTimerRunning(false);
      setTime(180);
      if (recording) {
        stopRecording();
      }
    }
  }, [time, timerRunning]);

  const stopRecording = async () => {
    console.log("Stopping recording..");
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
    await uploadRecording(uri);
  };

  const startTimer = () => {
    toggleRecording();
  };

  const pauseTimer = () => {
    toggleRecording();
  };

  const complete = () => {
    clearInterval(intervalId);
    setTime(180);
    setTimerRunning(false);
    if (recording) {
      stopRecording();
    }
  };

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
  const audioPlayer = useRef(new Audio.Sound());

  const toggleRecording = async () => {
    if (recording) {
      if (timerRunning) {
        await recording.pauseAsync();
        clearInterval(intervalId);
        setTimerRunning(false);
      } else {
        await recording.startAsync();
        const id = setInterval(() => {
          setTime((prevTime) => prevTime - 1);
        }, 1000);
        setIntervalId(id);
        setTimerRunning(true);
      }
    } else {
      try {
        console.log("Requesting permissions..");
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        console.log("Starting recording..");
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
        console.log("Recording started");

        const id = setInterval(() => {
          setTime((prevTime) => prevTime - 1);
        }, 1000);
        setIntervalId(id);
        setTimerRunning(true);
      } catch (err) {
        console.error("Failed to start recording", err);
      }
    }
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("jwtToken");
      console.log("확인1");
      return token;
    } catch (error) {
      console.error("Error getting token:", error);
    }
  };
  const uploadRecording = async (uri) => {
    try {
      const token = await getToken();
      console.log(token);
      const apiUrl = `http://j8b203.p.ssafy.io:8080/diaries/analyze`;
      const formData = new FormData();

      const fileUri = uri;
      const fileTypeMatch = /\.(\w+)$/.exec(fileUri);
      const mimeType = fileTypeMatch ? `audio/${fileTypeMatch[1]}` : "audio";
      console.log("fileUri:", fileUri);
      console.log("mimeType:", mimeType);

      formData.append("rec", {
        uri: fileUri,
        name: "record.m4a",
        type: mimeType,
      });
      console.log(formData, apiUrl);

      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("성공:", response.data);
      onResponse(response.data);
    } catch (error) {
      console.error("실패:", error);
    }
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
export default Record;
