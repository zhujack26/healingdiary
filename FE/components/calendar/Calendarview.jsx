import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { View, Text, StyleSheet } from "react-native";

const Calendarview = () => {
  return (
    <Calendar style={styles.container} />
  );
};

export default Calendarview;

const styles = StyleSheet.create({
  container : {
    shadowColor:"white",
    borderWidth: 1,
  }
});
