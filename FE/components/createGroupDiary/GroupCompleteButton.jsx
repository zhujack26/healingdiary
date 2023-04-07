import { Text, TouchableOpacity } from "react-native";
import { createDiary } from "../../api/diary";

const extensionToMimeType = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
};
const GroupCompleteButton = ({
  navigation,
  visible,
  selectedTags,
  emotionResponse,
  selectedImage,
  groupId,
}) => {
  if (!visible) {
    return null;
  }
  const handleOnPress = async () => {
    const extension = selectedImage.uri.split(".").pop();
    const fileName = selectedImage.uri.split("/").pop();
    const mimeType = extensionToMimeType[extension];
    const file = {
      uri:
        Platform.OS === "android"
          ? selectedImage.uri
          : selectedImage.uri.replace("file://", ""),
      type: mimeType,
      name: fileName,
    };
    const formData = new FormData();
    formData.append("clubId", groupId);
    formData.append("image", file);
    formData.append("emotionCode", emotionResponse.emotion.emotionCode);
    formData.append("recordUrl", emotionResponse.recordUrl);
    const hashtags = selectedTags.map((tag) => tag.keyword);
    formData.append("tags", hashtags);
    const res = await createDiary(formData);
    if (res.status === 200) navigation.navigate("diaryBottomTab");
    else console.log("생성 실패");
  };
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>완료</Text>
    </TouchableOpacity>
  );
};

export default GroupCompleteButton;
