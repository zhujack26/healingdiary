import { View, StyleSheet } from "react-native";
import AddHashtag from "../components/making/AddHashtag";
import { GlobalColors } from "../constants/color";
import CompleteButton from "../components/making/CompleteButton";
import { useState, useEffect } from "react";

const MakingDetailScreen = ({ navigation, route }) => {
  const { response, selectedImage } = route.params;
  const [emotionResponse, setEmotionResponse] = useState(response);
  console.log("check1", emotionResponse);
  console.log("check1", selectedImage);
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
        <CompleteButton
          {...props}
          visible={completeButtonVisible}
          navigation={navigation}
        />
      ),
    });
  }, [navigation, completeButtonVisible]);

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
    width: 400,
    width: "100%",
    height: "90%",
    backgroundColor: GlobalColors.colors.white500,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
export default MakingDetailScreen;
