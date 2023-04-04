import { useRef } from "react";
import { View, Text, Dimensions, Animated, StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/color";

import Title from "../../ui/Title";
import RecommentGroupIndicator from "./RecommendGroupIndicator";
import RecommentGroupListItem from "./RecommentGroupListItem";

const { width, height } = Dimensions.get("window");

const NotRecommendDiary = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.notText}>추천 소모임이 없어요!</Text>
    </View>
  );
};

const RecommendGroup = ({ groups, navigateToScreen }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Title>요즘 뜨는 소모임</Title>
      {groups.content?.length === 0 && <NotRecommendDiary />}
      <Animated.FlatList
        data={groups.content?.slice(0, 3)}
        keyExtractor={(item) => item.clubId}
        renderItem={({ item }) => (
          <RecommentGroupListItem
            item={item}
            navigateToScreen={navigateToScreen}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.8}
        snapToInterval={width - 30}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      />
      <RecommentGroupIndicator
        scrollX={scrollX}
        data={groups.content?.slice(0, 3)}
      />
    </>
  );
};

export default RecommendGroup;

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
