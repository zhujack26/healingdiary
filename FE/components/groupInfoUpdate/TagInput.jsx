import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalColors } from "./../../constants/color";

const TagInput = ({
  inputText,
  selectedTags,
  handleInputTextChange,
  handleInputSubmit,
}) => {
  return (
    <View style={styles.tagInputContainer}>
      {selectedTags.map((tag) => (
        <Text key={tag.id} style={styles.tag}>
          #{tag.keyword}
        </Text>
      ))}
      <TextInput
        value={inputText}
        style={styles.input}
        returnKeyType="done"
        blurOnSubmit={true}
        onSubmitEditing={handleInputSubmit}
        onChangeText={handleInputTextChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tagInputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: GlobalColors.colors.primary500,
  },
  tag: {
    fontFamily: "KoddiUDOnGothic-Regular",
    fontSize: 18,
    color: GlobalColors.colors.black500,
    marginRight: 20,
    padding: 10,
    width: "auto",
    paddingTop: 12,
    backgroundColor: GlobalColors.colors.primary400,
    borderRadius: 16,
  },
  input: {
    width: "auto",
    fontFamily: "KoddiUDOnGothic-Regular",
    padding: 11,
    fontSize: 18,
  },
});

export default TagInput;
