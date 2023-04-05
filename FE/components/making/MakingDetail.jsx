import { View, StyleSheet } from "react-native";
import AddHashtag from "./AddHashtag";
import { GlobalColors } from "../../constants/color";
import CompleteButton from "./CompleteButton";
import { useState, useEffect } from "react";

const MakingDetail = ({ navigation, route }) => {
  const { response, selectedImage } = route.params;
  const [emotionResponse, setEmotionResponse] = useState(response);
  const [completeButtonVisible, setCompleteButtonVisible] = useState(false);
  const toggleCompleteButtonVisibility = (visible = true) => {
    setCompleteButtonVisible(visible);
  };
  const [selectedTags, setSelectedTags] = useState([]);
  console.log("check1:", selectedTags);
  const handleSelectedTags = (tags) => {
    setSelectedTags(tags);
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: (props) => (
        <CompleteButton
          {...props}
          visible={completeButtonVisible}
          navigation={navigation}
          selectedTags={selectedTags}
          emotionResponse={emotionResponse}
          selectedImage={selectedImage}
        />
      ),
    });
  }, [
    navigation,
    completeButtonVisible,
    selectedTags,
    emotionResponse,
    selectedImage,
  ]);
  console.log("check2:", selectedTags);
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
export default MakingDetail;
