import { Calendar} from "react-native-calendars";
import { View, Text, StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/color";
import { Entypo } from "@expo/vector-icons";

const DateCheck = (date1, date2) => {
  return (
    date1.year === date2.year &&
    date1.month === date2.month &&
    date1.day === date2.day
  );
};

const DateList = (date, dateList) => {
  return dateList.some((d) => DateCheck(date, d));
};

const CustomDayComponent = ({ date, state }) => {
  const targetDates = [
    { year: 2023, month: 3, day: 7 },
    { year: 2023, month: 3, day: 10 },
    { year: 2023, month: 3, day: 15 },
  ];

  const today = new Date();
  const currentDate = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };

  const isToday = DateCheck(date, currentDate);

  return (
    <View>
      <View style={styles.box}
      >
        <Text
          style={{
            backgroundColor: isToday ? GlobalColors.colors.primary400 : null,
            color: state === "disabled" ? GlobalColors.colors.gray500: GlobalColors.colors.black500,
          }}
        >
          {date.day}
        </Text>
        {DateList(date, targetDates) && (
          <View style={styles.empty}>
            <Entypo name="emoji-flirt" size={16} color={"blue"} />
          </View>
        )}
        {DateList(date, targetDates) ||
        <View style={styles.empty}>
        </View>}
      </View>
    </View>
  );
};

const Calendarview = () => {
  
  return (
    <Calendar
      theme={{
        arrowColor: GlobalColors.colors.gray500,
      }}
      style={styles.container}
      dayComponent={({ date, state}) => (
        <CustomDayComponent 
          date={date} 
          state={state} 
          theme={{
            arrowColor:GlobalColors.colors.black500
          }}
          />
        )}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    shadowOpacity: 0.1,
    elevation: 4,
    backgroundColor: GlobalColors.colors.white500,
    padding: 10,
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    height: 18,
    textShadowRadius:10,
  }
});
export default Calendarview;
