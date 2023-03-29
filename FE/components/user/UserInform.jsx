import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
} from "react-native";
import { useState, useEffect } from "react";
import { GlobalColors } from "../../constants/color";
import { duplicationNickname } from "../../api/user";

import Profile from "./Profile";
import Nickname from "./Nickname";
import Location from "./Location";
import Disease from "./Disease";
import Button from "../../ui/Button";

const { width, height } = Dimensions.get("window");

const UserInform = () => {
  const regex = /^[a-zA-Z0-9가-힣]{2,8}$/;
  const specialChars = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

  const onChangeNickname = (text) => {
    setNickname(text);
  };

  const isValidNickName = async (nickname) => {
    const duplication = await duplicationNickname({ nickname });
    if (duplication) {
      setMessage("중복입니다");
      return;
    }
    // 닉네임이 2글자 이상 8글자 이하가 아님
    if (!regex.test(nickname) || specialChars.test(nickname)) {
      setMessage("유효한 닉네임이 아닙니다");
      return;
    }
    setMessage("사용 가능합니다");
  };

  useEffect(() => {
    isValidNickName(nickname);
  }, [nickname]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Profile />
        </View>
        <View style={styles.inform}>
          <Nickname
            title={"별명"}
            placeholder={"별명을 입력하세요"}
            message={message}
            nickname={nickname}
            onChangeNickname={onChangeNickname}
          />
          <Location title={"지역"} />
          <Disease title={"병명"} />
        </View>
        <View style={styles.button}>
          <Button>저장</Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserInform;

const styles = StyleSheet.create({
  container: {
    width: width,
  },

  profile: {
    top: 100,
    height: "10%",
  },

  inform: {
    height: height / 1.4,
    top: 190,
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: GlobalColors.colors.primary500,
  },

  button: {
    alignItems: "center",
    top: 50,
  },
});
