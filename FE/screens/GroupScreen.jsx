import { View, ScrollView, Dimensions, StyleSheet } from "react-native";
import GroupList from "../components/group/GroupList";
import GroupList2 from "../components/group/GroupList2";
import GroupList3 from "../components/group/GroupList3";
import { useState } from "react";
import Buttons from "../components/main/Buttons";

const deviceHeight = Dimensions.get("window").height - 130;
const GroupScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleActiveIndex = (index) => {
    setActiveIndex(index);
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
});


export default GroupScreen;


