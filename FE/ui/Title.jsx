import { View, Text, StyleSheet } from "react-native";
import { GlobalColors } from "../constants/color";

const Title = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
};

export default Title;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 8,
    marginLeft: 8,
  },
  title: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    color: GlobalColors.colors.black500,
    fontSize: 16,
  },
});
