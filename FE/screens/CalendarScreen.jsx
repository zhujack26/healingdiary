import { ScrollView, StyleSheet } from "react-native";
import BottomTabContainer from "../components/BottomTabContainer/BottomTabContainer";
import CalendarView from "../components/calendar/CalendarView";
import Statistics2 from "../components/calendar/Statistics2";

const CalendarScreen = () => {
  return (
    <BottomTabContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <CalendarView />
        <Statistics2 />
      </ScrollView>
    </BottomTabContainer>
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
