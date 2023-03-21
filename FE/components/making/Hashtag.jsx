import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GlobalColors } from "../../constants/color";

const Hashtag = ({
  categoryId,
  categoryName,
  allTags,
  selectedTags,
  setSelectedTags,
}) => {
  const handleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const renderDataByCategory = () => {
    return allTags.map((tag) => (
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
    ));
  };

  return (
    <View style={styles.container}>
      <Text>{categoryName}</Text>
      <View style={styles.box}>{renderDataByCategory()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    width: "80%",
    backgroundColor: GlobalColors.colors.white500,
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
});

export default Hashtag;
