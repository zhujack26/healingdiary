import {
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
  Text,
  Pressable,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { GlobalColors } from "../../constants/color";
import { duplicationNickname, kakaoSignup } from "../../api/user";
import { useNavigation, useRoute } from "@react-navigation/native";

import Profile from "./Profile";
import Nickname from "./Nickname";
import Location from "./Location";
import Disease from "./Disease";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfirmButton from "./../../ui/ConfirmButton";

const { width, height } = Dimensions.get("window");
const regex = /^[a-zA-Z0-9가-힣]{2,8}$/;
const specialChars = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

const UserInform = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { accessToken, provider } = route.params;
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const isValid =
    selectedLocation && selectedDisease && message === "사용 가능합니다";

  const onChangeNickname = useCallback((text) => {
    setNickname(text);
  }, []);

  const onChangeLocation = useCallback((value) => {
    setSelectedLocation(value);
  }, []);

  const onChangeDisease = useCallback((value) => {
    setSelectedDisease(value);
  }, []);

  const isValidNickName = useCallback(
    async (nickname) => {
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
    },
    [regex, specialChars]
  );

  // 회원정보 등록
  const updateUserInfo = async () => {
    const body = {
      disease: selectedDisease,
      nickname: nickname,
      region: selectedLocation,
      provider: provider,
    };
    const res = await kakaoSignup(accessToken, body);
    // 회원가입에 성공하면 데이터가 넘어오니 storage에 저장한다.
    if (res.status === 200) {
      await AsyncStorage.setItem("jwtToken", res.data.jwt_token);
      await AsyncStorage.setItem("nickname", res.data.nickname);
      await AsyncStorage.setItem("region", res.data.region);
      await AsyncStorage.setItem("userImage", res.data.member_image_url);
      navigation.navigate("diaryBottomTab");
    } else if (res.status === 409) {
      console.log("이미 가입된 회원");
      // 나중에 에러처리 필요함
    }
  };

  useEffect(() => {
    isValidNickName(nickname);
  }, [nickname]);

  return (
    <Pressable
      style={styles.container}
      onPress={Keyboard.dismiss}
      android_ripple={false}
    >
      <View style={styles.container}>
        <View style={styles.profile}>
          <View style={styles.container}>
            <Text style={styles.text}>회원정보 등록</Text>
          </View>
        </View>
        <View style={styles.inform}>
          <Nickname
            title={"별명"}
            placeholder={"별명을 입력하세요"}
            message={message}
            nickname={nickname}
            onChangeNickname={onChangeNickname}
          />
          <Location title={"지역"} onChangeLocation={onChangeLocation} />
          <Disease title={"병명"} onChangeDisease={onChangeDisease} />
        </View>
        <View style={styles.button}>
          <ConfirmButton onPress={updateUserInfo} disabled={!isValid}>
            저장
          </ConfirmButton>
        </View>
      </View>
    </Pressable>
  );
};

export default UserInform;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },

  profile: {
    flex: 1,
  },

  inform: {
    flex: 2,
    width: width,
    height: height,
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: GlobalColors.colors.primary500,
  },

  button: {
    position: "absolute",
    top: 50,
    right: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 30,
  },
});
