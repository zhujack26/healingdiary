import { useRef } from "react";
import { Dimensions, Animated } from "react-native";

import Title from "../../ui/Title";
import RecommendDiaryListItem from "./RecommendDiaryListItem";

const { width } = Dimensions.get("window");
const RecommendDiary = ({ diaries }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Title>요즘 뜨는 일기</Title>
      <Animated.FlatList
        data={diaries}
        keyExtractor={(item) => item.id}
        renderItem={RecommendDiaryListItem}
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

export default RecommendDiary;
