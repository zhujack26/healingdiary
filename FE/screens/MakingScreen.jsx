import { View, StyleSheet } from "react-native";
import { GlobalColors } from "../constants/color";
import AddFile from "../components/making/AddFile";
import { useState, useEffect } from "react";
import NextButton from "../components/making/NextButton";
import TimerRecord from "../components/making/TimerRecord";

const MakingScreen = ({ navigation }) => {
  const [response, setResponse] = useState(null);
  console.log("check MakingScren", response);
  const [nextButtonVisible, setNextButtonVisible] = useState(false);
  const toggleNextButtonVisibility = (visible = true) => {
    setNextButtonVisible(visible);
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: (props) => (
        <NextButton
          {...props}
          visible={nextButtonVisible}
          navigation={navigation}
          response={response}
        />
      ),
    });
  }, [navigation, nextButtonVisible, response]);

  return (
    <View style={styles.container}>
      <View style={styles.inform}>
        <AddFile />
        <TimerRecord
          onToggleNextButtonVisibility={toggleNextButtonVisibility}
          onResponse={setResponse}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.colors.primary500,
  },
  inform: {
    alignItems: "center",
    top: 100,
    width: "100%",
    height: "90%",
    backgroundColor: GlobalColors.colors.white500,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default MakingScreen;
