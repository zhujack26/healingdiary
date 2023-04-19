import { Text, TouchableOpacity } from "react-native";

const GroupNextButton = ({ navigation, response, selectedImage, groupId }) => {
  if (!response || !selectedImage) {
    return null;
  }
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("CreateDetail", {
          response,
          selectedImage,
          groupId,
        })
      }
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>다음</Text>
    </TouchableOpacity>
  );
};

export default GroupNextButton;
