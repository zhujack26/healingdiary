import {
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
  Pressable,
  Alert,
} from "react-native";
import { useState, useEffect, useCallback, useMemo } from "react";
import { GlobalColors } from "../../constants/color";
import {
  duplicationNickname,
  getUserInfoDetail,
  userInfoUpdate,
} from "../../api/user";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import Profile from "./Profile";
import Nickname from "./Nickname";
import Location from "./Location";
import Disease from "./Disease";
import ConfirmButton from "./../../ui/ConfirmButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../api/interceptor";
import { postConfig, postFormConfig } from "../../api/config";

const { width, height } = Dimensions.get("window");
const regex = /^[a-zA-Z0-9가-힣]{2,8}$/;
const specialChars = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

const extensionToMimeType = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
};

const ModifyingInform = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState("");
  const [nickname, setNickname] = useState("");
  const [disease, setDisease] = useState("");
  const [region, setRegion] = useState("");
  const [message, setMessage] = useState("");

  const isValid = region && disease && message === "사용 가능합니다";

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0.01,
    });
    if (!result.canceled && result.assets && result.assets[0]) {
      setImage(result.assets[0].uri);
    }
  }, []);

  const onChangeNickname = useCallback((text) => {
    setNickname((prevNickname) => text);
  }, []);

  const onChangeLocation = useCallback((value) => {
    setRegion((prevRegion) => value);
  }, []);

  const onChangeDisease = useCallback((value) => {
    setDisease((prevDisease) => value);
  }, []);

  const getUserInfo = useCallback(async () => {
    const res = await getUserInfoDetail();
    setNickname(res.nickname);
    setRegion(res.region);
    setDisease(res.disease);
    setImage(res.imageSrc);
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

  const callUserInfoUpdate = async () => {
    const extension = image.split(".").pop();
    const fileName = image.split("/").pop();
    const mimeType = extensionToMimeType[extension];
    const file = {
      uri: Platform.OS === "android" ? image : image.replace("file://", ""),
      type: mimeType,
      name: fileName,
    };
    const formData = new FormData();

    formData.append("nickname", nickname);
    formData.append("disease", disease);
    formData.append("region", region);
    formData.append("image_file", file);
    const res = await axiosInstance(postFormConfig("/members/info", formData));
    if (res.status === 200) {
      await AsyncStorage.setItem("nickname", res.data.nickname);
      await AsyncStorage.setItem("userImage", res.data.image_url);
      await AsyncStorage.setItem("region", res.data.region);
      navigation.navigate("Home", { refreshKey: Date.now() });
    } else {
      Alert.alert("회원정보 수정에 실패했습니다");
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

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
          <Profile pickImage={pickImage} image={image} />
        </View>
        <View style={styles.inform}>
          <Nickname
            title={"별명"}
            placeholder={"별명을 입력하세요"}
            message={message}
            nickname={nickname}
            onChangeNickname={onChangeNickname}
            isValidNickname={isValidNickName}
          />
          <Location
            title={"지역"}
            selectedLocation={region}
            onChangeLocation={onChangeLocation}
          />
          <Disease
            title={"병명"}
            selectedDisease={disease}
            onChangeDisease={onChangeDisease}
          />
        </View>
        <View style={styles.button}>
          <ConfirmButton onPress={callUserInfoUpdate} disabled={!isValid}>
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
