import { useRef } from "react";
import { Animated, Dimensions } from "react-native";

import Title from "../../ui/Title";
import RecommentGroupIndicator from "./RecommendGroupIndicator";
import RecommentGroupListItem from "./RecommentGroupListItem";

const { width } = Dimensions.get("window");

const RecommendGroup = ({ groups, navigateToScreen }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <>
      <Title>요즘 뜨는 소모임</Title>
      <Animated.FlatList
        data={groups}
        keyExtractor={(item) => item.id}
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
      <RecommentGroupIndicator scrollX={scrollX} data={groups} />
    </>
  );
};

export default RecommendGroup;
