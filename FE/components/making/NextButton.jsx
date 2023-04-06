import { Text, TouchableOpacity } from "react-native";

const NextButton = ({ navigation, response, selectedImage }) => {
  if (!response) {
    return null;
  }
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
