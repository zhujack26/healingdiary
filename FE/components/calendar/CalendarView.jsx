import { Calendar, LocaleConfig } from "react-native-calendars";
import { View, Text, StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/color";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

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

const CustomDayComponent = ({ date, state, marking, onPress }) => {
  const {day} = date;
  const {emoji} = marking || {};

  const handlePress = () => {
    if (state !== 'disabled') {
      onPress(date);
    }
  };
  return (
    <TouchableOpacity onPress={handlePress} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {emoji ? (
        <Text style={{fontSize: 24}}>{emoji}</Text>
      ) : (
        <Text style={{fontSize: 18}}>{day}</Text>
      )}
    </TouchableOpacity>
  );
};
  const today = new Date();
  const currentDate = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };

  const isToday = DateCheck(date, currentDate);

  return (
    <View>
      <View style={styles.box}>
        <Text
          style={{
            backgroundColor: isToday ? GlobalColors.colors.primary400 : null,
            color:
              state === "disabled"
                ? GlobalColors.colors.gray500
                : GlobalColors.colors.black500,
          }}
        >
          {date.day}
        </Text>
        {DateList(date, targetDates) && (
          <View style={styles.empty}>
            <Entypo name="emoji-flirt" size={16} color={"blue"} />
          </View>
        )}
        {DateList(date, targetDates) || <View style={styles.empty}></View>}
      </View>
    </View>
  );
};
LocaleConfig.locales["ko"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요알",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
};
LocaleConfig.defaultLocale = "ko";

const CalendarView = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState("");
  return (
    <Calendar
      theme={{
        arrowColor: GlobalColors.colors.gray500,
      }}
      style={styles.container}
      dayComponent={({ date, state }) => (
        <CustomDayComponent date={date} state={state} />
      )}
      locale={"ko"}
      firstDay={0}
      monthFormat={"yyyy년 MM월"}
      renderHeader={(date) => {
        const year = date.getFullYear();
        const monthIndex = Number(date.getMonth());
        return (
          <Text>
            {year}년 {LocaleConfig.locales["ko"].monthNames[monthIndex]}
          </Text>
        );
      }}
      onDayPress={(day) => {
        console.log("selected day", day.year);
        navigation.navigate("calendarDiaryList", {
          date: { year: day.year, month: day.month, day: day.day },
        });
      }}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    shadowOpacity: 0.1,
    elevation: 4,
    padding: 10,
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    height: 18,
    textShadowRadius: 10,
  },
});
export default CalendarView;
