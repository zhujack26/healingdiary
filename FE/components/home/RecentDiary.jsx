import { useRef } from "react";
import { Animated, Dimensions, StyleSheet, View, Text } from "react-native";
import { GlobalColors } from "../../constants/color";
import Title from "../../ui/Title";
import RecentDiaryListItem from "./RecentDiaryListItem";

const { width, height } = Dimensions.get("window");

const NotRecentDiary = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.notText}>최근 일기가 없어요!</Text>
    </View>
  );
};

const RecentDiary = ({ diaries }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Title>최근 일기</Title>
      {diaries.content?.length === 0 && <NotRecentDiary />}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  notText: {
    padding: height / 20,
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    color: GlobalColors.colors.black500,
    fontSize: 18,
  },
});
