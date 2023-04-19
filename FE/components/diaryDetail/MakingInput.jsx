import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { GlobalColors } from "../../constants/color";
import { createComment } from "../../api/comment";
import { useNavigation } from "@react-navigation/native";

const MakingInput = ({ route }) => {
  const navigation = useNavigation();
  const { diaryId, parentId } = route.params;

  const [text, setText] = useState("");
  const data = {
    diaryId: diaryId,
    parentId: parentId ? parentId : null,
    content: text,
  };

  const handleInputText = (text) => {
    setText((prev) => text);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const callCreateComment = async (data) => {
    const res = await createComment(data);
    if (res.status === 200) {
      navigation.navigate("diaryDetail", {
        diaryId: diaryId,
        refreshKey: Date.now(),
      });
    } else {
      Alert.alert("댓글 작성에 실패했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={handleInputText}
        onBlur={handleBlur}
        multiline
        placeholder="욕설과 비방은 삼가해주세요"
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => callCreateComment(data)}
      >
        <Text style={styles.submitButtonText}>작성하기</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.colors.background500,
    padding: 20,
  },
  input: {
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
