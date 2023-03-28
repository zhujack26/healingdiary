import { Calendar, LocaleConfig } from "react-native-calendars";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
const getIconNameFromEmotionCode = (emotionCode) => {
  switch (emotionCode) {
    case 1:
      return "emoji-happy";
    case 2:
      return "emoji-sad";
    // 여기에 더 추가
  }
};
const getEmotionForDate = (date, dateList) => {
  const targetDate = dateList.find((d) => DateCheck(date, d));
  if (targetDate) {
    const iconName = getIconNameFromEmotionCode(targetDate.emotion.code);
    return { ...targetDate.emotion, iconName };
  }
  return null;
};
const CustomDayComponent = ({ date, state, onPress }) => {
  const dummyData = [
    {
      day: 12,
      emotion: {
        code: 1,
        value: "기쁨",
      },
      month: 3,
      year: 2023,
    },
    {
      day: 13,
      emotion: {
        code: 2,
        value: "슬픔",
      },
      month: 3,
      year: 2023,
    },
  ];

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

  const emotion = getEmotionForDate(date, dummyData);

  return (
    <View>
      <TouchableOpacity onPress={handlePress} style={styles.box}>
        <Text
          style={{
            backgroundColor: isToday ? GlobalColors.colors.primary400 : null,
            color:
              state === "disabled"
                ? GlobalColors.colors.gray500
                : GlobalColors.colors.black500,
            paddingVertical: 3,
            paddingHorizontal: 3,
            borderRadius: isToday ? 16 : null,
          }}
        >
          {date.day}
        </Text>
        {emotion && (
          <View style={styles.empty}>
            <Entypo
              name={emotion.iconName}
              size={16}
              color={GlobalColors.colors.primary500}
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
          onPress={(day) => {
            console.log("selected day");
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
    height: 18,
    textShadowRadius: 10,
  },
});
export default CalendarView;
