import { Text, TouchableOpacity } from "react-native";

const NextButton = ({ navigation, visible, response }) => {
  if (!visible) {
    return null;
  }
  console.log("in nextbutton", response);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("MakingDetail", { response })}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>다음</Text>
    </TouchableOpacity>
  );
};

export default NextButton;
