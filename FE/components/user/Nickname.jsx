import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
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
});
export default Nickname;
