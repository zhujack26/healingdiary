import { SafeAreaView, StyleSheet, Image, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const GroupDetailHeader = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        style={styles.image}
        source={require("../../assets/images/SAMPLE2.png")}
      />
    </SafeAreaView>
  );
};

export default GroupDetailHeader;

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 265,
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
});
