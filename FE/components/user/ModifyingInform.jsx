import {
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
  Pressable,
} from "react-native";
import { useState, useEffect, useCallback, useMemo } from "react";
import { GlobalColors } from "../../constants/color";
import { duplicationNickname, getUserInfoDetail } from "../../api/user";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import Profile from "./Profile";
import Nickname from "./Nickname";
import Location from "./Location";
import Disease from "./Disease";
import ConfirmButton from "./../../ui/ConfirmButton";

const { width, height } = Dimensions.get("window");
const regex = /^[a-zA-Z0-9가-힣]{2,8}$/;
const specialChars = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

const ModifyingInform = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});
  const [message, setMessage] = useState("");
  const isValid =
    userInfo.region && userInfo.disease && message === "사용 가능합니다";

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        image: userInfo.image,
      }));
    }
  }, []);

  const onChangeNickname = useCallback((text) => {
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, nickname: text }));
  }, []);

  const onChangeLocation = useCallback((value) => {
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, region: value }));
  }, []);

  const onChangeDisease = useCallback((value) => {
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, disease: value }));
  }, []);

  const getUserInfo = useCallback(async () => {
    const res = await getUserInfoDetail();

    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      nickname: res.nickname,
      region: res.region,
      disease: res.disease,
      image: res.imageSrc,
    }));
  }, []);

  useEffect(() => {
    getUserInfo();
  }, []);

  const isValidNickname = useCallback(async () => {
    const nickname = userInfo.nickname;
    const isDuplicate = await duplicationNickname({ nickname });
    if (isDuplicate) {
      setMessage("중복입니다");
      return;
    }
    // Nickname is not more than 2 letters and less than 8 letters
    if (!regex.test(nickname) || specialChars.test(nickname)) {
      setMessage("유효한 닉네임이 아닙니다");
      return;
    } else setMessage("사용 가능합니다");

    return;
  }, [regex, specialChars]);

  return (
    <Pressable
      style={styles.container}
      onPress={Keyboard.dismiss}
      android_ripple={false}
    >
      <View style={styles.container}>
        <Pressable
          style={styles.iconContainer}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={32}
            color={GlobalColors.colors.black500}
          />
        </Pressable>
        <View style={styles.profile}>
          <Profile pickImage={pickImage} image={userInfo.image} />
        </View>
        <View style={styles.inform}>
          <Nickname
            title={"별명"}
            placeholder={"별명을 입력하세요"}
            message={message}
            nickname={userInfo.nickname}
            onChangeNickname={onChangeNickname}
            isValidNickname={isValidNickname}
          />
          <Location
            title={"지역"}
            selectedLocation={userInfo.region}
            onChangeLocation={onChangeLocation}
          />
          <Disease
            title={"병명"}
            selectedDisease={userInfo.disease}
            onChangeDisease={onChangeDisease}
          />
        </View>
        <View style={styles.button}>
          <ConfirmButton onPress={() => {}} disabled={!isValid}>
            저장
          </ConfirmButton>
        </View>
      </View>
    </Pressable>
  );
};

export default ModifyingInform;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  profile: {
    flex: 1,
  },

  inform: {
    flex: 1.5,
    width: width,
    height: height,
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: GlobalColors.colors.primary500,
  },

  button: {
    position: "absolute",
    top: 5,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  iconContainer: {
    position: "absolute",
    top: 0,
    left: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 30,
  },
});
