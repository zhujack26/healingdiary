import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { GlobalColors } from "../../constants/color";
import { useNavigation } from "@react-navigation/native";
import { tags1, tags2 } from "../../model/DataHashtag";

const AddHashtag = () => {
  const [tags1State, setTags1State] = useState(tags1);
  const [tags2State, setTags2State] = useState(tags2);
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      if (selectedTags.length < 3) {
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
        name: `#${inputText.trim()}`,
      };
      setSelectedTags([...selectedTags, newTag]);
      setInputText("");
    }
  };

  const renderTextInput = () => (
    <View>
      <TextInput
        value={inputText}
        onChangeText={handleInputTextChange}
        onSubmitEditing={handleInputSubmit}
        placeholder="해시태그를 입력하세요"
        style={styles.input}
      />
    </View>
  );

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {renderTextInput()}
      <Text>선택된 해시태그</Text>
      <View style={styles.selectedTagsContainer}>
        {selectedTags.map((tag) => (
          <TouchableOpacity key={tag.id} style={styles.selectedTag}>
            <Text style={styles.selectedTagText}>{tag.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.sub}>
        <Text>감정</Text>
      </View>
      <View style={styles.box}>
        {tags1.map((tag) => (
          <TouchableOpacity
            key={tag.id}
            onPress={() => handleTagSelection(tag)}
            style={[
              styles.tagButton,
              selectedTags.includes(tag) && styles.selectedTagButton,
            ]}
          >
            <Text style={styles.tagButtonText}>{tag.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.sub}>
        <Text>키워드</Text>
      </View>
      <View style={styles.box}>
        {tags2.map((tag) => (
          <TouchableOpacity
            key={tag.id}
            onPress={() => handleTagSelection(tag)}
            style={[
              styles.tagButton,
              selectedTags.includes(tag) && styles.selectedTagButton,
            ]}
          >
            <Text style={styles.tagButtonText}>{tag.name}</Text>
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
