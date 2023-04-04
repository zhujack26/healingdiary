import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import { GlobalColors } from "./../../constants/color";
import TagInput from "./TagInput";

const { width } = Dimensions.get("window");
const GroupInfoUpdateIntro = ({
  isEdit,
  inputText,
  selectedTags,
  handleInputTextChange,
  handleInputSubmit,
  handleNameTextChange,
  handleDescriptionTextChange,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
      keyboardVerticalOffset={44}
    >
      <ScrollView>
        <View style={styles.wrapper}>
          <Text style={styles.label}>소모임 이름</Text>
          <TextInput
            style={styles.input}
            defaultValue={isEdit ? "소모임이름" : ""}
            returnKeyType="done"
            onChangeText={handleNameTextChange}
          />
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.label}>소모임 소개</Text>
          <TextInput
            style={styles.input}
            defaultValue={isEdit ? "소모임소개 글" : ""}
            returnKeyType="done"
            multiline={true}
            blurOnSubmit={true}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            onChangeText={handleDescriptionTextChange}
          />
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.label}>해시태그</Text>
          <TagInput
            inputText={inputText}
            selectedTags={selectedTags}
            handleInputTextChange={handleInputTextChange}
            handleInputSubmit={handleInputSubmit}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default GroupInfoUpdateIntro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  wrapper: {
    marginBottom: 24,
  },

  label: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    fontSize: 24,
    marginBottom: 16,
  },

  input: {
    width: width - 50,
    fontFamily: "KoddiUDOnGothic-Regular",
    borderBottomWidth: 2,
    borderBottomColor: GlobalColors.colors.primary500,
    padding: 3,
    fontSize: 18,
  },
});
