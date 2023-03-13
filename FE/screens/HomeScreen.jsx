import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import RecentDiary from "../components/main/RecentDiary";
import RecommendGroup from "../components/main/RecommendGroup";
import RecommendDiary from "./../components/main/RecommendDiary";

const deviceHeight = Dimensions.get("window").height - 130;
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <RecommendGroup />
        <RecommendDiary />
        <RecentDiary />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    height: deviceHeight,
  },
});
