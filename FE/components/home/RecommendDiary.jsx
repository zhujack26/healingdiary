import { useRef } from "react";
import { View, Text, Dimensions, Animated, StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/color";

import Title from "../../ui/Title";
import RecommendDiaryListItem from "./RecommendDiaryListItem";

const { width, height } = Dimensions.get("window");

const NotRecommendDiary = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.notText}>추천 일기가 없어요!</Text>
    </View>
  );
};
const RecommendDiary = ({ diaries }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Title>요즘 뜨는 일기</Title>
      {diaries.length === 0 && <NotRecommendDiary />}
      <Animated.FlatList
        data={diaries}
        keyExtractor={(item) => item.id}
        renderItem={RecommendDiaryListItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.8}
        snapToInterval={width / 3}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  notText: {
    padding: height / 10,
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    color: GlobalColors.colors.black500,
    fontSize: 18,
  },
});
