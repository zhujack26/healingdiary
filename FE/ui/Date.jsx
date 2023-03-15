import { View, Text, StyleSheet } from "react-native";
import { GlobalColors } from "./../constants/color";
const Date = () => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.date}>2023년 3월 4일</Text>
      </View>
    </View>
  );
};

export default Date;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 30,
    borderRadius: 16,
    backgroundColor: GlobalColors.colors.white500,
    borderColor: GlobalColors.colors.gray400,
    borderWidth: 1,
  },
  top: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  date: {
    fontSize: 12,
    fontFamily: "KoddiUDOnGothic-Regular",
  },
});
