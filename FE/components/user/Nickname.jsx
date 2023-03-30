import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Dimensions,
} from "react-native";
import { GlobalColors } from "../../constants/color";
import PropTypes from "prop-types";

const Nickname = ({
  title,
  placeholder,
  message,
  nickname,
  onChangeNickname,
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder ?? title}
          placeholderTextColor={GlobalColors.colors.white500}
          allowFontScaling={false}
          onChangeText={onChangeNickname}
          value={nickname}
        />
        <Pressable style={styles.duplicationButton}>
          <Text style={styles.duplicationText}>중복확인</Text>
        </Pressable>
        <Text style={styles.message}>{message}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

Nickname.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    marginBottom: 4,
    fontSize: 20,
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: GlobalColors.colors.white500,
    borderRadius: 0,
    paddingHorizontal: 10,
    height: 42,
  },

  message: {
    color: "red",
  },

  duplicationButton: {
    width: 65,
    height: 35,
    backgroundColor: GlobalColors.colors.white500,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    position: "absolute",
    top: 30,
    right: 15,
  },

  duplicationText: {
    fontSize: 12,
    color: GlobalColors.colors.black500,
  },
});
export default Nickname;
