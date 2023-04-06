import { Calendar, LocaleConfig } from "react-native-calendars";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { GlobalColors } from "../../constants/color";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getCalendarDiary } from "../../api/diary";
import { BAD, CALM, HAPPY, PLEASURE, UNHAPPY } from "../../constants/emtion";
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
const getImageUriFromEmotionCode = (emotionCode) => {
  switch (emotionCode) {
    case 1:
      return UNHAPPY;
    case 2:
      return BAD;
    case 3:
      return CALM;
    case 4:
      return PLEASURE;
    case 5:
      return HAPPY;
    default:
      return null;
  }
};
const getEmotionForDate = (date, dateList) => {
  const targetDate = dateList.find((d) => DateCheck(date, d));
  if (targetDate) {
    const imageUri = getImageUriFromEmotionCode(targetDate.emotion.emotionCode);
    return { ...targetDate.emotion, imageUri };
  }
  return null;
};

const CustomDayComponent = ({ date, state, onPress, calendarData }) => {
  const emotion = getEmotionForDate(date, calendarData);
  const imageUri = emotion
    ? getImageUriFromEmotionCode(emotion.emotionCode)
    : null;

  const today = new Date();
  const currentDate = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };

  const isToday = DateCheck(date, currentDate);
  const handlePress = () => {
    if (state !== "disabled") {
      onPress(date);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress} style={styles.box}>
        <View
          style={{
            backgroundColor: isToday ? GlobalColors.colors.primary400 : null,
            color:
              state === "disabled"
                ? GlobalColors.colors.gray500
                : GlobalColors.colors.black500,
            paddingVertical: 3,
            paddingHorizontal: 10,
            borderRadius: isToday ? 16 : null,
          }}
        >
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
        </View>
        {emotion && (
          <View style={styles.empty}>
            <Image
              source={{ uri: imageUri }}
              style={{ width: 40, height: 40, top: -25, borderRadius: 16 }}
              resizeMode="contain"
            />
          </View>
        )}
        {!emotion && <View style={styles.empty}></View>}
      </TouchableOpacity>
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
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    const getCalendarDiaries = async () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const res = await getCalendarDiary(year, month);
      setCalendarData(res);
    };
    getCalendarDiaries();
  }, []);

  return (
    <Calendar
      theme={{
        arrowColor: GlobalColors.colors.gray500,
      }}
      style={styles.container}
      dayComponent={({ date, state }) => (
        <CustomDayComponent
          date={date}
          state={state}
          calendarData={calendarData}
          onPress={(day) => {
            navigation.navigate("calendarDiaryList", {
              date: { year: day.year, month: day.month, day: day.day },
            });
          }}
        />
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
    height: 10,
    textShadowRadius: 10,
  },
});
export default CalendarView;
