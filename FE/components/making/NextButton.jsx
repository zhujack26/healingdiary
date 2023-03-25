import React from "react";
import { Text, TouchableOpacity } from "react-native";

const NextButton = ({ navigation, visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate("MakingDetail")}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>다음</Text>
    </TouchableOpacity>
  );
};

export default NextButton;
