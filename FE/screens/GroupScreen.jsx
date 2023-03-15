import { View, Dimensions, StyleSheet } from "react-native";
import GroupList from "../components/group/GroupList";
import GroupList2 from "../components/group/GroupList2";
import GroupList3 from "../components/group/GroupList3";
import { useState } from "react";
import Button from "../ui/Button"
import PlusButton from "../ui/PlusButton";
import { GlobalColors } from "../constants/color";

const deviceHeight = Dimensions.get("window").height - 130;
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
    if (activeIndex === 0) {
      return (
          <GroupList/>
      );
    }
    if (activeIndex === 1) {
      return <GroupList2 />;
    }
    if (activeIndex === 2) 
    return <GroupList3/>;
  };

  return (
    <View style={styles.container}>
      <Buttons
        activeIndex={activeIndex}
        handleActiveIndex={handleActiveIndex}
      />
      {renderItem()}
      <PlusButton navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    height: deviceHeight,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  selected: {
    backgroundColor: GlobalColors.colors.primary500,
    color: GlobalColors.colors.white500,
  },
});


export default GroupScreen;


