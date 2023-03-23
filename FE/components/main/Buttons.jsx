import { View, StyleSheet } from "react-native";
import { GlobalColors } from "./../../constants/color";

import Button from "../../ui/Button";

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
        일기
      </Button>
      <Button
        activeIndex={activeIndex}
        onPress={() => handleActiveIndex(2)}
        selected={activeIndex === 2 && styles.selected}
      >
        소모임 일기
      </Button>
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
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
