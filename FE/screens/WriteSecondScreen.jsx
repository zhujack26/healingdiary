import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { GlobalColors } from "../constants/color";

const WriteSecondScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inform}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.colors.primary500,
    marginTop: StatusBar.currentHeight || 0,
  },
  inform: {
    alignItems: "center",
    top: 80,
    width: 400,
    height: 800,
    backgroundColor: GlobalColors.colors.white500,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
export default WriteSecondScreen;
