import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import SearchBox from "../components/search/SearchBox";
import SearchDiary from "../components/search/SearchDiary";
import SearchGroup from "../components/search/SearchGroup";
import SearchTag from "../components/search/SearchTag";
import { useState } from "react";
import { GlobalColors } from "../constants/color";
import BottomTabContainer from "../components/BottomTabContainer/BottomTabContainer";

const { width, height } = Dimensions.get("window");
const SearchScreen = () => {
  const getTextStyle = (index) => {
    return activeIndex === index ? styles.activeText : styles.inactiveText;
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const handleActiveIndex = (index) => {
    setActiveIndex(index);
  };

  const Type = ({ handleActiveIndex }) => {
    return (
      <View style={styles.line}>
        <Pressable
          style={[styles.innerContainer, getTextStyle(0)]}
          onPress={() => handleActiveIndex(0)}
        >
          <Text style={[styles.text, getTextStyle(0)]}>일기</Text>
        </Pressable>
        <Pressable
          style={[styles.innerContainer, getTextStyle(1)]}
          onPress={() => handleActiveIndex(1)}
        >
          <Text style={[styles.text, getTextStyle(1)]}>소모임</Text>
        </Pressable>
        <Pressable
          style={[styles.innerContainer, getTextStyle(2)]}
          onPress={() => handleActiveIndex(2)}
        >
          <Text style={[styles.text, getTextStyle(2)]}>해시태그</Text>
        </Pressable>
      </View>
    );
  };

  const renderItem = () => {
    const searchComponent = [<SearchDiary />, <SearchGroup />, <SearchTag />];
    return searchComponent[activeIndex];
  };
  return (
    <BottomTabContainer>
      <View style={styles.container}>
        <SearchBox />
        <Type handleActiveIndex={handleActiveIndex} />
        {renderItem()}
      </View>
    </BottomTabContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: height,
  },

  line: {
    flexDirection: "row",
    width: width,
    paddingHorizontal: 24,
    alignItems: "center",
    marginVertical: 22,
  },

  innerContainer: {
    width: "33.333%",
  },

  text: {
    fontFamily: "KoddiUDOnGothic-Regular",
    textAlign: "center",
    fontSize: 16,
  },

  activeText: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    borderBottomWidth: Platform.OS === "ios" ? 1.2 : 0.6,
  },

  inactiveText: {
    color: GlobalColors.colors.gray500,
  },
});
export default SearchScreen;
