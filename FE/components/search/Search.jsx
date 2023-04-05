import { StyleSheet, Dimensions, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { GlobalColors } from "../../constants/color";
import SearchBox from "./SearchBox";
import SearchDiary from "./SearchDiary";
import SearchGroup from "./SearchGroup";
import SearchTag from "./SearchTag";
import BottomTabContainer from "../BottomTabContainer/BottomTabContainer";

const { width, height } = Dimensions.get("window");
const Search = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const getTextStyle = (index) => {
    return activeIndex === index ? styles.activeText : styles.inactiveText;
  };
  const updateSearch = (search) => {
    setSearch((prevText) => search);
  };

  const handleActiveIndex = (index) => {
    setActiveIndex(index);
  };

  const renderItem = () => {
    const searchComponent = [
      <SearchDiary search={search} />,
      <SearchGroup search={search} />,
      <SearchTag search={search} />,
    ];
    return searchComponent[activeIndex];
  };

  return (
    <BottomTabContainer>
      <View style={styles.container}>
        <SearchBox
          search={search}
          updateSearch={updateSearch}
          navigation={navigation}
        />
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
        {renderItem()}
      </View>
    </BottomTabContainer>
  );
};

export default Search;

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
    padding: 3,
  },

  activeText: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    borderBottomWidth: Platform.OS === "ios" ? 1.2 : 0.6,
  },

  inactiveText: {
    color: GlobalColors.colors.gray500,
  },
});
