import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { GlobalColors } from "../../constants/color";

const DATA = [
  { id: 1, keyword: "불행" },
  { id: 2, keyword: "나쁨" },
  { id: 3, keyword: "평온" },
  { id: 4, keyword: "기쁨" },
  { id: 5, keyword: "행복" },
];
const AddHashtag = ({
  onToggleCompleteButtonVisibility,
  emotionResponse,
  onSelectedTags,
}) => {
  const notifySelectedTags = () => {
    const customTags = selectedTags.filter((tag) => !DATA.includes(tag));
    onSelectedTags(customTags);
  };
  useEffect(() => {
    onSelectedTags(selectedTags);
    if (selectedTags.some((tag) => DATA.includes(tag))) {
      onToggleCompleteButtonVisibility(true);
    } else {
      onToggleCompleteButtonVisibility(false);
    }
  }, [selectedTags, onSelectedTags, onToggleCompleteButtonVisibility]);
  const [selectedTags, setSelectedTags] = useState(() => {
    if (emotionResponse) {
      const { emotionCode, value } = emotionResponse.emotion;
      const tag = DATA.find((t) => t.id === emotionCode);
      return tag ? [tag] : [];
    }
    return [];
  });
  const [inputText, setInputText] = useState("");
  const [dataTags, setDataTags] = useState(() => {
    if (emotionResponse) {
      const { emotionCode } = emotionResponse.emotion;
      const tag = DATA.find((t) => t.id === emotionCode);
      return tag ? 1 : 0;
    }
    return 0;
  });
  const handleTagSelection = (tag) => {
    const maxDataTags = 1;
    const selectedEmotionTag = selectedTags.find((t) => DATA.includes(t));

    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
      if (DATA.includes(tag)) {
        setDataTags(dataTags - 1);
        onToggleCompleteButtonVisibility(false);
      }

      notifySelectedTags();
    } else {
      if (dataTags < maxDataTags) {
        if (selectedEmotionTag) {
          setSelectedTags(
            selectedTags
              .filter((selectedTag) => selectedTag !== selectedEmotionTag)
              .concat(tag)
          );
        } else {
          setSelectedTags([...selectedTags, tag]);
        }
        if (DATA.includes(tag)) {
          setDataTags(dataTags + 1);
          onToggleCompleteButtonVisibility(true);
        }
        notifySelectedTags();
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
        notifySelectedTags();
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
    }
  };
  const warningTextEmotion = () => {
    if (!selectedTags.some((tag) => DATA.includes(tag))) {
      return (
        <Text style={styles.warningText}>
          * 감정은 최소 1개를 선택해야 합니다. *
        </Text>
      );
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
              selectedTags.includes(tag) && styles.selectedTagButton,
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
