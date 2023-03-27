import CalendarDiary from "../components/calendarDiary/CalendarDiary";

const CalendarDiaryListScreen = ({ navigation, route }) => {
  const { year, month, day } = route.params.date;
  return (
    <CalendarDiary
      navigation={navigation}
      year={year}
      month={month}
      day={day}
    />
  );
};

export default CalendarDiaryListScreen;
