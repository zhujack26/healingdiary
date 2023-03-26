import { SafeAreaView, StyleSheet, Dimensions } from "react-native";
import CalendarDiaryList from "./CalendarDiaryList";

const { width } = Dimensions.get("window");

const DATA = [
  {
    emotion: {
      code: 0,
      value: "string",
    },
    image: require("../../assets/images/SAMPLE4.png"),
  },
];
const CalendarDiary = ({ navigation, year, month, day }) => {
  return (
    <SafeAreaView style={styles.container}>
      <CalendarDiaryList data={DATA} year={year} month={month} day={day} />
    </SafeAreaView>
  );
};

export default CalendarDiary;
const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
    alignItems: "center",
  },
});
