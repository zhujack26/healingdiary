import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalColors } from "./../../constants/color";

const TagInput = ({ tags, setTags }) => {
  const [inputText, setInputText] = useState("");

  const handleInputTextChange = (text) => {
    setInputText(text);
  };

  const isTagAlreadySelected = (tag) => {
    return tags.some((selectedTag) => selectedTag.keyword === tag.keyword);
  };

  const handleInputSubmit = () => {
    if (inputText.trim() !== "" && tags.length < 3) {
      const newTag = {
        id: `custom-${Date.now()}`,
        keyword: `${inputText.trim()}`,
      };
      if (!isTagAlreadySelected(newTag)) {
        setTags([...tags, newTag]);
        setInputText("");
      }
    }
  };

  return (
    <View style={styles.tagInputContainer}>
      {tags.map((tag) => (
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
    borderRadius: 20,
  },
  input: {
    width: "auto",
    fontFamily: "KoddiUDOnGothic-Regular",
    padding: 3,
    fontSize: 18,
  },
});

export default TagInput;
