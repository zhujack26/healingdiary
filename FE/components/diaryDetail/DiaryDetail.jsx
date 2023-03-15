import { SafeAreaView, View, Text, StyleSheet, Image } from "react-native";
import { GlobalColors } from "./../../constants/color";
import { Ionicons } from "@expo/vector-icons";

const DiaryDetail = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}></View>
      <View style={styles.playlist}>
        <View style={styles.emotionContainer}>
          <Text> 　</Text>
          <Image
            source={require("../../assets/images/icons/cursing.png")}
            style={styles.emotion}
          />
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </View>
        <View>
          <Image
            source={require("../../assets/images/SAMPLE4.png")}
            style={styles.image}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DiaryDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.colors.primary500,
  },

  background: {
    flex: 1,
  },
  playlist: {
    flex: 6,
    backgroundColor: GlobalColors.colors.white500,
    width: "100%",
    borderTopRightRadius: 62,
    borderTopLeftRadius: 62,
    alignItems: "center",
  },
  emotionContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
  },
  emotion: {
    width: 35,
    height: 35,
  },
  image: {
    width: 243,
    height: 332,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
});
