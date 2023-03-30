import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { GlobalColors } from "../../constants/color";
import { DATA } from "../../model/DataHashtag";

const AddHashtag = () => {
  const [tagsState, setTagsState] = useState(DATA);
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      if (selectedTags.length < 1) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };
  const handleInputTextChange = (text) => {
    setInputText(text);
  };

  const handleInputSubmit = () => {
    if (inputText.trim() !== "" && selectedTags.length < 3) {
      const newTag = {
        id: `custom-${Date.now()}`,
        keyword: `#${inputText.trim()}`,
      };
      setSelectedTags([...selectedTags, newTag]);
      setInputText("");
    }
  };
  const handleSelectedTagPress = (tag) => {
    // 선택한 태그를 삭제
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };
  const renderTextInput = () => (
    <View>
      <TextInput
        value={inputText}
        onChangeText={handleInputTextChange}
        onSubmitEditing={handleInputSubmit}
        placeholder="해시태그를 입력하세요"
        style={styles.input}
        textAlign="center"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {renderTextInput()}

      <Text>선택된 해시태그</Text>
      <View style={styles.selectedTagsContainer}>
        {selectedTags.map((tag) => (
          <TouchableOpacity
            key={tag.id}
            onPress={() => handleSelectedTagPress(tag)}
            style={styles.selectedTag}
          >
            <Text style={styles.selectedTagText}>#{tag.keyword}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.sub}>
        <Text>감정</Text>
      </View>
      <View style={styles.box}>
        {DATA.map((tag) => (
          <TouchableOpacity
            key={tag.id}
            onPress={() => handleTagSelection(tag)}
            style={[
              styles.tagButton,
              selectedTags.includes(tag) && styles.selectedTagButton,
            ]}
          >
            <Text style={styles.tagButtonText}>#{tag.keyword}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.warningText}>
        * 해시태그는 최대 3개까지 선택 가능합니다 *
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    width: "80%",
    backgroundColor: GlobalColors.colors.white500,
  },
  sub: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    backgroundColor: GlobalColors.colors.white500,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    marginBottom: 10,
  },
  tagButton: {
    backgroundColor: GlobalColors.colors.primary400,
    borderRadius: 16,
    minWidth: 85,
    padding: 5,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    alignItems: "center",
  },
  selectedTagButton: {
    backgroundColor: GlobalColors.colors.primary500,
  },
  tagButtonText: {
    fontFamily: "KoddiUDOnGothic-Regular",
    padding: 4,
    fontSize: 12,
    color: GlobalColors.colors.white500,
  },
  selectedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    marginBottom: 10,
  },
  selectedTag: {
    backgroundColor: GlobalColors.colors.primary500,
    borderRadius: 16,
    minWidth: 85,
    padding: 5,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    alignItems: "center",
  },
  selectedTagText: {
    fontFamily: "KoddiUDOnGothic-Regular",
    padding: 4,
    fontSize: 12,
    color: GlobalColors.colors.white500,
  },
  warningText: {
    padding: 10,
    color: "red",
    fontSize: 12,
    fontWeight: "bold",
  },
  input: {
    borderColor: GlobalColors.colors.primary400,
    borderWidth: 1,
    borderRadius: 16,
    padding: 10,
    marginBottom: 20,
  },
});

export default AddHashtag;
