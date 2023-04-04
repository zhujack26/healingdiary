import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { GlobalColors } from "../../constants/color";

const AddHashtag = ({ responseData, onToggleCompleteButtonVisibility }) => {
  const initialData = [
    { id: 1, keyword: "불행" },
    { id: 2, keyword: "나쁨" },
    { id: 3, keyword: "평온" },
    { id: 4, keyword: "기쁨" },
    { id: 5, keyword: "행복" },
  ];
  const [DATA, setDATA] = useState(initialData);
  const [selectedTags, setSelectedTags] = useState([]);
  console.log(responseData);
  useEffect(() => {
    if (responseData) {
      console.log("check", responseData);
      const selectedEmotionTag = initialData.find(
        (tag) => tag.id === responseData.emotion.emotionCode
      );
      if (selectedEmotionTag) {
        setSelectedTags([selectedEmotionTag]);
        onToggleCompleteButtonVisibility(true);
      } else {
        onToggleCompleteButtonVisibility(false);
      }
    }
  }, [responseData, onToggleCompleteButtonVisibility]);
  const [inputText, setInputText] = useState("");
  const [dataTags, setDataTags] = useState(0);
  const maxDataTags = 1; // 최대 선택 가능한 DATA 해시태그 개수를 1개로 설정
  const handleTagSelection = (tag) => {
    if (selectedTags.some((selectedTag) => selectedTag.id === tag.id)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag.id !== tag.id)
      );
      setDataTags(dataTags - 1);
      onToggleCompleteButtonVisibility(false);
    } else {
      if (dataTags < maxDataTags) {
        setSelectedTags([...selectedTags, tag]);
        setDataTags(dataTags + 1);
        onToggleCompleteButtonVisibility(true);
      }
    }
  };
  const handleInputTextChange = (text) => {
    setInputText(text);
  };
  const isTagAlreadySelected = (tag) => {
    return selectedTags.some(
      (selectedTag) => selectedTag.keyword === tag.keyword
    );
  };
  const handleInputSubmit = () => {
    if (inputText.trim() !== "" && selectedTags.length < 3) {
      const newTag = {
        id: `custom-${Date.now()}`,
        keyword: `${inputText.trim()}`,
      };
      if (!isTagAlreadySelected(newTag)) {
        // 중복되지 않은 경우에만 추가
        setSelectedTags([...selectedTags, newTag]);
        setInputText("");
      }
    }
  };
  const handleSelectedTagPress = (tag) => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };
  const renderTextInput = () => (
    <View>
      <TextInput
        value={inputText}
        onChangeText={handleInputTextChange}
        onSubmitEditing={handleInputSubmit}
        placeholder="원하시는 해시태그를 입력하세요"
        style={styles.input}
      />
    </View>
  );
  const warningTextHash = () => {
    if (selectedTags.length === 3) {
      return (
        <Text style={styles.warningText}>
          * 해시태그는 최대 3개까지 가능합니다 *
        </Text>
      );
    } else {
      null;
    }
  };
  const warningTextEmotion = () => {
    if (!selectedTags.some((tag) => DATA.includes(tag))) {
      return (
        <Text style={styles.warningText}>
          * 감정은 최소 1개를 선택해야 합니다. *
        </Text>
      );
    } else {
      return null;
    }
  };

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
              selectedTags.some((selectedTag) => selectedTag.id === tag.id)
                ? styles.selectedTagButton
                : null,
            ]}
          >
            <Text style={styles.tagButtonText}>#{tag.keyword}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {warningTextEmotion()}
      {warningTextHash()}
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
