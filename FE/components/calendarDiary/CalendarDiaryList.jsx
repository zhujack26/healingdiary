import { FlatList } from "react-native";
import CalendarDiaryListItem from "./CalendarDiaryListItem";

const CalendarDiaryList = ({ data, year, month, day }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <CalendarDiaryListItem
          emotion={item.emotion}
          image={item.image}
          year={year}
          month={month}
          day={day}
        />
      )}
      keyExtractor={(index) => index.toString()}
    />
  );
};

export default CalendarDiaryList;
