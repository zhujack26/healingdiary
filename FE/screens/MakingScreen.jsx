import { View, StyleSheet } from "react-native";
import { GlobalColors } from "../constants/color";
import Timer from "../components/making/Timer";
import AddFile from "../components/making/AddFile";
import { useState } from "react";
import NextButton from "../components/making/NextButton";

const MakingScreen = ({ navigation }) => {
  const [nextButtonVisible, setNextButtonVisible] = useState(false);

  // 이 함수를 Timer 컴포넌트에 전달하여 타이머의 상태에 따라 버튼이 표시되도록
  const toggleNextButtonVisibility = (visible) => {
    setNextButtonVisible(visible);
  };
  // headerRight에 전달할 NextButton 컴포넌트를 설정
  navigation.setOptions({
    headerRight: (props) => (
      <NextButton
        {...props}
        visible={nextButtonVisible}
        navigation={navigation}
      />
    ),
  });
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
