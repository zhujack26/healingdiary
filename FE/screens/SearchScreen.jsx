import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import SearchBox from "../components/search/SearchBox";
import SearchDiary from "../components/search/SearchDiary";
import SearchGroup from "../components/search/SearchGroup";
import SearchTag from "../components/search/SearchTag";
import { useState } from "react";
import { GlobalColors } from "../constants/color";

const deviceHeight = Dimensions.get("window").height - 130;
const SearchScreen = () => {
  const getTextStyle = (index) => {
    return activeIndex === index ? styles.activeText : styles.inactiveText;
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const handleActiveIndex = (index) => {
    setActiveIndex(index);
  };
  const Type = ({ activeIndex, handleActiveIndex }) => {
    return (
      <View style={styles.line}>
        <Pressable
          activeIndex={activeIndex}
          onPress={() => handleActiveIndex(0)}
          // style={({ pressed }) => pressed && styles.pressed}
        >
          <Text style={[styles.leftText, getTextStyle(0)]}>일기</Text>
        </Pressable>
        <Pressable
          activeIndex={activeIndex}
          onPress={() => handleActiveIndex(1)}
          // style={({ pressed }) => pressed && styles.pressed}
        >
          <Text style={[styles.centerText, getTextStyle(1)]}>소모임</Text>
        </Pressable>
        <Pressable
          activeIndex={activeIndex}
          onPress={() => handleActiveIndex(2)}
          // style={({ pressed }) => pressed && styles.pressed}
        >
          <Text style={[styles.rightText, getTextStyle(2)]}>해시태그</Text>
        </Pressable>
      </View>
    );
  };
  const renderItem = () => {
    if (activeIndex === 0) {
      return <SearchDiary />;
    }
    if (activeIndex === 1) {
      return <SearchGroup />;
    }
    if (activeIndex === 2) return <SearchTag />;
  };
  return (
    <View style={styles.container}>
      <SearchBox />
      <Type activeIndex={activeIndex} handleActiveIndex={handleActiveIndex} />
      {renderItem()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: deviceHeight,
  },
  line: {
    height: 40,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: GlobalColors.colors.gray400,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 34,
    marginBottom: 34,
  },
  leftText: {
    paddingLeft: 30,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 40,
  },
  centerText: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 40,
    paddingRight: 40,
  },
  rightText: {
    paddingRight: 30,
    paddingLeft: 40,
    paddingBottom: 10,
    paddingTop: 10,
  },
  activeText: {
    color: "black",
  },
  inactiveText: {
    color: "gray",
  },
});
export default SearchScreen;
