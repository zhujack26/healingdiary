import { View, StyleSheet, Image, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const GroupDetailHeader = () => {
  return (
    <View style={styles.header}>
      <Image
        style={styles.image}
        source={require("../../assets/images/SAMPLE1.png")}
      />
    </View>
  );
};

export default GroupDetailHeader;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 200,
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
