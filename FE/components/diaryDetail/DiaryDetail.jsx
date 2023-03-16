import { SafeAreaView, View, StyleSheet } from "react-native";
import { GlobalColors } from "./../../constants/color";

import SoundPlayer from "./SoundPlayer";

const DiaryDetail = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}></View>
      <SoundPlayer />
    </SafeAreaView>
  );
};

export default DiaryDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.colors.primary500,
    alignItems: "center",
    justifyContent: "center",
  },

  background: {
    flex: 1,
  },
});
