import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/color";
import { useNavigation } from "@react-navigation/native";

const AddHashtag = () => {
  const [tags1, setTags1] = useState([
    { id: 1, name: "해시태그1-1" },
    { id: 2, name: "해시태그1-2" },
    { id: 3, name: "해시태그1-3" },
    { id: 4, name: "해시태그1-4" },
    { id: 5, name: "해시태그1-5" },
    { id: 6, name: "해시태그1-6" },
    { id: 7, name: "해시태그1-7" },
  ]);
  const [tags2, setTags2] = useState([
    { id: 11, name: "해시태그2-1" },
    { id: 12, name: "해시태그2-2" },
    { id: 13, name: "해시태그2-3" },
    { id: 14, name: "해시태그2-4" },
    { id: 15, name: "해시태그2-5" },
    { id: 16, name: "해시태그2-6" },
    { id: 17, name: "해시태그2-7" },
  ]);
  const [tags3, setTags3] = useState([
    { id: 21, name: "해시태그3-1" },
    { id: 22, name: "해시태그3-2" },
    { id: 23, name: "해시태그3-3" },
    { id: 24, name: "해시태그3-4" },
    { id: 25, name: "해시태그3-5" },
    { id: 26, name: "해시태그3-6" },
    { id: 27, name: "해시태그3-7" },
  ]);

  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MakingHash", { categoryId: 1, categoryName: "감정", allTags: tags1 })
          }
        >
          <Text id="전체보기1">전체보기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        {tags1.slice(0, 6).map((tag) => (
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
        <Text>카테고리</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MakingHash", { categoryId: 2, categoryName: "카테고리", allTags: tags2 })
          }
        >
          <Text id="전체보기2">전체보기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        {tags2.slice(0, 6).map((tag) => (
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MakingHash", { categoryId: 3, categoryName: "키워드", allTags: tags3 })
          }
        >
          <Text id="전체보기3">전체보기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        {tags3.slice(0, 6).map((tag) => (
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
});

export default AddHashtag;
