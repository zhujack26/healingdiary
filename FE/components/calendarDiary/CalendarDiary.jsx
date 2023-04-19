import { SafeAreaView, StyleSheet, Dimensions, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getCalendarDetailDiary } from "../../api/diary";
import CalendarDiaryListItem from "./CalendarDiaryListItem";

const { width } = Dimensions.get("window");

const CalendarDiary = ({ navigation, year, month, day }) => {
  const [diaries, setDiaries] = useState([]);

  const callGetCalendayDiary = async () => {
    const res = await getCalendarDetailDiary(year, month, day);
    setDiaries(res.data);
  };

  useEffect(() => {
    callGetCalendayDiary();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={diaries.content}
        renderItem={({ item }) => <CalendarDiaryListItem content={item} />}
      />
    </SafeAreaView>
  );
};

export default CalendarDiary;
const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
    alignItems: "center",
  },
});
