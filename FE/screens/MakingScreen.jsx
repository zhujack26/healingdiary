import { View, StyleSheet } from "react-native";
import { GlobalColors } from "../constants/color";
import Timer from "../components/making/Timer";
import AddFile from "../components/making/AddFile";

const MakingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inform}>
        <AddFile />
        <Timer />
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
