import { View, Text, StyleSheet } from "react-native";
import Calendarview from "../components/calendar/Calendarview";
import Statistics from "../components/calendar/statistics";
const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Calendarview/>
      <Statistics/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 30,
  }
});

export default CalendarScreen;