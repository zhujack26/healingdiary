import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { GlobalColors } from "../../constants/color";

const MakingInput = () => {
  const [inputText, setInputText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSubmit = () => {
    console.log("댓글:", inputText);
    setInputText("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        multiline
      />
      {!isFocused && inputText === "" && (
        <Text style={styles.placeholder}>욕설과 비방은 삼가해주세요</Text>
      )}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>작성하기</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
  },
  input: {
    minHeight: 150,
    borderColor: GlobalColors.colors.gray400,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  placeholder: {
    position: "absolute",
    left: 30,
    top: 25,
    fontSize: 18,
    color: "gray",
  },
  submitButton: {
    backgroundColor: GlobalColors.colors.primary500,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
});
export default MakingInput;
