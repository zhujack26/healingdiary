import { Text, TouchableOpacity } from "react-native";

const CompleteButton = ({ navigation, visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate("diaryBottomTab")}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>완료</Text>
    </TouchableOpacity>
  );
};

export default CompleteButton;
