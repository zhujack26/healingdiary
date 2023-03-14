import { View, ScrollView, Dimensions, StyleSheet } from "react-native";
import GroupList from "../components/group/GroupList";
import GroupList2 from "../components/group/GroupList2";
import GroupList3 from "../components/group/GroupList3";
import { useState } from "react";
import Buttons from "../components/main/Buttons";
import Button from "../ui/Button"
import PlusButton from "../ui/PlusButton";

const deviceWidth = Dimensions.get("window").width - 50;
const deviceHeight = Dimensions.get("window").height - 130;
const GroupScreen = () => {
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
            >
                전체
            </Button>
            <Button
                activeIndex={activeIndex}
                onPress={() => handleActiveIndex(1)}
            >
                내 소모임
            </Button>
            <Button
                activeIndex={activeIndex}
                onPress={() => handleActiveIndex(2)}
            >
                추천 소모임
            </Button>
        </View>
    );
  };

  const renderItem = () => {
    if (activeIndex === 0) {
      return (
        <ScrollView>
          <GroupList/>
        </ScrollView>
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
      <PlusButton/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: deviceWidth+50,
    flex: 1,
    justifyContent: "center",
    padding: 24,
    height: deviceHeight,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 34,
  },
});


export default GroupScreen;


