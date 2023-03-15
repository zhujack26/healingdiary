import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/color";

const AddFile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <AntDesign name="plus" size={48} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    width: 250,
    height: 400,
    borderColor: GlobalColors.colors.white500,
    elevation: 3,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
});

export default AddFile;
