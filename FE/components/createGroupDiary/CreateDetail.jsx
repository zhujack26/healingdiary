import { View, StyleSheet } from "react-native";
import AddHashtag from "./AddHashtag";
import { GlobalColors } from "../../constants/color";
import GroupCompleteButton from "./GroupCompleteButton";
import { useState, useEffect } from "react";

const CreateDetail = ({ navigation, route }) => {
  const { response, selectedImage, groupId } = route.params;
  const [emotionResponse, setEmotionResponse] = useState(response);
  const [completeButtonVisible, setCompleteButtonVisible] = useState(false);
  const toggleCompleteButtonVisibility = (visible = true) => {
    setCompleteButtonVisible(visible);
  };
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSelectedTags = (tags) => {
    setSelectedTags(tags);
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: (props) => (
        <GroupCompleteButton
          {...props}
          visible={completeButtonVisible}
          navigation={navigation}
          selectedTags={selectedTags}
          emotionResponse={emotionResponse}
          selectedImage={selectedImage}
          groupId={groupId}
        />
      ),
    });
  }, [
    navigation,
    completeButtonVisible,
    selectedTags,
    emotionResponse,
    selectedImage,
    groupId,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.inform}>
        <AddHashtag
          onToggleCompleteButtonVisibility={toggleCompleteButtonVisibility}
          emotionResponse={emotionResponse}
          onSelectedTags={handleSelectedTags}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.colors.primary500,
  },
  inform: {
    alignItems: "center",
    top: 100,
    width: "100%",
    height: "90%",
    backgroundColor: GlobalColors.colors.white500,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
export default CreateDetail;
