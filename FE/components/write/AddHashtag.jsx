import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/color";

const AddHashtag = () => {
  const [tags1, setTags1] = useState([
    { id: 1, name: '해시태그1-1' },
    { id: 2, name: '해시태그1-2' },
    { id: 3, name: '해시태그1-3' },
    { id: 4, name: '해시태그1-4' },
    { id: 5, name: '해시태그1-5' },
  ]);
  const [tags2, setTags2] = useState([
    { id: 11, name: '해시태그2-1' },
    { id: 12, name: '해시태그2-2' },
    { id: 13, name: '해시태그2-3' },
    { id: 14, name: '해시태그2-4' },
    { id: 15, name: '해시태그2-5' },
  ]);
  const [tags3, setTags3] = useState([
    { id: 21, name: '해시태그3-1' },
    { id: 22, name: '해시태그3-2' },
    { id: 23, name: '해시태그3-3' },
    { id: 24, name: '해시태그3-4' },
    { id: 25, name: '해시태그3-5' },
  ]);

  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  return (
    <View style={styles.container}>
      <Text>
        선택된 해시태그
      </Text>
      <View style={styles.selectedTagsContainer}>
        {selectedTags.map((tag) => (
          <TouchableOpacity 
            key={tag.id} 
            style={styles.selectedTag}>
            <Text style={styles.selectedTagText}>{tag.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text>
        감정
      </Text>
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
      <Text>
        카테고리
      </Text>
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
      <Text>
        키워드
      </Text>
      <View style={styles.box}>
        {tags3.map((tag) => (
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    width: 300,
    backgroundColor: GlobalColors.colors.white500,
  },
  box : {
    backgroundColor: GlobalColors.colors.white500,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tagButton: {
    backgroundColor: GlobalColors.colors.primary400,
    borderRadius: 10,
    padding: 5,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
  },
  selectedTagButton: {
    backgroundColor: GlobalColors.colors.primary500,
  },
  tagButtonText: {
    fontSize: 12,
    color: GlobalColors.colors.white500
  },
  selectedTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    marginBottom: 10,
  },
  selectedTag: {
    backgroundColor: GlobalColors.colors.primary500,
    borderRadius: 10,
    padding: 5,
    marginRight: 10,
  },
  selectedTagText: {
    fontSize: 12,
    color: GlobalColors.colors.white500,
  },
});

export default AddHashtag;
