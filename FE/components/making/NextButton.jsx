import { Text, TouchableOpacity } from "react-native";

const NextButton = ({ navigation, visible, response, selectedImage }) => {
  if (!visible) {
    return null;
  }
  console.log("in nextbutton", selectedImage);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("MakingDetail", { response, selectedImage })
      }
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>다음</Text>
    </TouchableOpacity>
  );
};

export default NextButton;
