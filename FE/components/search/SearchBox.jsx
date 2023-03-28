import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { GlobalColors } from "../../constants/color";
import { Ionicons } from "@expo/vector-icons";

const SearchBox = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <View style={styles.container}>
      <View>
        <Ionicons
          name="chevron-back"
          color={GlobalColors.colors.secondary500}
          size={24}
        />
      </View>
      <SearchBar
        placeholder=""
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 45,
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
