import { useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { GlobalColors } from "../constants/color";

import GroupList from "../components/group/GroupList";
import MyGroupList from "../components/group/MyGroupList";
import RecommendGroup from "../components/group/RecommendGroup";
import Button from "../ui/Button";
import BottomTabContainer from "../components/BottomTabContainer/BottomTabContainer";

const { width, height } = Dimensions.get("window");

const GroupScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleActiveIndex = (index) => {
    setActiveIndex(index);
  };
  const Buttons = ({ activeIndex, handleActiveIndex }) => {
    return (
      <View style={styles.buttons}>
        <Button
          activeIndex={activeIndex}
          onPress={() => handleActiveIndex(0)}
          selected={activeIndex === 0 && styles.selected}
        >
          전체
        </Button>
        <Button
          activeIndex={activeIndex}
          onPress={() => handleActiveIndex(1)}
          selected={activeIndex === 1 && styles.selected}
        >
          내 소모임
        </Button>
        <Button
          activeIndex={activeIndex}
          onPress={() => handleActiveIndex(2)}
          selected={activeIndex === 2 && styles.selected}
        >
          추천 소모임
        </Button>
      </View>
    );
  };

  const renderItem = () => {
    const searchComponent = [
      <GroupList />,
      <RecommendGroup />,
      <MyGroupList />,
    ];
    return searchComponent[activeIndex];
  };

  return (
    <BottomTabContainer>
      <View style={styles.container}>
        <Buttons
          activeIndex={activeIndex}
          handleActiveIndex={handleActiveIndex}
        />
      </View>
      {renderItem()}
    </BottomTabContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
    padding: 24,
    marginBottom: 16,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 34,
  },

  selected: {
    backgroundColor: GlobalColors.colors.primary500,
    color: GlobalColors.colors.white500,
  },
});

export default GroupScreen;
