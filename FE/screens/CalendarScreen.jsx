import { View, Text, StyleSheet } from "react-native";
import Calendarview from "../components/calendar/Calendarview";
const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Calendarview/>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  }
});
