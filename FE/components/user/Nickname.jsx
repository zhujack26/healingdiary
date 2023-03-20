import { StyleSheet, Text, TextInput, View } from "react-native";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { GlobalColors } from "../../constants/color";

const Nickname = ({ title, placeholder }) => {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const users = ["user1", "user2", "user3"]; //더미

  useEffect(() => {
    if (
      nickname.length <= 2 ||
      nickname.length >= 8 ||
      !/^[a-zA-Z0-9]*$/.test(nickname)
    ) {
      setMessage("유효한 닉네임이 아닙니다");
    } else if (users.includes(nickname)) {
      setMessage("중복입니다");
    } else {
      setMessage("사용 가능합니다");
    }
  }, [nickname]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder ?? title}
        placeholderTextColor={GlobalColors.colors.white500}
        allowFontScaling={false}
        onChangeText={(text) => setNickname(text)}
        value={nickname}
      />
      <Text style={styles.message}>{message}</Text>
    </View>
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
