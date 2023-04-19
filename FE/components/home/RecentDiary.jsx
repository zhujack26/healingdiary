import { useRef } from "react";
import { Animated, Dimensions } from "react-native";

import Title from "../../ui/Title";
import RecentDiaryListItem from "./RecentDiaryListItem";

const { width } = Dimensions.get("window");

const RecentDiary = ({ diaries }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Title>최근 일기</Title>
      <Animated.FlatList
        data={diaries.content}
        keyExtractor={(item) => item.diaryId}
        renderItem={({ item }) => <RecentDiaryListItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.8}
        snapToInterval={width / 3.5}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      />
    </>
  );
};

export default RecentDiary;
