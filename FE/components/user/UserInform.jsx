import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
  Pressable,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { GlobalColors } from "../../constants/color";
import { duplicationNickname, kakaoSignup } from "../../api/user";
import { API_END_POINT } from "../../constants";
import { useNavigation, useRoute } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";
import Profile from "./Profile";
import Nickname from "./Nickname";
import Location from "./Location";
import Disease from "./Disease";
import Button from "../../ui/Button";
import axios from "axios";
import { kakaoPostConfig } from "./../../api/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");
const regex = /^[a-zA-Z0-9가-힣]{2,8}$/;
const specialChars = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

const UserInform = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { accessToken, provider } = route.params;
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDisease, setSelectedDisease] = useState(null);

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }, []);

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
    if (res.id) {
      await AsyncStorage.setItem("jwtToken", res.jwt_token);
      await AsyncStorage.setItem("nickname", res.nickname);
      await AsyncStorage.setItem("region", res.region);
      await AsyncStorage.setItem("userImage", res.member_image_url);
      navigation.navigate("diaryBottomTab");
    } else {
      // 나중에 에러처리 필요함
    }
  };

  useEffect(() => {
    isValidNickName(nickname);
  }, [nickname]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Profile image={image} pickImage={pickImage} />
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
        <Pressable style={styles.button}>
          <Button onPress={updateUserInfo}>저장</Button>
        </Pressable>
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
