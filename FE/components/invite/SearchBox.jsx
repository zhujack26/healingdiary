import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { GlobalColors } from "../../constants/color";

const SearchBox = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="유저의 별명을 입력하세요"
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        searchIcon={{ color: "orange" }}
        clearIcon={{ color: "orange" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  searchContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: "85%",
  },
  inputContainer: {
    backgroundColor: GlobalColors.colors.gray400,
    borderRadius: 20,
    height: 35,
  },
  input: {
    fontSize: 15,
    fontFamily: "KoddiUDOnGothic-Regular",
    color: GlobalColors.colors.black500,
  },
});

export default SearchBox;
