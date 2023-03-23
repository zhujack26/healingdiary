import { ScrollView, StyleSheet } from "react-native";
import CalendarView from "../components/calendar/CalendarView";
import Statistics from "../components/calendar/Statistics";

const CalendarScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CalendarView />
      <Statistics />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 20,
    padding: 30,
  },
});

export default CalendarScreen;
