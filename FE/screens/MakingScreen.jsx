import { View, StyleSheet } from "react-native";
import { GlobalColors } from "../constants/color";
import Timer from "../components/making/Timer";
import AddFile from "../components/making/AddFile";
import { useState, useEffect } from "react";
import NextButton from "../components/making/NextButton";

const MakingScreen = ({ navigation }) => {
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
        />
      ),
    });
  }, [navigation, nextButtonVisible]);

  return (
    <View style={styles.container}>
      <View style={styles.inform}>
        <AddFile />
        <Timer onToggleNextButtonVisibility={toggleNextButtonVisibility} />
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
